import { DataSourceAddress, DeviceUpState } from "@yanzi/socket";
import { defaultMqttTopicMapper } from "../../cirrus-to-mqtt/subscriptions";
import { getUnitMetadata } from "../../cirrus/unit";
import { getDeviceConfig } from "./device";
import { getUnitOfMeasurement } from "../utils/unit-of-measurement";
import { getAvailabilityTopic, offlinePayload, onlinePayload } from "../availability";

export async function getBinarySensorConfig({
  dataSourceAddress,
  cirrusHost,
  sessionId,
}: {
  dataSourceAddress: DataSourceAddress;
  cirrusHost: string;
  sessionId: string;
}) {
  const topic = defaultMqttTopicMapper({ dataSourceAddress });

  if (!dataSourceAddress.locationId) {
    throw new Error("No locationId in dataSourceAddress");
  }
  if (!dataSourceAddress.did) {
    throw new Error("No did in dataSourceAddress");
  }

  const unit = await getUnitMetadata({
    cirrusHost,
    did: dataSourceAddress.did,
    locationId: dataSourceAddress.locationId,
    sessionId,
  });

  const chassisAvailabilityTopic = getAvailabilityTopic({
    did: unit.chassisParent?.unitAddress.did ?? dataSourceAddress.did,
  });
  const gatewayAvailabilityTopic = getAvailabilityTopic({ did: unit.gatewayDid });

  const device = unit.deviceDid
    ? await getDeviceConfig({
        cirrusHost,
        did: unit.deviceDid,
        locationId: dataSourceAddress.locationId,
        sessionId,
      })
    : undefined;

  return {
    state_topic: topic,
    value_template:
      dataSourceAddress.variableName?.name === "uplog"
        ? `{% if value_json.deviceUpState.name in ["goingUp", "up"] %}on{% elif value_json.deviceUpState.name == 'unknown' %}None{% else %}off{% endif %}`
        : dataSourceAddress.variableName?.name === "unitState"
        ? `{% if value_json.assetState.name == 'occupied' %}on{% elif value_json.assetState.name == 'free' %}off{% else %}off{% endif %}`
        : dataSourceAddress.variableName?.name === "motion"
        ? "on"
        : "{{ value_json.value }}",
    off_delay: dataSourceAddress.variableName?.name === "motion" ? 60 : undefined,
    json_attributes_topic: topic,
    json_attributes_template: "{{ value_json | tojson }}",
    payload_on: "on",
    payload_off: "off",
    name: unit.name + ` ${dataSourceAddress.variableName?.name}`,
    unique_id: `${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}`,
    device_class: getDeviceClass({ dataSourceAddress }),
    device,
    unit_of_measurement: await getUnitOfMeasurement({ dataSourceAddress, cirrusHost, sessionId }),

    availability: [
      { topic: chassisAvailabilityTopic, payload_available: onlinePayload, payload_not_available: offlinePayload },
      { topic: gatewayAvailabilityTopic, payload_available: onlinePayload, payload_not_available: offlinePayload },
    ],
    availability_mode: "all",
  };
}

export function getDeviceClass({ dataSourceAddress }: { dataSourceAddress: DataSourceAddress }) {
  switch (dataSourceAddress?.variableName?.name) {
    case "uplog":
      return "connectivity";
    case "unitState":
      return "occupancy";
    case "motion":
      return "motion";
  }
}
