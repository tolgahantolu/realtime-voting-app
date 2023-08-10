//import { ApolloClient, InMemoryCache } from "@apollo/client";
//
//const client = new ApolloClient({
//  uri: "http://localhost:8080/v1/graphql",
//  cache: new InMemoryCache(),
//});
//
//export default client;

import { createClient } from "graphql-ws";
// Apollo Client Web v3.5.10 has a GraphQLWsLink class which implements
// graphql-ws directly. For older versions, see the next code block
// to define your own GraphQLWsLink.
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8080/v1/graphql",
  })
);

const httpLink = new HttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
