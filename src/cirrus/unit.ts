import * as t from "io-ts";
import { graphqlRequest } from "./graphql";
import { getLocationMetadata } from "./location";

export async function getUnitMetadata({
  cirrusHost,
  sessionId,
  locationId,
  did,
}: {
  sessionId: string;
  cirrusHost: string;
  locationId: string;
  did: string;
}) {
  const { data } = await graphqlRequest({
    cirrusHost,
    dataType,
    sessionId,
    query: `
      query GetUnits($locationId: String!, $did: String!) { 
        location(locationId: $locationId) { 
          gateway { unitAddress { did } }
          unit(did: $did) {
            unitTypeFixed
            name
            unitAddress { did }
            productType
            dataSources { variableName siUnit }
            chassisParent { unitAddress { did } unitTypeFixed }
          }
        } 
      }
    `,
    variables: { locationId, did },
  });

  const locationMetadata = await getLocationMetadata({ cirrusHost, locationId, sessionId });
  const deviceDid =
    data.location.unit.chassisParent?.unitTypeFixed === "physicalOrChassis"
      ? data.location.unit.chassisParent.unitAddress.did
      : data.location.unit.unitTypeFixed === "physicalOrChassis"
      ? data.location.unit.unitAddress.did
      : data.location.unit.unitTypeFixed === "gateway"
      ? data.location.unit.unitAddress.did
      : did;
  return {
    ...data.location.unit,
    version: locationMetadata.versions[did],
    gatewayDid: data.location.gateway.unitAddress.did,
    deviceDid,
  };
}

const dataType = t.type({
  data: t.type({
    location: t.type({
      gateway: t.type({ unitAddress: t.type({ did: t.string }) }),
      unit: t.type({
        name: t.string,
        unitTypeFixed: t.string,
        unitAddress: t.type({ did: t.string }),
        dataSources: t.array(t.type({ variableName: t.string, siUnit: t.union([t.null, t.undefined, t.string]) })),
        productType: t.union([t.null, t.string]),
        chassisParent: t.union([t.null, t.type({ unitAddress: t.type({ did: t.string }), unitTypeFixed: t.string })]),
      }),
    }),
  }),
});
