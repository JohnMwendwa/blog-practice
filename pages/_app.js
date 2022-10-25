import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import { theme } from "../components/theme";
import { SearchContextProvider } from "../components/contexts/searchContext";
import "../styles/globals.css";
import AdminLayout from "../components/admin/layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <SearchContextProvider>
        <Layout>
          {router.pathname === "/admin/messages" ||
          router.pathname === "/admin/users" ||
          router.pathname === "/admin/articles" ||
          router.pathname === "/admin/settings" ||
          router.pathname === "/admin/logout" ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </SearchContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
