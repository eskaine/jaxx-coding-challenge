import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { FirebaseProvider } from "./utils/firebaseProvider";
import { store } from "./configs/store";
import App from "./layouts/App";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./configs/router";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FirebaseProvider>
    </Provider>
  </React.StrictMode>
);
