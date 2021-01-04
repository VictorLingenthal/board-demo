import mongoose from 'mongoose'

import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';


const DB = 'test'
const url = 'mongodb://127.0.0.1:27017/' + DB

export const connectToDb = async () => {
  await mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.error(error));;
}

export const dropTestDb = async () => {
  await mongoose.connection.db.dropDatabase().catch(error => console.error(error));;
}

export const closeDbConnection = async () => {
  await mongoose.connection.close().catch(error => console.error(error));;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req,res}) => ({req,res}),
});

export const apolloClient = createTestClient(server)
