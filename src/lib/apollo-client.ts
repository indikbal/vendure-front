import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://vendure-demo-2.onrender.com/shop-api",
      headers: {
        'vendure-token': 'qhnwfiktz724g9j4splg'
      }
    }),
  });
});
