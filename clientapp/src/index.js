import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { FirebaseProvider } from "./utils/firebaseProvider";
import { store } from "./configs/store";
import App from "./layouts/App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </Provider>
  </React.StrictMode>
);
