import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { AsyncClient } from "async-mqtt";
import { publishLatestSamples } from "../cirrus-to-mqtt/latest";
import { getAllDataSources } from "../cirrus/data-sources";
import { logger } from "../logger";
import { getBinarySensorConfig } from "./components/binary-sensor";
import { getDeviceTriggerConfig } from "./components/device-trigger";
import { getSensorConfig } from "./components/sensor";

export async function homeAssistantMqttConfiguration({
  mqttClient,
  socket,
  locationId,
  discoveryTopicPrefix,
}: {
  mqttClient: AsyncClient;
  socket: YanziSocket;
  locationId: string;
  discoveryTopicPrefix: string;
}) {
  await Promise.race([
    pollDeviceDiscovery({ mqttClient, socket, interval: 1000 * 60 * 60 * 6, locationId, discoveryTopicPrefix }),
    discoverDevicesOnHomeAssistantStartup({ mqttClient, socket, locationId, discoveryTopicPrefix }),
  ]);
}

async function discoverDevices({
  socket,
  mqttClient,
  locationId,
  discoveryTopicPrefix,
}: {
  locationId: string;
  socket: YanziSocket;
  mqttClient: AsyncClient;
  discoveryTopicPrefix: string;
}) {
  if (!socket.sessionId) {
    throw new Error("Socket must be authenticated.");
  }
  const cirrusHost = new URL(socket.url).host;
  const dataSourceAddresses = await getAllDataSources({ cirrusHost, locationId, socket });

  for (const dataSourceAddress of dataSourceAddresses) {
    switch (dataSourceAddress.variableName?.name) {
      case "uplog":
        setupUplog({ dataSourceAddress, discoveryTopicPrefix, mqttClient, socket });
        continue;
      case "motion":
        setupMotion({ dataSourceAddress, discoveryTopicPrefix, mqttClient, socket });
        continue;
      case "unitState":
        setupUnitState({ dataSourceAddress, discoveryTopicPrefix, mqttClient, socket });
        continue;
      default: {
        setupGenericSensor({ dataSourceAddress, discoveryTopicPrefix, mqttClient, socket });
        continue;
      }
    }
  }
}

async function setupUplog({
  socket,
  mqttClient,
  discoveryTopicPrefix,
  dataSourceAddress,
}: {
  socket: YanziSocket;
  mqttClient: AsyncClient;
  discoveryTopicPrefix: string;
  dataSourceAddress: DataSourceAddress;
}) {
  const cirrusHost = new URL(socket.url).host;
  const discoveryTopic = `${discoveryTopicPrefix}/binary_sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const configPayload = await getBinarySensorConfig({ dataSourceAddress, cirrusHost, sessionId: socket.sessionId! });
  logger.debug("Advertising binary_sensor on topic: %s", discoveryTopic);
  await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload));
}

async function setupUnitState({
  socket,
  mqttClient,
  discoveryTopicPrefix,
  dataSourceAddress,
}: {
  socket: YanziSocket;
  mqttClient: AsyncClient;
  discoveryTopicPrefix: string;
  dataSourceAddress: DataSourceAddress;
}) {
  const cirrusHost = new URL(socket.url).host;
  const discoveryTopic = `${discoveryTopicPrefix}/binary_sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const configPayload = await getBinarySensorConfig({ dataSourceAddress, cirrusHost, sessionId: socket.sessionId! });
  logger.debug("Advertising binary_sensor on topic: %s", discoveryTopic);
  await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload));

  await setupGenericSensor({ dataSourceAddress, discoveryTopicPrefix, mqttClient, socket });
}

async function setupMotion({
  socket,
  mqttClient,
  discoveryTopicPrefix,
  dataSourceAddress,
}: {
  socket: YanziSocket;
  mqttClient: AsyncClient;
  discoveryTopicPrefix: string;
  dataSourceAddress: DataSourceAddress;
}) {
  const cirrusHost = new URL(socket.url).host;
  const triggerTopic = `${discoveryTopicPrefix}/device_automation/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const triggerPayload = await getDeviceTriggerConfig({ dataSourceAddress, cirrusHost, sessionId: socket.sessionId! });
  logger.debug("Advertising device_automation on topic: %s", triggerTopic);
  await mqttClient.publish(triggerTopic, JSON.stringify(triggerPayload));

  const discoveryTopic = `${discoveryTopicPrefix}/binary_sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const configPayload = await getBinarySensorConfig({ dataSourceAddress, cirrusHost, sessionId: socket.sessionId! });
  logger.debug("Advertising binary_sensor on topic: %s", discoveryTopic);
  await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload));

  await setupGenericSensor({ socket, mqttClient, discoveryTopicPrefix, dataSourceAddress });
}

async function setupGenericSensor({
  socket,
  mqttClient,
  discoveryTopicPrefix,
  dataSourceAddress,
}: {
  socket: YanziSocket;
  mqttClient: AsyncClient;
  discoveryTopicPrefix: string;
  dataSourceAddress: DataSourceAddress;
}) {
  const cirrusHost = new URL(socket.url).host;
  const discoveryTopic = `${discoveryTopicPrefix}/sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  logger.debug("Advertising sensor on topic: %s", discoveryTopic);
  const configPayload = await getSensorConfig({ dataSourceAddress, cirrusHost, sessionId: socket.sessionId! });
  await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload));
}

async function discoverDevicesOnHomeAssistantStartup({
  socket,
  mqttClient,
  locationId,
  discoveryTopicPrefix,
}: {
  socket: YanziSocket;
  mqttClient: AsyncClient;
  locationId: string;
  discoveryTopicPrefix: string;
}) {
  const birthMessageTopic = "homeassistant/status";
  await mqttClient.subscribe(birthMessageTopic);
  mqttClient.on("message", (topic, payload) => {
    logger.info("Got birth message on %s topic: %s", topic, payload);
    if (topic === birthMessageTopic && payload.toString("utf-8") === "online") {
      logger.info("Discovering devices since birth message indicated an online status");
      discoverDevices({ socket, mqttClient, locationId, discoveryTopicPrefix });
    }
  });

  await publishLatestSamples({
    socket,
    dataSourceAddress: { resourceType: "DataSourceAddress", locationId },
    mqttClient,
  });

  await new Promise(() => {});
  await mqttClient.unsubscribe(birthMessageTopic);
}

async function pollDeviceDiscovery({
  mqttClient,
  socket,
  interval,
  discoveryTopicPrefix,
  locationId,
}: {
  mqttClient: AsyncClient;
  socket: YanziSocket;
  interval: number;
  locationId: string;
  discoveryTopicPrefix: string;
}) {
  while (true) {
    logger.info("Starting periodic device discovery");
    discoverDevices({ socket, mqttClient, discoveryTopicPrefix, locationId });
    logger.info("Periodic device discovery done, sleeping %d ms", interval);
    await publishLatestSamples({
      socket,
      dataSourceAddress: { resourceType: "DataSourceAddress", locationId },
      mqttClient,
    });
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}
