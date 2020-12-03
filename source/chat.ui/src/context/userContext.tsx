import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../types/store";
import { User } from "../types/user";

const defaultUser: User = {
  username: "",
  email: "",
  password: "",
  profilePicture: {},
};

const userContext = createContext<UserContext>({
  user: defaultUser,
  isValid: false,
  errorMessage: undefined,
  functions: {},
});

export const useUserContext = () => {
  return useContext(userContext);
};

export const StoreProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserContext>({
    user: defaultUser,
    isValid: undefined,
    errorMessage: undefined,
    functions: {},
  });

  const changeUser = (userCtx: Partial<UserContext>) => {
    console.log("usr: ", userCtx);
    setUser({
      user: userCtx.user || defaultUser,
      errorMessage: userCtx.errorMessage || undefined,
      isValid: userCtx.isValid || false,
      functions: { ...user.functions } || {},
    });
  };

  useEffect(() => console.log(user), [user]);

  //fetching for user Registration
  const fetchRegistration = async (usr: User): Promise<boolean> => {
    const body = JSON.stringify({
      username: usr.username,
      email: usr.email,
      password: usr.password,
    });

    const result = fetch("http://localhost:3001/users/", {
      method: "POST",
      body: body,
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.code === 11000) {
          console.log(result);

          changeUser({
            errorMessage: `${
              result.keyValue.email || result.keyValue.username
            } is already in use`,
          });
          return false;
        } else {
          changeUser({ user: result, isValid: true });
          return true;
        }
      })
      .catch((err: Error) => {
        console.log(err);
        return false;
      });

    return await result;
  };

  //fetching for correct login data
  const fetchLogin = async (usr: User): Promise<boolean> => {
    const body = await JSON.stringify({
      login: usr.username || usr.email,
      password: usr.password,
    });

    const result = fetch("http://localhost:3001/users/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: body,
    })
      .then((result) => result.json())
      .then((result) => {
        if (result !== false) {
          changeUser({ user: result, isValid: true });
          return true;
        } else {
          changeUser({ errorMessage: "Wrong Username or Password" });
          return false;
        }
      })
      .catch((err: Error) => {
        console.log(err);
        return false;
      });

    return await result;
  };

  return (
    <userContext.Provider
      value={{
        ...user,
        functions: {
          setUser: fetchLogin,
          userRegistration: fetchRegistration,
        },
      }}
    >
      {children}
    </userContext.Provider>
  );
};
