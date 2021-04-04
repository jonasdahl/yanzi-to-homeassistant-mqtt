import fetch from "node-fetch";
import * as t from "io-ts";
import { QueryClient } from "react-query/core";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30 * 1000, cacheTime: 30 * 1000 } } });

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
        headers: { authorization: `bearer ${sessionId}`, "content-type": "text/plain; charset=UTF-8" },
        body: JSON.stringify({ query, variables }),
      }).catch((e) => {
        console.error(e);
      });
      if (!res || !res.ok) {
        throw new Error("Failed to fetch: " + (res ? `${res.status} ${res.statusText}` : "No response."));
      }
      const json = await res.json();
      if (!dataType.is(json)) {
        throw new Error("Invalid data format: " + JSON.stringify(json));
      }
      return json;
    },
    retry: 2,
    staleTime: 30 * 1000,
    cacheTime: 30 * 1000,
  });
  return data;
}
