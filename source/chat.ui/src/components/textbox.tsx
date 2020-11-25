import React, { isValidElement, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import validation from "../infrastructure/validation";

export enum InputType {
  "username",
  "email",
}

type TextboxProps = {
  name: string;
  icon: IconDefinition;
  inputType: InputType | undefined;
  onChange: (text: string) => void;
  isValid: (isValid: boolean) => void | undefined;
};

export const Textbox = (props: TextboxProps) => {
  const [text, setText] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const { icon, name, onChange, inputType } = props;

  useEffect(() => setIsValid(validate()), [text]);
  useEffect(() => props.isValid(isValid), [isValid]);

  const validate = (): boolean => {
    if (inputType === InputType.email) return validation.isValidEmail(text);
    if (inputType === InputType.username)
      return validation.isValidUsername(text);

    return false;
  };

  return (
    <div
      className="login-box-container"
      style={
        !isValid && inputType !== undefined && text.length > 0
          ? {
              borderBottom: "2px solid #ffa4a4",
            }
          : {}
      }
    >
      <FontAwesomeIcon icon={icon} size={"xs"} />
      <input
        type="text"
        name="login-textbox"
        className="login-textbox"
        placeholder={name}
        onChange={(input: React.ChangeEvent<HTMLInputElement>) => {
          onChange(input.target.value);
          setText(input.target.value);
        }}
        value={text}
      />
    </div>
  );
};
