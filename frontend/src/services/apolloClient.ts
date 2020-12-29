
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  uri: process.env.GRAPHQL_URL || 'http://localhost:4444/graphql',
});
