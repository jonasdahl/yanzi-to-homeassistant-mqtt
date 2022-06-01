import { YanziSocket } from "@yanzi/socket";
import { GetLocationUnitsDocument } from "../generated/graphql";
import { graphqlRequest } from "./graphql";

export async function getLocationMetadata({ socket, locationId }: { socket: YanziSocket; locationId: string }) {
  const data = await graphqlRequest({
    socket,
    variables: { locationId },
    query: GetLocationUnitsDocument,
  });

  const versions = data.location?.inventory?.list?.reduce(
    (next, { unitAddress, version }) => ({ ...next, [unitAddress?.did ?? "null"]: version ?? undefined }),
    {} as Record<string, string | undefined>
  );
  return { ...data.location, versions };
}
