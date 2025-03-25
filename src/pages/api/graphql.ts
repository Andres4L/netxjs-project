import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextApiRequest, NextApiResponse } from "next";
import { gql } from "graphql-tag";
import { PrismaClient } from "@prisma/client";
import { makeExecutableSchema } from "@graphql-tools/schema";

// Manejo global de Prisma para evitar múltiples instancias en desarrollo
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    role: Role!
  }

  type Movement {
    id: ID!
    concept: String!
    amount: Float!
    date: String!
    user: User!
  }

  enum Role {
    ADMIN
    USER
  }

  type Query {
    users: [User]
    movements: [Movement]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await prisma.user.findMany();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error al obtener los usuarios");
      }
    },
    movements: async () => {
      try {
        return await prisma.movement.findMany({
          include: { user: true },
        });
      } catch (error) {
        console.error("Error fetching movements:", error);
        throw new Error("Error al obtener los movimientos");
      }
    },
  },
  User: {
    role: (parent) => parent.role,
  },
  Movement: {
    user: async (parent) => {
      try {
        return await prisma.user.findUnique({
          where: { id: parent.userId },
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  introspection: true, // 🔥 Permitir introspección en producción
});

export default startServerAndCreateNextHandler(server);
