import { DataSourceAddress, YanziSocket } from "@yanzi/socket";

export async function getLatestSample({
  socket,
  dataSourceAddress,
}: {
  dataSourceAddress: DataSourceAddress;
  socket: YanziSocket;
}) {
  const response = await socket.request({
    messageType: "GetSamplesRequest",
    dataSourceAddress,
    timeSerieSelection: { resourceType: "TimeSerieSelection", numberOfSamplesBeforeStart: 1, timeStart: Date.now() },
  });
  const sample = response.sampleListDto?.list?.[0];
  return sample ?? null;
}
