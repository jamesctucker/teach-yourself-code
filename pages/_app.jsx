import React from "react";
// imports for Redux Toolkit
import { Provider } from "react-redux";
import { store } from "../store/store";
import "cross-fetch/polyfill";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import Head from "next/head";
import Router, { useRouter } from "next/router";

import { config, library } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import {
  faHome,
  faInfoCircle,
  faUser,
  faBookmark,
  faSignOutAlt,
  faCaretDown,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faAtom,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

import { faYoutube } from "@fortawesome/free-brands-svg-icons";

library.add(
  faHome,
  faInfoCircle,
  faUser,
  faYoutube,
  faBookmark,
  faSignOutAlt,
  faCaretDown,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faAtom,
  faMap
);

const authToken = process.env.HASURA_GRAPHQL_JWT_SECRET;
const adminSecret = process.env.HASURA_ADMIN_SECRET;
const hasuraEndpoint = process.env.HASURA_ENDPOINT;

// Create an Apollo instance here; wraps Hasura engine
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${hasuraEndpoint}`,
      headers: {
        authorization: `Bearer ${authToken}`,
        "x-hasura-admin-secret": `${adminSecret}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient();

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // Sets tab title using a modified version of the route name
  let title =
    router.pathname.slice(1).charAt(0).toUpperCase() + router.pathname.slice(2);

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>{title ? title : "Home"}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {/* Inject store props into unique Apollo component */}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}
