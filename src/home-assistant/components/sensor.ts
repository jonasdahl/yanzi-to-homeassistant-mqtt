import { DataSourceAddress } from "@yanzi/socket";
import { defaultMqttTopicMapper } from "../../cirrus-to-mqtt/subscriptions";
import { getUnitMetadata } from "../../cirrus/unit";
import { getDeviceClass } from "./../utils/device-classes";
import { getUnitOfMeasurement } from "./../utils/unit-of-measurement";
import { getDeviceConfig } from "./device";

export async function getSensorConfig({
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

  return {
    state_topic: topic,
    value_template:
      dataSourceAddress.variableName?.name === "battery" ? "{{ value_json.percentFull }}" : "{{ value_json.value }}",
    json_attributes_topic: topic,
    json_attributes_template: "{{ value_json | tojson }}",
    name: `${dataSourceAddress.locationId}-${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}`, // TODO
    unique_id: `${dataSourceAddress.locationId}-${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}`,
    device_class: getDeviceClass({ dataSourceAddress }),
    device: unit.deviceDid
      ? getDeviceConfig({
          cirrusHost,
          did: unit.deviceDid,
          locationId: dataSourceAddress.locationId,
          sessionId,
        })
      : null,
    unit_of_measurement: getUnitOfMeasurement({ dataSourceAddress }),
  };
}
