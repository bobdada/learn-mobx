import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { StoreProvider } from "./models/index";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
