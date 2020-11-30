import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../types/store";
import { User } from "../types/user";

const userContext = createContext<Partial<UserContext>>({
  user: undefined,
  isValid: false,
});

export const useUserContext = () => {
  return useContext(userContext);
};

export const StoreProvider = ({ children }: any) => {
  const [user, setUser] = useState<Partial<UserContext>>({
    user: undefined,
    isValid: undefined,
  });

  const fetchRegistration = async (usr: User): Promise<boolean> => {
    const body = JSON.stringify({
      username: usr.username,
      email: usr.email,
      password: usr.password,
    });

    const result = await fetch("http://localhost:3001/users/", {
      method: "POST",
      body: body,
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((result) => result.json())
      .then((result) => {
        setUser({
          user: {
            username: result.username,
            email: result.email,
            password: result.password,
          },
          isValid: true,
        });

        return true;
      })
      .catch((err: Error) => false);

    return result;
  };

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
        if (result.isValid) {
          setUser({
            user: {
              username: usr.username,
              email: usr.email,
              password: usr.password,
            },
            isValid: true,
          });
          return true;
        } else return false;
      })
      .catch((err) => false);

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
