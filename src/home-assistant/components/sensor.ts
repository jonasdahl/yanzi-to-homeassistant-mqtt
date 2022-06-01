import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { defaultMqttTopicMapper } from "../../cirrus-to-mqtt/subscriptions";
import { getUnitMetadata } from "../../cirrus/unit";
import { getAvailabilityTopic, offlinePayload, onlinePayload } from "../availability";
import { getUnitOfMeasurement } from "./../utils/unit-of-measurement";
import { getDeviceConfig } from "./device";

export async function getSensorConfig({
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
    entity_category: getEntityCategory({ dataSourceAddress }),
    enabled_by_default: getEntityEnabledByDefault({ dataSourceAddress }),
    device: unit.deviceDid
      ? await getDeviceConfig({
          socket,
          did: unit.deviceDid,
          locationId: dataSourceAddress.locationId,
        })
      : undefined,
    unit_of_measurement: await getUnitOfMeasurement({ dataSourceAddress, socket }),

    availability: [
      { topic: chassisAvailabilityTopic, payload_available: onlinePayload, payload_not_available: offlinePayload },
      { topic: gatewayAvailabilityTopic, payload_available: onlinePayload, payload_not_available: offlinePayload },
    ],
    availability_mode: "all",
  };
}

export function getEntityEnabledByDefault({ dataSourceAddress }: { dataSourceAddress: DataSourceAddress }) {
  switch (dataSourceAddress?.variableName?.name) {
    case "temperatureK":
    case "statistics":
      return false;

    default:
      return true;
  }
}

export function getEntityCategory({ dataSourceAddress }: { dataSourceAddress: DataSourceAddress }) {
  switch (dataSourceAddress?.variableName?.name) {
    case "temperature":
    case "temperatureC":
    case "temperatureK":
    case "temperatureF":
    case "totalenergy":
    case "totalApparentEnergy":
    case "totalpower":
    case "electricalPower":
    case "totalpowerInst":
    case "dmdTotalPower":
    case "relativeHumidity":
    case "pressure":
    case "pressureValue":
    case "volt":
    case "illuminance":
      return undefined;
    case "battery":
    case "statistics":
    case "uplog":
      return "diagnostic";
  }
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
