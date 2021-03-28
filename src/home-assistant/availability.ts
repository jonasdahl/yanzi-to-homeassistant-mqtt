export function getAvailabilityTopic({ did }: { did: string }) {
  return `yanzi-homeassistant/${did}/availability`;
}

export const onlinePayload = "online";
export const offlinePayload = "offline";
