import React from "react";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.css";
import "bootstrap/dist/js/bootstrap.min.js";

import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./utils/ErrorBoundary";

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};
ReactDOM.render(
  <ErrorBoundary>
    <React.StrictMode>
      <AlertProvider template={AlertTemplate} {...options}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AlertProvider>
    </React.StrictMode>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
