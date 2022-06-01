import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { defaultMqttTopicMapper } from "../../cirrus-to-mqtt/subscriptions";
import { getUnitMetadata } from "../../cirrus/unit";
import { getAvailabilityTopic, offlinePayload, onlinePayload } from "../availability";
import { getDeviceConfig } from "./device";

export async function getSwitchConfig({
  dataSourceAddress,
  socket,
}: {
  dataSourceAddress: DataSourceAddress;
  socket: YanziSocket;
}) {
  const topic = defaultMqttTopicMapper({ dataSourceAddress });
  const command_topic = `yanzi/${dataSourceAddress.locationId}/${dataSourceAddress.did}/${dataSourceAddress.variableName?.name}/control`;

  if (!dataSourceAddress.locationId) {
    throw new Error("No locationId in dataSourceAddress");
  }
  if (!dataSourceAddress.did) {
    throw new Error("No did in dataSourceAddress");
  }

  const unit = await getUnitMetadata({
    socket,
    did: dataSourceAddress.did,
    locationId: dataSourceAddress.locationId,
  });

  const chassisAvailabilityTopic = getAvailabilityTopic({
    did: unit.chassisParent?.unitAddress?.did ?? dataSourceAddress.did,
  });
  const gatewayAvailabilityTopic = getAvailabilityTopic({ did: unit.gatewayDid });

  const device = unit.deviceDid
    ? await getDeviceConfig({
        socket,
        did: unit.deviceDid,
        locationId: dataSourceAddress.locationId,
      })
    : undefined;

  return {
    value_template: "{{ value_json.value.name }}",
    availability: [
      { topic: chassisAvailabilityTopic, payload_available: onlinePayload, payload_not_available: offlinePayload },
      { topic: gatewayAvailabilityTopic, payload_available: onlinePayload, payload_not_available: offlinePayload },
    ],
    availability_mode: "all",
    command_topic,
    state_topic: topic,
    device,
    device_class: "outlet",
    enabled_by_default: true,
    json_attributes_template: "{{ value_json | tojson }}",
    json_attributes_topic: topic,
    name: unit.name + ` ${dataSourceAddress.variableName?.name}`,
    unique_id: `${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}`,
    payload_off: "off",
    payload_on: "on",
  };
}
