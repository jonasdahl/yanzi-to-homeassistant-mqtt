import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { flatten } from "lodash";
import { graphqlRequest } from "./graphql";
import { getLocationMetadata } from "./location";
import { GetDataSourceAddressDocument } from "../generated/graphql";

export function getDataSourceAddress({
  did,
  locationId,
  variableName,
}: {
  locationId?: string | null;
  did?: string | null;
  variableName?: string | null;
}): DataSourceAddress {
  return {
    resourceType: "DataSourceAddress",
    did: did!,
    locationId: locationId!,
    variableName: variableName ? { resourceType: "VariableName", name: variableName as any } : undefined,
  };
}

export async function getAllDataSources({ locationId, socket }: { locationId: string; socket: YanziSocket }) {
  const data = await getLocationMetadata({ locationId, socket });
  const dataSourceAddresses = [
    ...flatten(
      data.units?.list.map(({ dataSources, ...unit }) =>
        dataSources.map((dataSource) => ({
          did: unit.unitAddress?.did,
          variableName: dataSource.variableName,
          locationId,
        }))
      ) ?? []
    ),
    ...(data.gateway?.dataSources.map((dataSource) => ({
      did: data.gateway?.unitAddress?.did,
      variableName: dataSource.variableName,
      locationId,
    })) ?? []),
  ].map(getDataSourceAddress);

  return dataSourceAddresses;
}

export async function getDataSourceMetadata({
  socket,
  dataSourceAddress,
}: {
  socket: YanziSocket;
  dataSourceAddress: DataSourceAddress;
}) {
  const data = await graphqlRequest({
    socket,
    query: GetDataSourceAddressDocument,
    variables: { locationId: dataSourceAddress.locationId!, did: dataSourceAddress.did! },
  });

  return data.location?.unit?.dataSources.find((x) => x.variableName === dataSourceAddress.variableName?.name);
}
