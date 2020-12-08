import React, { useEffect, useState } from "react";
import { Textbox } from "../textbox";
import { Passwordbox } from "../passwordbox";
import { Button } from "../button";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/userContext";
import { User } from "../../types/user";
import { LoadingSpinner } from "../loadingSpinner";

type loginViewProps = {
  onClick: () => void;
  isLoggedIn: (state: boolean) => void;
};

export const LoginView = (props: loginViewProps) => {
  const { functions, isValid, errorMessage, isFetching } = useUserContext();
  const [localUser, setLocalUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    email: "",
    profilePicture: {},
    contacts: undefined,
  });
  const [validInput, setValidInput] = useState<boolean>(true);

  useEffect(() => {
    props.isLoggedIn(isValid || false);
  }, [isValid]);

  return !isValid ? (
    <div>
      <h2>Login!</h2>
      <p
        style={
          validInput ? { visibility: "hidden" } : { visibility: "visible" }
        }
      >
        {errorMessage}
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
          margin: "3rem 0",
          padding: "0.7rem 8rem",
        }}
        onClick={() =>
          functions &&
          functions.setUser &&
          functions.setUser(localUser).then((result) => setValidInput(result))
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

      {isFetching ? <LoadingSpinner /> : <div></div>}
    </div>
  ) : (
    <></>
  );
};
