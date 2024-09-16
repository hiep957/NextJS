import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ErrorBoundary from "../components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default MyApp;
