import Head from "next/head";
import { ThemeProvider } from "styled-components";

import Layout from "../components/layout";
import { theme } from "../components/theme";
import { SearchContextProvider } from "../components/contexts/searchContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <SearchContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
