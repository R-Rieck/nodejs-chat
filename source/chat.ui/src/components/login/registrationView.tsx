import React, { useEffect, useState } from "react";
import { InputType, Textbox } from "../textbox";
import { Passwordbox } from "../passwordbox";
import { Button } from "../button";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/userContext";
import {
  isEqualPassword,
  isValidEmail,
  isValidUsername,
} from "../../infrastructure/validation";

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

type ValidationType = {
  username: boolean;
  email: boolean;
  password: boolean;
};

export const RegistrationView = (props: RegistrationViewProps) => {
  const { userRegistration, isValid } = useUserContext();
  const [localUser, setLocalUser] = useState<InputFormFields>({
    username: "",
    email: "",
    password: "",
    passwordRepeated: "",
  });

  const [validation, setValidation] = useState<ValidationType>({
    username: false,
    email: false,
    password: false,
  });

  useEffect(() => props.isLoggedIn(isValid || false), [isValid]);

  useEffect(() => {
    if (isValidUsername(localUser.username) && !validation.username) {
      setValidation({ ...validation, username: true });
    }

    if (isValidEmail(localUser.email) && !validation.email) {
      setValidation({ ...validation, email: true });
    }

    if (
      isEqualPassword(localUser.password, localUser.passwordRepeated) &&
      !validation.password
    ) {
      setValidation({ ...validation, password: true });
    }
  }, [localUser]);

  const handleRegistration = () => {
    if (
      userRegistration &&
      validation.username &&
      validation.email &&
      validation.password
    )
      userRegistration({
        username: localUser.username,
        email: localUser.email,
        password: localUser.password,
      });
  };

  return (
    <div>
      <h2>Sign Up!</h2>

      <Textbox
        name="Username"
        icon={faUser}
        isValid={validation.username}
        inputType={InputType.username}
        onChange={(text: string) =>
          setLocalUser({ ...localUser, username: text })
        }
      />
      <Textbox
        name="E-Mail"
        isValid={validation.email}
        icon={faEnvelope}
        inputType={InputType.email}
        onChange={(text: string) => setLocalUser({ ...localUser, email: text })}
      />
      <Passwordbox
        name="Password"
        onChange={(text: string) =>
          setLocalUser({ ...localUser, password: text })
        }
        isValid={validation.password}
      />
      <Passwordbox
        name="Repeat Password"
        onChange={(text: string) =>
          setLocalUser({ ...localUser, passwordRepeated: text })
        }
        isValid={validation.password}
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
