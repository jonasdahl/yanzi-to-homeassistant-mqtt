import { graphqlRequest } from "./graphql";
import { GetLocationUnitsDocument } from "../generated/graphql";

export async function getLocationMetadata({
  cirrusHost,
  sessionId,
  locationId,
}: {
  sessionId: string;
  cirrusHost: string;
  locationId: string;
}) {
  const data = await graphqlRequest({
    cirrusHost,
    sessionId,
    variables: { locationId },
    query: GetLocationUnitsDocument,
  });

  const versions = data.location?.inventory?.list?.reduce(
    (next, { unitAddress, version }) => ({ ...next, [unitAddress?.did ?? "null"]: version ?? undefined }),
    {} as Record<string, string | undefined>
  );
  return { ...data.location, versions };
}
