import React, { useEffect, useState } from "react";
import { InputType, Textbox } from "../textbox";
import { Passwordbox } from "../passwordbox";
import { Button } from "../button";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/userContext";
import { useValidation } from "../../infrastructure/validation";

type RegistrationViewProps = {
  onClick: () => void;
  isLoggedIn: (state: boolean) => void;
};

type InputFormFields = {
  username: string;
  email: string;
  password: string;
  passwordRepeated: string;
};

export const RegistrationView = (props: RegistrationViewProps) => {
  const { functions, isValid, errorMessage } = useUserContext();
  const [localUser, setLocalUser] = useState<InputFormFields>({
    username: "",
    email: "",
    password: "",
    passwordRepeated: "",
  });
  const isValidInput = useValidation(localUser);

  useEffect(() => props.isLoggedIn(isValid || false), [isValid]);

  const handleRegistration = () => {
    if (
      functions.userRegistration &&
      isValidInput.username &&
      isValidInput.email &&
      isValidInput.password
    )
      functions.userRegistration({
        _id: "",
        username: localUser.username,
        email: localUser.email,
        password: localUser.password,
        profilePicture: {},
        contacts: undefined
      });
  };

  return (
    <div>
      <h2>Sign Up!</h2>
      <p style={isValid ? { visibility: "hidden" } : { visibility: "visible" }}>
        {errorMessage}
      </p>
      <Textbox
        name="Username"
        icon={faUser}
        isValid={isValidInput.username}
        inputType={InputType.username}
        onChange={(text: string) =>
          setLocalUser({ ...localUser, username: text })
        }
      />
      <Textbox
        name="E-Mail"
        isValid={isValidInput.email}
        icon={faEnvelope}
        inputType={InputType.email}
        onChange={(text: string) => setLocalUser({ ...localUser, email: text })}
      />
      <Passwordbox
        name="Password"
        onChange={(text: string) =>
          setLocalUser({ ...localUser, password: text })
        }
        isValid={isValidInput.password}
      />
      <Passwordbox
        name="Repeat Password"
        onChange={(text: string) =>
          setLocalUser({ ...localUser, passwordRepeated: text })
        }
        isValid={isValidInput.password}
      />

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
        onClick={() => handleRegistration()}
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
