import fetch from "node-fetch";
import * as t from "io-ts";
import { graphqlRequest } from "./graphql";

const dataType = t.type({
  data: t.type({
    location: t.type({
      locationId: t.string,
      gateway: t.type({
        name: t.string,
        unitAddress: t.type({ did: t.string }),
        dataSources: t.array(t.type({ variableName: t.string, siUnit: t.union([t.null, t.undefined, t.string]) })),
      }),
      inventory: t.type({
        list: t.array(
          t.type({ unitAddress: t.type({ did: t.string }), version: t.union([t.null, t.undefined, t.string]) })
        ),
      }),
      units: t.type({
        list: t.array(
          t.type({
            name: t.string,
            chassisParent: t.union([
              t.null,
              t.undefined,
              t.type({
                name: t.string,
                productType: t.union([t.string, t.null, t.undefined]),
                unitAddress: t.type({ did: t.string }),
              }),
            ]),
            unitAddress: t.type({ did: t.string }),
            dataSources: t.array(t.type({ variableName: t.string, siUnit: t.union([t.null, t.undefined, t.string]) })),
          })
        ),
      }),
    }),
  }),
});

export async function getLocationMetadata({
  cirrusHost,
  sessionId,
  locationId,
}: {
  sessionId: string;
  cirrusHost: string;
  locationId: string;
}) {
  const { data } = await graphqlRequest({
    cirrusHost,
    dataType,
    sessionId,
    variables: { locationId },
    query: `
      query GetUnits($locationId: String!) { 
        location(locationId: $locationId) { 
          locationId
          gateway { name unitAddress { did } dataSources { variableName siUnit } }
          units(first:10000) {
            list {
              chassisParent { name productType unitAddress { did } }
              name
              unitAddress { did }
              dataSources { variableName siUnit }
            }
          }
          inventory { list { unitAddress { did } version } }
        } 
      }
    `,
  });

  const versions = data.location.inventory.list.reduce(
    (next, { unitAddress: { did }, version }) => ({ ...next, [did]: version ?? undefined }),
    {} as Record<string, string | undefined>
  );
  return { ...data.location, versions };
}
