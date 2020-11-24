import React from "react";
import { Textbox } from "../textbox";
import { Passwordbox } from "../passwordbox";
import { Button } from "../button";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

type RegistrationViewProps = {
  onClick: () => void;
};

export const RegistrationView = (props: RegistrationViewProps) => {
  return (
    <div>
      <h2>Sign Up!</h2>
      {/* 
      <Textbox name="Username" icon={faUser} />
      <Textbox name="E-Mail" icon={faEnvelope} /> 
      <Passwordbox name="Password" />
      <Passwordbox name="Repeat Password" /> 
      */}
      <Button
        text="Sign Up"
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
        text="cancel"
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
