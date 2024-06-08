import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import "animate.css";
import { Provider } from "react-redux";
import { Loading } from "./components/loading/loading";
import { store } from "./context/store";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { SnackbarProvider } from "notistack";

const ton_url = "https://light-paper.vercel.app/tonconnect-manifest.json";
const root = ReactDOM.createRoot(document.getElementById("root"));
document.documentElement.style.setProperty("--animate-duration", ".45s");
root.render(
  <TonConnectUIProvider manifestUrl={ton_url}>
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Loading />
          <Router />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  </TonConnectUIProvider>
);
