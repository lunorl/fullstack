import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
export const mergeBooks = (existing = [], incoming) => {
  const merged = existing ? existing.slice() : [];

  const existingIds = new Set(existing.map((book) => book._id));

  if (!existingIds.has(incoming._id)) {
    merged.push(incoming);
  }

  return merged;
};
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("guy-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allBooks: {
            merge: mergeBooks,
          },
        },
      },
    },
  }),
  link: splitLink,
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
