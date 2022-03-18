import { YanziSocket } from "@yanzi/socket";
import { GetUnitDocument } from "../generated/graphql";
import { graphqlRequest } from "./graphql";
import { getLocationMetadata } from "./location";

export async function getUnitMetadata({
  socket,
  locationId,
  did,
}: {
  socket: YanziSocket;
  locationId: string;
  did: string;
}) {
  const data = await graphqlRequest({
    socket,
    query: GetUnitDocument,
    variables: { locationId, did },
  });

  const locationMetadata = await getLocationMetadata({ locationId, socket });
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
