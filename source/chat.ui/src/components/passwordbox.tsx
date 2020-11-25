import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

type PasswordboxProps = {
  name: string;
  comparisonPassword: string | undefined;
  shouldValidate: boolean;
  onChange: (text: string) => void;
  isValid: (isValid: boolean) => void | undefined;
};

export const Passwordbox = (props: Partial<PasswordboxProps>) => {
  const { name, comparisonPassword, shouldValidate, onChange } = props;

  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(
    () => (shouldValidate ? setIsValid(validate()) : setIsValid(true)),
    [password]
  );
  useEffect(() => props.isValid && props.isValid(isValid), [isValid]);

  const validate = (): boolean => password === comparisonPassword;

  return (
    <div
      className="login-box-container"
      style={
        !isValid
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
