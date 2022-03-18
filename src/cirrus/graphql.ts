import { QueryClient } from "react-query/core";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { YanziSocket } from "@yanzi/socket";
import { print } from "graphql";
import { Exact } from "../generated/graphql";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30 * 1000, cacheTime: 30 * 1000 } } });

export async function graphqlRequest<TData, TVariables extends { locationId: string }>({
  query,
  variables,
  socket,
}: {
  query: TypedDocumentNode<TData, Exact<TVariables>>;
  variables: TVariables;
  socket: YanziSocket;
}) {
  const data = await queryClient.fetchQuery({
    queryKey: ["graphql-query", variables, query],
    queryFn: async () => {
      const response = await socket.request({
        messageType: "GraphQLRequest",
        locationAddress: { resourceType: "LocationAddress", locationId: variables.locationId },
        isLS: false,
        query: print(query),
        vars: JSON.stringify(variables),
      });
      const res = JSON.parse(response.result ?? "");
      if (res.error || res.errors || !res.data) {
        throw new Error("Result was not clean");
      }
      return res.data as TData;
    },
    retry: 2,
    staleTime: 30 * 1000,
    cacheTime: 30 * 1000,
  });
  return data;
}
