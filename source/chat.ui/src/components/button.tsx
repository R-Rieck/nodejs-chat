import React from "react";

type ButtonProps = {
  text: string;
  isDisabled: boolean;
  customStyle: {
    color: string;
    background: string;
    border: string;
    fontSize: string;
    padding: string;
    margin: string;
  };
  onClick: () => void;
};

export const Button = (props: ButtonProps) => {
  const { text, isDisabled, customStyle, onClick } = props;

  return (
    <div className="button-wrapper">
      <button disabled={isDisabled} style={customStyle} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
