import { DataSourceAddress, YanziSocket } from "@yanzi/socket";
import { AsyncClient } from "async-mqtt";
import { getAllDataSources } from "../cirrus/data-sources";
import { getLatestSample } from "../cirrus/samples";
import { logger } from "../logger";
import { publishSample } from "./publish";

export async function publishLatestSamples({
  socket,
  mqttClient,
  dataSourceAddress,
}: {
  socket: YanziSocket;
  mqttClient: AsyncClient;
  dataSourceAddress: DataSourceAddress;
}) {
  const allDataSources = await getAllDataSources({ locationId: dataSourceAddress.locationId!, socket });
  const dataSourceAddresses = allDataSources.filter(
    (dsa) =>
      (dataSourceAddress.locationId ? dataSourceAddress.locationId === dsa.locationId : true) &&
      (dataSourceAddress.did ? dataSourceAddress.did === dsa.did : true) &&
      (dataSourceAddress.variableName?.name ? dataSourceAddress.variableName.name === dsa.variableName?.name : true)
  );

  await Promise.all(
    dataSourceAddresses
      .map(async (dataSourceAddress) => {
        const sample = await getLatestSample({ socket, dataSourceAddress });
        if (sample) {
          await publishSample({ sample, dataSourceAddress, mqttClient });
        }
      })
      .map((promise) => promise.catch((e) => logger.error(e)))
  );
}
