import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { flatten } from "lodash";
import * as t from "io-ts";
import { graphqlRequest } from "./graphql";
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
    variableName: variableName ? { resourceType: "VariableName", name: variableName as any } : undefined,
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
  const data = await getLocationMetadata({ cirrusHost, locationId, sessionId: socket.sessionId });
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

export async function getDataSourceMetadata({
  cirrusHost,
  sessionId,
  dataSourceAddress,
}: {
  sessionId: string;
  cirrusHost: string;
  dataSourceAddress: DataSourceAddress;
}) {
  const { data } = await graphqlRequest({
    cirrusHost,
    dataType,
    sessionId,
    query: `
      query GetDataSourceAddress($locationId: String!, $did: String!) { 
        location(locationId: $locationId) { 
          gateway { unitAddress { did } }
          unit(did: $did) {
            name
            unitAddress { did }
            productType
            dataSources { variableName siUnit }
            chassisParent { unitAddress { did } unitTypeFixed }
          }
        } 
      }
    `,
    variables: { locationId: dataSourceAddress.locationId!, did: dataSourceAddress.did! },
  });

  return data.location.unit.dataSources.find((x) => x.variableName === dataSourceAddress.variableName?.name);
}

const dataType = t.type({
  data: t.type({
    location: t.type({
      gateway: t.type({ unitAddress: t.type({ did: t.string }) }),
      unit: t.type({
        name: t.string,
        unitAddress: t.type({ did: t.string }),
        dataSources: t.array(t.type({ variableName: t.string, siUnit: t.union([t.null, t.undefined, t.string]) })),
        productType: t.union([t.null, t.string]),
        chassisParent: t.union([t.null, t.type({ unitAddress: t.type({ did: t.string }), unitTypeFixed: t.string })]),
      }),
    }),
  }),
});
