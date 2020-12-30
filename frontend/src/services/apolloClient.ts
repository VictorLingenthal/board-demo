
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  uri: '/graphql',
});
