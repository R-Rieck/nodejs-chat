import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

type PasswordboxProps = {
  name: string;
  onChange: (text: string) => void;
  isValid: boolean;
};

export const Passwordbox = (props: Partial<PasswordboxProps>) => {
  const { name, onChange, isValid } = props;

  const [password, setPassword] = useState<string>("");

  return (
    <div
      className="login-box-container"
      style={
        !isValid && password.length > 0
          ? {
              borderBottom: "2px solid #ffa4a4",
            }
          : {}
      }
    >
      <FontAwesomeIcon icon={faLock} size={"xs"} />
      <input
        type="password"
        name="login-passwordbox"
        className="login-passwordbox"
        placeholder={name}
        onChange={(input: React.ChangeEvent<HTMLInputElement>) => {
          onChange && onChange(input.target.value);
          setPassword(input.target.value);
        }}
        value={password}
      />
    </div>
  );
};
