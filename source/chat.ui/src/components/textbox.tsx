import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type TextboxProps = {
  name: string;
  icon: IconDefinition;
  onChange: (text: string) => void;
};

export const Textbox = (props: TextboxProps) => {
  const [text, setText] = useState<string>("");

  return (
    <div className="login-box-container">
      <FontAwesomeIcon icon={props.icon} size={"xs"} />
      <input
        type="text"
        name="login-textbox"
        className="login-textbox"
        placeholder={props.name}
        onChange={(input: React.ChangeEvent<HTMLInputElement>) => {
          props.onChange(input.target.value);
          setText(input.target.value);
        }}
        value={text}
      />
    </div>
  );
};
