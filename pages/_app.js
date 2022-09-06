import { ThemeProvider } from "styled-components";
import "../styles/globals.css";
import Layout from "../components/layout";
import { theme } from "../components/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
