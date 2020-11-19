import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

type PasswordboxProps = {
  name: string;
};

export const Passwordbox = (props: PasswordboxProps) => {
  return (
    <div className="login-box-container">
      <FontAwesomeIcon icon={faLock} />
      <input
        type="password"
        name="login-passwordbox"
        className="login-passwordbox"
        placeholder={props.name}
      />
    </div>
  );
};
