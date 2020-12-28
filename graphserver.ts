import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import merge from "lodash/merge.js"
import mongoose from "mongoose"
import { createServer } from "http"
import dotenv from "dotenv"

import { userDefs, userResolvers } from './graphql/user'
import { cardDefs, cardResolvers } from './graphql/card'

dotenv.config();

const typeDefs = gql`

  type Query {
    name: String
  }

  type Mutation {
    addName(name:String):String
  }

  ${userDefs}
  ${cardDefs}

`;

const initResolvers = {
  Query: {
    name: () => 'Peter',
  },
  Mutation : {
    addName: (__:any, args:any) => args.name,
  }
}

const resolvers = merge(
  initResolvers,
  userResolvers,
  cardResolvers
)

mongoose
  .connect(
    (process.env.ATLAS_URI)as any,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("mongodb connected successfully");
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });
    const app = express();
    server.applyMiddleware({ app });
    const httpServer = createServer(app);

    const PORT = process.env.PORT || 4444;
    httpServer.listen({ port: PORT }, () => {
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
