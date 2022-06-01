import { DataSourceAddress, DeviceUpState, SampleDTO } from "@yanzi/socket";
import { AsyncClient } from "async-mqtt";
import { getAvailabilityTopic, offlinePayload, onlinePayload } from "../home-assistant/availability";
import { logger } from "../logger";
import { defaultMqttTopicMapper } from "./subscriptions";

export function publishSample({
  mqttClient,
  sample,
  dataSourceAddress,
  getMqttTopic = defaultMqttTopicMapper,
}: {
  mqttClient: AsyncClient;
  sample: SampleDTO;
  dataSourceAddress: DataSourceAddress;
  getMqttTopic?: (args: { dataSourceAddress: DataSourceAddress }) => string;
}) {
  const topic = getMqttTopic({ dataSourceAddress });
  logger.debug("Sending %s on topic: %s", sample.resourceType, topic);

  // TODO Move this out of cirrus-to-mqtt (this is more Home Assistant specific)
  if (sample.resourceType === "SampleUpState" && dataSourceAddress.did) {
    mqttClient.publish(
      getAvailabilityTopic({ did: dataSourceAddress.did }),
      upValues.includes(sample.deviceUpState?.name) ? onlinePayload : offlinePayload,
      { retain: true }
    );
  }

  return mqttClient.publish(topic, JSON.stringify(sample), { retain: true });
}

const upValues: (DeviceUpState["name"] | undefined)[] = ["up", "goingUp"];
