import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../types/store";
import { User } from "../types/user";

const userContext = createContext<Partial<UserContext>>({
  user: undefined,
  isValid: false,
  errorMessage: undefined,
});

export const useUserContext = () => {
  return useContext(userContext);
};

export const StoreProvider = ({ children }: any) => {
  const [user, setUser] = useState<Partial<UserContext>>({
    user: undefined,
    isValid: undefined,
    errorMessage: undefined,
  });

  //DEBUG
  // const [user, setUser] = useState<Partial<UserContext>>({
  //   user: {
  //     email: "testEmail@gmx.de",
  //     password: "test",
  //     username: "testUsername",
  //     profilePicture: undefined
  //   },
  //   isValid: true,
  //   errorMessage: undefined,
  // });

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
          setUser({
            user: undefined,
            isValid: false,
            errorMessage: `${
              result.keyValue.email || result.keyValue.username
            } is already in use`,
          });

          return false;
        } else {
          setUser({
            user: {
              username: result.username,
              email: result.email,
              password: result.password,
              profilePicture: result.profilePicture
            },
            isValid: true,
            errorMessage: undefined,
          });

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
        console.log(result);
        if (result !== false) {
          setUser({
            user: {
              username: result.username,
              email: result.email,
              password: result.password,
              profilePicture: result.profilePicture
            },
            isValid: true,
            errorMessage: undefined,
          });
          return true;
        } else {
          setUser({
            user: undefined,
            isValid: false,
            errorMessage: "Wrong Username or Password",
          });
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
        setUser: fetchLogin,
        userRegistration: fetchRegistration,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
