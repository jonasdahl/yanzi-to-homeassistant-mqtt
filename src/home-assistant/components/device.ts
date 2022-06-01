import { YanziSocket } from "@yanzi/socket";
import { productNames } from "../../cirrus/products";
import { getUnitMetadata } from "../../cirrus/unit";
import { cirrusHost } from "../../config";
import { UnitType } from "../../generated/graphql";

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
    configuration_url: `https://live.yanzi.cloud/locations/${locationId}/devices/${did}?host=${cirrusHost}`,
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
