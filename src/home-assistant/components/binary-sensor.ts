import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { defaultMqttTopicMapper } from "../../cirrus-to-mqtt/subscriptions";
import { getUnitMetadata } from "../../cirrus/unit";
import { getAvailabilityTopic, offlinePayload, onlinePayload } from "../availability";
import { getUnitOfMeasurement } from "../utils/unit-of-measurement";
import { getDeviceConfig } from "./device";
import { getEntityCategory, getEntityEnabledByDefault } from "./sensor";

export async function getBinarySensorConfig({
  dataSourceAddress,
  socket,
}: {
  dataSourceAddress: DataSourceAddress;
  socket: YanziSocket;
}) {
  const topic = defaultMqttTopicMapper({ dataSourceAddress });

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
    state_topic: topic,
    value_template:
      dataSourceAddress.variableName?.name === "uplog"
        ? `{% if value_json.deviceUpState.name in ["goingUp", "up"] %}on{% elif value_json.deviceUpState.name == 'unknown' %}None{% else %}off{% endif %}`
        : dataSourceAddress.variableName?.name === "unitState"
        ? `{% if value_json.assetState.name == 'occupied' %}on{% elif value_json.assetState.name == 'free' %}off{% else %}off{% endif %}`
        : dataSourceAddress.variableName?.name === "motion"
        ? `{% if value_json.timeLastMotion > as_timestamp(now()) * 1000 - 60 * 1000 %}on{% else %}off{% endif %}`
        : "{{ value_json.value }}",
    // off_delay: dataSourceAddress.variableName?.name === "motion" ? 60 : undefined,
    json_attributes_topic: topic,
    json_attributes_template: "{{ value_json | tojson }}",
    payload_on: "on",
    payload_off: "off",
    name: unit.name + ` ${dataSourceAddress.variableName?.name}`,
    unique_id: `${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}`,
    device_class: getDeviceClass({ dataSourceAddress }),
    entity_category: getEntityCategory({ dataSourceAddress }),
    enabled_by_default: getEntityEnabledByDefault({ dataSourceAddress }),
    device,
    unit_of_measurement: await getUnitOfMeasurement({ dataSourceAddress, socket }),

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
