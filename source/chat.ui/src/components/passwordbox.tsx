import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

type PasswordboxProps = {
  name: string;
  onChange: (text: string) => void;
};

export const Passwordbox = (props: PasswordboxProps) => {
  const [password, setPassword] = useState<string>("");

  return (
    <div className="login-box-container">
      <FontAwesomeIcon icon={faLock} size={"xs"} />
      <input
        type="password"
        name="login-passwordbox"
        className="login-passwordbox"
        placeholder={props.name}
        onChange={(input: React.ChangeEvent<HTMLInputElement>) => {
          props.onChange(input.target.value);
          setPassword(input.target.value);
        }}
        value={password}
      />
    </div>
  );
};
