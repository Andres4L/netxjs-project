import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
 
// Definir esquema GraphQL (tipo y resolvers)
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "¡Hola desde Apollo Server en Next.js!",
  },
};

// Crear servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Exportar API route para Next.js
export default startServerAndCreateNextHandler<NextRequest>(server);
