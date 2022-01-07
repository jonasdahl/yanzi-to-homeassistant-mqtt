import { QueryClient } from "react-query/core";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { GraphQLClient } from "graphql-request";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30 * 1000, cacheTime: 30 * 1000 } } });

export async function graphqlRequest<TData, TVariables>({
  cirrusHost,
  sessionId,
  query,
  variables,
}: {
  sessionId: string;
  cirrusHost: string;
  query: TypedDocumentNode<TData, TVariables>;
  variables: TVariables;
}) {
  const data = await queryClient.fetchQuery({
    queryKey: ["graphql-query", cirrusHost, sessionId, variables, query],
    queryFn: async () => {
      const client = new GraphQLClient(`https://${cirrusHost}/graphql`, {
        headers: { authorization: `bearer ${sessionId}` },
      });
      const res = await client.request<TData, TVariables>(query, variables);
      return res;
    },
    retry: 2,
    staleTime: 30 * 1000,
    cacheTime: 30 * 1000,
  });
  return data;
}
