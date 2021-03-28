import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { flatten } from "lodash";
import { getLocationMetadata } from "./location";

export function getDataSourceAddress({
  did,
  locationId,
  variableName,
}: {
  locationId: string;
  did: string;
  variableName?: string;
}): DataSourceAddress {
  return {
    resourceType: "DataSourceAddress",
    did,
    locationId,
    variableName: variableName
      ? {
          resourceType: "VariableName",
          name: variableName as any,
        }
      : undefined,
  };
}

export async function getAllDataSources({
  cirrusHost,
  locationId,
  socket,
}: {
  cirrusHost: string;
  locationId: string;
  socket: YanziSocket;
}) {
  if (!socket.sessionId) {
    throw new Error("Socket is not authenticated");
  }
  const data = await getLocationMetadata({
    cirrusHost,
    locationId,
    sessionId: socket.sessionId,
  });
  const dataSourceAddresses = [
    ...flatten(
      data.units.list.map(({ dataSources, ...unit }) =>
        dataSources.map((dataSource) => ({
          did: unit.unitAddress.did,
          variableName: dataSource.variableName,
          locationId,
        }))
      )
    ),
    ...data.gateway.dataSources.map((dataSource) => ({
      did: data.gateway.unitAddress.did,
      variableName: dataSource.variableName,
      locationId,
    })),
  ].map(getDataSourceAddress);

  return dataSourceAddresses;
}
