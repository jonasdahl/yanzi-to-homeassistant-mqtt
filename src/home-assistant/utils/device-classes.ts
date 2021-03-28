import { DataSourceAddress, VariableName } from "@yanzi/socket";

export function getDeviceClass({
  dataSourceAddress,
}: {
  dataSourceAddress: DataSourceAddress;
}) {
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
    case "motion":
      return "motion";
    case "present":
    case "uplog":
      return "connectivity";
    case "pressure":
    case "pressureValue":
      return "pressure";
    case "volt":
      return "voltage";
    case "battery":
      return "battery";
    case "unitState":
      return "occupancy";
    case "illuminance":
      return "illuminance";
  }
}
