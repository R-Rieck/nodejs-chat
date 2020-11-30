import React, { useEffect, useState } from "react";
import { Textbox } from "../textbox";
import { Passwordbox } from "../passwordbox";
import { Button } from "../button";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/userContext";
import { User } from "../../types/user";

type loginViewProps = {
  onClick: () => void;
};

export const LoginView = (props: loginViewProps) => {
  const { setUser, isValid } = useUserContext();
  const [localUser, setLocalUser] = useState<User>({
    username: "",
    password: "",
    email: "",
  });
  const [validInput, setValidInput] = useState<boolean>(true);

  return !isValid ? (
    <div>
      <h2>Login!</h2>
      <p
        style={
          validInput ? { visibility: "hidden" } : { visibility: "visible" }
        }
      >
        Wrong Username/Password!
      </p>
      <Textbox
        name="E-Mail or Username"
        icon={faEnvelope}
        inputType={undefined}
        onChange={(text: string) =>
          setLocalUser({ ...localUser, username: text, email: text })
        }
        isValid={true}
      />
      <Passwordbox
        name="Password"
        onChange={(text: string) =>
          setLocalUser({ ...localUser, password: text })
        }
        isValid={true}
      />
      <Button
        text="Log In!"
        isDisabled={false}
        customStyle={{
          border: "none",
          background: "linear-gradient(to left, #ba1865, #e02da4)",
          color: "white",
          fontSize: "1.1rem",
          margin: "1.5rem 0",
          padding: "0.8rem 8rem",
        }}
        onClick={() =>
          setUser !== undefined &&
          setUser(localUser).then((result) => setValidInput(result))
        }
      />
      <Button
        text="Sign Up"
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
  ) : (
    <div>Logged in</div>
  );
};
