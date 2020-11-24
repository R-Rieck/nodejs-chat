import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Login } from "./pages/login/index";
import { StoreProvider } from "./context/userContext";
import "./styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <div className="app">
        <Login />
      </div>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
