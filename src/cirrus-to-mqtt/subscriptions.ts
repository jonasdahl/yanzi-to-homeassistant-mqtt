import { DataSourceAddress, SampleList, SubscribeRequest, SubscriptionType, YanziSocket } from "@yanzi/socket";
import { AsyncClient } from "async-mqtt";
import { logger } from "../logger";
import { publishSample } from "./publish";

export async function cirrusSampleSubscriptionToMqtt({
  locationId,
  mqttClient,
  socket,
  getMqttTopic,
}: {
  mqttClient: AsyncClient;
  locationId: string;
  socket: YanziSocket;
  getMqttTopic?: (args: { dataSourceAddress: DataSourceAddress }) => string;
}) {
  const name = "data";
  const subscription = socket.subscribe(subscribeRequest({ locationId, name }));

  for await (const message of subscription) {
    if (message.subscriptionType?.name !== name) continue;

    for (const resource of message.list ?? []) {
      logger.debug("Got subscription data: %s", resource.resourceType);
      switch (resource.resourceType) {
        case "SampleList":
          handleSampleList(resource, { getMqttTopic, mqttClient });
          break;
        default:
          logger.error("Unexpected resourceType: %s", resource.resourceType);
          break;
      }
    }
  }
}

function handleSampleList(
  resource: SampleList,
  {
    getMqttTopic,
    mqttClient,
  }: { mqttClient: AsyncClient; getMqttTopic?: (args: { dataSourceAddress: DataSourceAddress }) => string }
) {
  const dataSourceAddress = resource.dataSourceAddress;
  const samples = resource.list;
  if (!dataSourceAddress || !samples) {
    logger.error("Got empty DSA or list in SampleListDTO");
    return;
  }

  for (const sample of samples) {
    if (dataSourceAddress?.variableName?.name === "temperatureK" && sample.resourceType === "SampleTemp") {
      // Cirrus doesn't send temperatureC updates, so we need to augment that...
      publishSample({
        dataSourceAddress: {
          ...dataSourceAddress,
          variableName: { resourceType: "VariableName", name: "temperatureC" },
        },
        mqttClient,
        sample: {
          ...sample,
          value: sample.value !== undefined ? Math.round((sample.value - 273.15) * 100) / 100 : undefined,
        },
        getMqttTopic,
      });
    }
    publishSample({ dataSourceAddress, mqttClient, sample, getMqttTopic });
  }
}

export function defaultMqttTopicMapper({ dataSourceAddress }: { dataSourceAddress: DataSourceAddress }) {
  return `yanzi/${dataSourceAddress.locationId}/${dataSourceAddress.did}/${dataSourceAddress.variableName?.name}`;
}

function subscribeRequest({
  locationId,
  name,
}: {
  locationId: string;
  name: SubscriptionType["name"];
}): SubscribeRequest {
  return {
    messageType: "SubscribeRequest",
    unitAddress: { resourceType: "UnitAddress", locationId },
    subscriptionType: { resourceType: "SubscriptionType", name },
  };
}
