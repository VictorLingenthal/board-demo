
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  // uri: 'http://localhost:4444/graphql',
  uri: '/graphql',
});
