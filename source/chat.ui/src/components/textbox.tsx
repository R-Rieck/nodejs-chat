import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export enum InputType {
  "username",
  "email",
}

type TextboxProps = {
  name: string;
  icon: IconDefinition;
  inputType: InputType | undefined;
  onChange: (text: string) => void;
  isValid: boolean;
};

export const Textbox = (props: TextboxProps) => {
  const { icon, name, onChange, inputType, isValid } = props;

  const [text, setText] = useState<string>("");

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
