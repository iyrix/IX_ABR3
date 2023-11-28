import config from "../../config";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

const httpLink = new HttpLink({ uri: config.graphqlEndpoint });

const combinedLink = from([httpLink]);

const client = new ApolloClient({
  link: combinedLink,
  cache: new InMemoryCache(),
});

export default client;
