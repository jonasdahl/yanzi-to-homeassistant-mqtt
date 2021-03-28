import { DataSourceAddress } from "@yanzi/socket";
import { defaultMqttTopicMapper } from "../../cirrus-to-mqtt/subscriptions";
import { getUnitMetadata } from "../../cirrus/unit";
import { getUnitOfMeasurement } from "./../utils/unit-of-measurement";
import { getDeviceConfig } from "./device";

export async function getDeviceTriggerConfig({
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
    automation_type: "trigger",
    topic,
    type: "motion triggered",
    subtype: "PIR",
    device: unit.deviceDid
      ? await getDeviceConfig({
          cirrusHost,
          did: unit.deviceDid,
          locationId: dataSourceAddress.locationId,
          sessionId,
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
