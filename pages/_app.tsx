import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "../config/theme";
import { store } from "../config/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
