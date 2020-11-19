import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

type TextboxProps = {
  name: string;
};

export const Textbox = (props: TextboxProps) => {
  return (
    <div className="login-box-container">
      <FontAwesomeIcon icon={faEnvelope} />
      <input
        type="text"
        name="login-textbox"
        className="login-textbox"
        placeholder={props.name}
      />
    </div>
  );
};
