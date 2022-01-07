import { GetUnitDocument } from "../generated/graphql";
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
  const data = await graphqlRequest({
    cirrusHost,
    sessionId,
    query: GetUnitDocument,
    variables: { locationId, did },
  });

  const locationMetadata = await getLocationMetadata({ cirrusHost, locationId, sessionId });
  const unit = data.location?.unit;
  const deviceDid =
    unit?.chassisParent?.unitTypeFixed === "physicalOrChassis"
      ? unit?.chassisParent?.unitAddress?.did
      : unit?.unitTypeFixed === "physicalOrChassis"
      ? unit?.unitAddress?.did
      : unit?.unitTypeFixed === "gateway"
      ? unit?.unitAddress?.did
      : did;

  const name =
    data.location?.unit?.nameSetByUser ?? data.location?.unit?.chassisParent?.name ?? data.location?.unit?.name;

  return {
    ...data.location?.unit,
    name: name,
    version: locationMetadata.versions?.[did] ?? undefined,
    gatewayDid: data.location?.gateway?.unitAddress?.did!,
    deviceDid: deviceDid!,
  };
}
