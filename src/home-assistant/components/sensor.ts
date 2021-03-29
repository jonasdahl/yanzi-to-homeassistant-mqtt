import {
  DataSourceAddress,
  SampleCommunicationStatistics,
  SampleNodeStatistics,
  SamplePowerUpdate,
  SampleSiteOnlineStatus,
  SampleStatus,
  SampleUpState,
} from "@yanzi/socket";
import { defaultMqttTopicMapper } from "../../cirrus-to-mqtt/subscriptions";
import { getUnitMetadata } from "../../cirrus/unit";
import { logger } from "../../logger";
import { getAvailabilityTopic, onlinePayload, offlinePayload } from "../availability";
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

  const chassisAvailabilityTopic = getAvailabilityTopic({
    did: unit.chassisParent?.unitAddress.did ?? dataSourceAddress.did,
  });
  const gatewayAvailabilityTopic = getAvailabilityTopic({ did: unit.gatewayDid });

  return {
    state_topic: topic,
    value_template:
      dataSourceAddress.variableName?.name === "battery"
        ? "{{ value_json.percentFull }}"
        : dataSourceAddress.variableName?.name === "positionLog"
        ? "({{ value_json.longitude }}, {{ value_json.latitude }})"
        : dataSourceAddress.variableName?.name === "unitState"
        ? "{{ value_json.assetState.name }}"
        : dataSourceAddress.variableName?.name === "upsState"
        ? "{{ value_json.operatingPowerState.name }}"
        : dataSourceAddress.variableName?.name === "siteOnlineStatus"
        ? "{{ value_json.devicesTroubled }}"
        : "{{ value_json.value }}",

    json_attributes_topic: topic,
    json_attributes_template: "{{ value_json | tojson }}",
    name: unit.name + ` ${dataSourceAddress.variableName?.name}`,
    unique_id: `${dataSourceAddress.did}-${dataSourceAddress.variableName?.name}`,
    device_class: getDeviceClass({ dataSourceAddress }),
    device: unit.deviceDid
      ? await getDeviceConfig({
          cirrusHost,
          did: unit.deviceDid,
          locationId: dataSourceAddress.locationId,
          sessionId,
        })
      : undefined,
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
