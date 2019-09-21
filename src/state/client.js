import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import resolvers from './resolvers';
import typeDefs from './type-definitions';

const initialState = {
  seed: 0,
  isDrawerOpen: false,
  currentView: 'home',
};

const cache = new InMemoryCache();

const client = new ApolloClient({
  typeDefs,
  resolvers,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
  ]),
  cache,
});

cache.writeData({ data: initialState });

export default client;
