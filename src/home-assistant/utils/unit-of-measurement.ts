import { DataSourceAddress } from "@yanzi/socket";
import { getDataSourceMetadata } from "../../cirrus/data-sources";

export async function getUnitOfMeasurement({
  dataSourceAddress,
  cirrusHost,
  sessionId,
}: {
  dataSourceAddress: DataSourceAddress;
  cirrusHost: string;
  sessionId: string;
}) {
  if (dataSourceAddress.variableName?.name === "battery") {
    return "%";
  }
  if (dataSourceAddress.variableName?.name === "motion") {
    return undefined;
  }
  const res = await getDataSourceMetadata({ dataSourceAddress, cirrusHost, sessionId });
  const siUnit = res?.siUnit?.trim();
  switch (siUnit) {
    case "NA":
      return undefined;
    case "percent":
      return "%";
    case "kelvin":
      return "K";
    case "celsius":
      return "°C";
    case "pascal":
      return "Pa";
    case "motion":
      return undefined;
    default:
      return siUnit;
  }
}
