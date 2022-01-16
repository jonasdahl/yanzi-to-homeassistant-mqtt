import { getUnitMetadata } from "../../cirrus/unit";
import { productNames } from "../../cirrus/products";
import { UnitType } from "../../generated/graphql";
import { YanziSocket } from "@yanzi/socket";

export async function getDeviceConfig({
  did,
  locationId,
  socket,
}: {
  socket: YanziSocket;
  did: string;
  locationId: string;
}) {
  const unit = await getUnitMetadata({ did, locationId, socket });

  return {
    connections: [],
    identifiers: [unit.unitAddress?.did!],
    name: unit.name,
    model: productNames[unit.productType ?? ""] ?? unit.productType ?? unit.unitTypeFixed ?? "Yanzi Unit",
    manufacturer: "Yanzi by Altacogni",
    via_device: unit.gatewayDid,
    sw_version: unit.version ?? undefined,
    suggested_area:
      unit.chassisParent?.unitTypeFixed === UnitType.Gateway
        ? undefined
        : unit.assetParent?.name ?? unit.chassisParent?.assetParent?.name,
  };
}
