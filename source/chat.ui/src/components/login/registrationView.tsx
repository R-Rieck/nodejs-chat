import React, { isValidElement, useEffect, useState } from "react";
import { InputType, Textbox } from "../textbox";
import { Passwordbox } from "../passwordbox";
import { Button } from "../button";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/userContext";
import validation from "../../infrastructure/validation";

type RegistrationViewProps = {
  onClick: () => void;
};

type InputFormFields = {
  username: string;
  email: string;
  password: string;
  passwordRepeated: string;
  isValid: boolean;
};

type ValidationObjectType = {
  username: boolean;
  email: boolean;
  password: boolean;
};

export const RegistrationView = (props: RegistrationViewProps) => {
  const { setUser } = useUserContext();
  const [localUser, setLocalUser] = useState<InputFormFields>({
    username: "",
    email: "",
    password: "",
    passwordRepeated: "",
    isValid: false,
  });

  const [
    validationObject,
    setValidationObject,
  ] = useState<ValidationObjectType>({
    username: false,
    email: false,
    password: false,
  });

  // useEffect(() => console.log(validationObject), [validationObject]);

  useEffect(() => {
    if (
      validationObject.username &&
      validationObject.email &&
      validationObject.password
    )
      setLocalUser({ ...localUser, isValid: true });
  }, [localUser]);

  const handleRegistration = () => {
    if (setUser && localUser.isValid)
      setUser({
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
        isValid={(isValid: boolean) =>
          setValidationObject({ ...validationObject, username: isValid })
        }
        inputType={InputType.username}
        onChange={(text: string) =>
          setLocalUser({ ...localUser, username: text })
        }
      />
      <Textbox
        name="E-Mail"
        isValid={(isValid: boolean) =>
          setValidationObject({ ...validationObject, email: isValid })
        }
        icon={faEnvelope}
        inputType={InputType.email}
        onChange={(text: string) => setLocalUser({ ...localUser, email: text })}
      />
      <Passwordbox
        name="Password"
        onChange={(text: string) =>
          setLocalUser({ ...localUser, password: text })
        }
        shouldValidate={false}
      />
      <Passwordbox
        name="Repeat Password"
        onChange={(text: string) =>
          setLocalUser({ ...localUser, passwordRepeated: text })
        }
        comparisonPassword={localUser.password}
        isValid={(isValid: boolean) =>
          setValidationObject({ ...validationObject, password: isValid })
        }
        shouldValidate={true}
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
