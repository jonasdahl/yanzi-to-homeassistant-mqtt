import fetch from "node-fetch";
import * as t from "io-ts";
import { QueryClient } from "react-query/core";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 10 * 1000, cacheTime: 10 * 1000 } } });

export async function graphqlRequest<T>({
  cirrusHost,
  sessionId,
  query,
  variables,
  dataType,
}: {
  sessionId: string;
  cirrusHost: string;
  query: string;
  variables: Record<string, string>;
  dataType: t.Type<T>;
}) {
  const data = await queryClient.fetchQuery({
    queryKey: ["graphql-query", cirrusHost, sessionId, variables, query],
    queryFn: async () => {
      const res = await fetch(`https://${cirrusHost}/graphql`, {
        method: "POST",
        headers: { authorization: `bearer ${sessionId}` },
        body: JSON.stringify({ query, variables }),
      }).catch((e) => {
        console.error(e);
      });
      if (!res || !res.ok) {
        throw new Error("Failed to fetch");
      }
      const json = await res.json();
      if (!dataType.is(json)) {
        throw new Error("Invalid data format: " + JSON.stringify(json));
      }
      return json;
    },
    retry: 3,
  });
  return data;
}
