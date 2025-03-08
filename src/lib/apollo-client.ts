import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql", // Cambia esto cuando tengas el backend listo
  cache: new InMemoryCache(),
});

export default client;