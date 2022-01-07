import { getUnitMetadata } from "../../cirrus/unit";
import { productNames } from "../../cirrus/products";

export async function getDeviceConfig({
  cirrusHost,
  did,
  locationId,
  sessionId,
}: {
  cirrusHost: string;
  did: string;
  locationId: string;
  sessionId: string;
}) {
  const unit = await getUnitMetadata({ cirrusHost, did, locationId, sessionId });

  return {
    connections: [],
    identifiers: [unit.unitAddress?.did!],
    name: unit.name,
    model: productNames[unit.productType ?? ""] ?? unit.productType ?? unit.unitTypeFixed ?? "Yanzi Unit",
    manufacturer: "Yanzi by Altacogni",
    via_device: unit.gatewayDid,
    sw_version: unit.version ?? undefined,
  };
}
