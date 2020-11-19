import React from "react";
import { Textbox } from "../textbox";
import { Passwordbox } from "../passwordbox";
import { Button } from "../button";

type loginViewProps = {
  onClick: () => void;
};

export const LoginView = (props: loginViewProps) => {
  return (
    <div>
      <h2>Login</h2>
      <Textbox name="E-Mail or Username" />
      <Passwordbox name="Password" />
      <Button
        text="Log In!"
        isDisabled={false}
        customStyle={{
          border: "none",
          background: "linear-gradient(to left, #ba1865, #e02da4)",
          color: "white",
          fontSize: "1.1rem",
          margin: "1.5rem 0",
          padding: "0.8rem 8rem",
        }}
        onClick={() => console.log("hello")}
      />
      <Button
        text="Sign Up"
        isDisabled={false}
        customStyle={{
          border: "none",
          background: "transparent",
          color: "#aeaeae",
          fontSize: "1.1rem",
          margin: "1.5rem 0",
          padding: "0.4rem 8rem",
        }}
        onClick={props.onClick}
      />
    </div>
  );
};
