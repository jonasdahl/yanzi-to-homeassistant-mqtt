import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { AsyncClient } from "async-mqtt";
import { publishSample } from "../cirrus-to-mqtt/subscriptions";
import { getAllDataSources } from "../cirrus/data-sources";
import { getLatestSample } from "../cirrus/samples";
import { logger } from "../logger";
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
    pollDeviceDiscovery({ mqttClient, socket, interval: 1000 * 60 * 10, locationId, discoveryTopicPrefix }),
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
    const component = "sensor";
    const discoveryTopic = `${discoveryTopicPrefix}/${component}/${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}/config`;
    logger.debug("Advertising unit on topic: %s", discoveryTopic);
    const configPayload = await getSensorConfig({ dataSourceAddress, cirrusHost, sessionId: socket.sessionId });
    await mqttClient.publish(discoveryTopic, JSON.stringify(configPayload));
  }
}

async function publishLatestSamples({
  socket,
  mqttClient,
  dataSourceAddress,
}: {
  socket: YanziSocket;
  mqttClient: AsyncClient;
  dataSourceAddress: DataSourceAddress;
}) {
  const cirrusHost = new URL(socket.url).host;
  const allDataSources = await getAllDataSources({ cirrusHost, locationId: dataSourceAddress.locationId!, socket });
  const dataSourceAddresses = allDataSources.filter(
    (dsa) =>
      (dataSourceAddress.locationId ? dataSourceAddress.locationId === dsa.locationId : true) &&
      (dataSourceAddress.did ? dataSourceAddress.did === dsa.did : true) &&
      (dataSourceAddress.variableName ? dataSourceAddress.variableName === dsa.variableName : true)
  );

  await Promise.all(
    dataSourceAddresses
      .map(async (dataSourceAddress) => {
        const sample = await getLatestSample({ socket, dataSourceAddress });
        if (sample) {
          await publishSample({ sample, dataSourceAddress, mqttClient });
        }
      })
      .map((promise) => promise.catch((e) => logger.error(e)))
  );
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
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}
