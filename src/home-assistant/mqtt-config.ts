import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { AsyncClient } from "async-mqtt";
import { publishLatestSamples } from "../cirrus-to-mqtt/latest";
import { getAllDataSources } from "../cirrus/data-sources";
import { graphqlRequest } from "../cirrus/graphql";
import { ControlDeviceDocument, OutputValue } from "../generated/graphql";
import { logger } from "../logger";
import { getBinarySensorConfig } from "./components/binary-sensor";
import { getDeviceTriggerConfig } from "./components/device-trigger";
import { getSensorConfig } from "./components/sensor";
import { getSwitchConfig } from "./components/switch";

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
  const dataSourceAddresses = await getAllDataSources({ locationId, socket });

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
      case "totalpowerInst":
        setupTotalPowerInst({ dataSourceAddress, discoveryTopicPrefix, mqttClient, socket });
        continue;
      case "onOffOutput":
        setupOnOffOutput({ dataSourceAddress, discoveryTopicPrefix, mqttClient, socket });
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
  const discoveryTopic = `${discoveryTopicPrefix}/binary_sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const configPayload = await getBinarySensorConfig({ dataSourceAddress, socket });
  logger.debug("Advertising binary_sensor on topic: %s", discoveryTopic);
  await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload), { retain: true });
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
  const discoveryTopic = `${discoveryTopicPrefix}/binary_sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const configPayload = await getBinarySensorConfig({ dataSourceAddress, socket });
  logger.debug("Advertising binary_sensor on topic: %s", discoveryTopic);
  await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload), { retain: true });

  await setupGenericSensor({ dataSourceAddress, discoveryTopicPrefix, mqttClient, socket });
}

async function setupTotalPowerInst({
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
  const instantPowerDiscoveryTopic = `${discoveryTopicPrefix}/sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}-instant-power/config`;
  const defaultConfig = await getSensorConfig({ dataSourceAddress, socket });
  const instantPowerConfig: typeof defaultConfig = {
    ...defaultConfig,
    name: defaultConfig.name + " power",
    unique_id: defaultConfig.unique_id + " power",
    value_template: "{{ value_json.instantPower }}",
    unit_of_measurement: "W",
    device_class: "power",
  };
  logger.debug("Advertising instantPower sensor on topic: %s", instantPowerDiscoveryTopic);
  await mqttClient.publish(instantPowerDiscoveryTopic, JSON.stringify(instantPowerConfig), { retain: true });

  const totalEnergyDiscoveryTopic = `${discoveryTopicPrefix}/sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}-total-energy/config`;
  const totalEnergyConfig: typeof defaultConfig = {
    ...defaultConfig,
    name: defaultConfig.name + " total energy",
    unique_id: defaultConfig.unique_id + " total energy",
    value_template: "{{ (value_json.totalEnergy / 1000 / 1000 / 3600) | float | round(2) }}",
    unit_of_measurement: "kWh",
    device_class: "energy",
  };
  logger.debug("Advertising totalEnergy sensor on topic: %s", totalEnergyDiscoveryTopic);
  await mqttClient.publish(totalEnergyDiscoveryTopic, JSON.stringify(totalEnergyConfig), { retain: true });
}

async function setupOnOffOutput({
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
  const topic = `${discoveryTopicPrefix}/switch/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const config = await getSwitchConfig({ dataSourceAddress, socket });
  logger.debug("Advertising switch on topic: %s", topic);
  await mqttClient.publish(topic, JSON.stringify(config), { retain: true });
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
  const triggerTopic = `${discoveryTopicPrefix}/device_automation/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const triggerPayload = await getDeviceTriggerConfig({ dataSourceAddress, socket });
  logger.debug("Advertising device_automation on topic: %s", triggerTopic);
  await mqttClient.publish(triggerTopic, JSON.stringify(triggerPayload), { retain: true });

  const discoveryTopic = `${discoveryTopicPrefix}/binary_sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  const configPayload = await getBinarySensorConfig({ dataSourceAddress, socket });
  logger.debug("Advertising binary_sensor on topic: %s", discoveryTopic);
  await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload), { retain: true });

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
  const discoveryTopic = `${discoveryTopicPrefix}/sensor/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
  logger.debug("Advertising sensor on topic: %s", discoveryTopic);
  const configPayload = await getSensorConfig({ dataSourceAddress, socket });
  await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload), { retain: true });
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
  // Setup handler for on/off messages
  await mqttClient.subscribe("yanzi/+/+/+/control");
  mqttClient.on("message", async (topic, payload) => {
    if (topic === birthMessageTopic && payload.toString("utf-8") === "online") {
      logger.info("Got birth message on %s topic: %s", topic, payload);
      logger.info("Discovering devices since birth message indicated an online status");
      discoverDevices({ socket, mqttClient, locationId, discoveryTopicPrefix });
      return;
    }

    const matches = topic.match(/^yanzi\/(.*)\/(.*)\/(.*)\/control$/);
    if (!matches) {
      return;
    }
    const lid = matches[1];
    const did = matches[2];
    const variableName = matches[3];
    if (lid !== locationId) {
      return;
    }
    const data = payload.toString("utf-8");
    if (data === "on") {
      await graphqlRequest({
        query: ControlDeviceDocument,
        variables: { locationId, did, value: OutputValue.Onn },
        socket,
      });
    }
    if (data === "off") {
      await graphqlRequest({
        query: ControlDeviceDocument,
        variables: { locationId, did, value: OutputValue.Off },
        socket,
      });
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
