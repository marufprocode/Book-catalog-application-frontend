import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { StyleProvider } from "@ant-design/cssinjs";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
      <Provider store={store}>
        <App />
      </Provider>
    </StyleProvider>
  </React.StrictMode>
);
