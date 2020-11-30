import React, { useState } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Login } from "./pages/login/index";
import { Landing } from "./pages/landing/index";
import { StoreProvider } from "./context/userContext";
import "./styles/index.scss";

const StartUp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <React.StrictMode>
      <StoreProvider>
        <div className="app">
          {!isLoggedIn ? (
            <Login isLoggedIn={(state: boolean) => setIsLoggedIn(state)} />
          ) : (
            <Landing />
          )}
        </div>
      </StoreProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<StartUp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
