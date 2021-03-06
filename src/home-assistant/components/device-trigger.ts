import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { defaultMqttTopicMapper } from "../../cirrus-to-mqtt/subscriptions";
import { getUnitMetadata } from "../../cirrus/unit";
import { getDeviceConfig } from "./device";

export async function getDeviceTriggerConfig({
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

  return {
    automation_type: "trigger",
    topic,
    type: "motion triggered",
    payload: "triggered",
    value_template: `{% if value_json.timeLastMotion > as_timestamp(now()) * 1000 - 60 * 1000 %}triggered{% else %}void{% endif %}`,
    subtype: "PIR",
    device: unit.deviceDid
      ? await getDeviceConfig({
          socket,
          did: unit.deviceDid,
          locationId: dataSourceAddress.locationId,
        })
      : undefined,
  };
}

export function getDeviceClass({ dataSourceAddress }: { dataSourceAddress: DataSourceAddress }) {
  switch (dataSourceAddress?.variableName?.name) {
    case "temperature":
    case "temperatureC":
    case "temperatureK":
    case "temperatureF":
      return "temperature";
    case "totalenergy":
    case "totalApparentEnergy":
      return "energy";
    case "totalpower":
    case "electricalPower":
    case "totalpowerInst":
    case "dmdTotalPower":
      return "power";
    case "relativeHumidity":
      return "humidity";
    case "pressure":
    case "pressureValue":
      return "pressure";
    case "volt":
      return "voltage";
    case "battery":
      return "battery";
    case "illuminance":
      return "illuminance";
  }
}
