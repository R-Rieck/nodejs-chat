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
    isValid: false,
  });

  useEffect(() => fetchLogin(), [user]);

  const changeUser = (usr: User) => {
    setUser({ ...user, user: { ...user.user, ...usr } });
  };

  const fetchLogin = (): void => {
    const body = JSON.stringify({
      login: user.user?.username || user.user?.email,
      password: user.user?.password,
    });

    if (user.user !== undefined && user.isValid === false) {
      fetch("http://localhost:3001/users/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      })
        .then((result) => result.json())
        .then((result) => {
          if (result.isValid) setUser({ ...user, isValid: true });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <userContext.Provider value={{ ...user, setUser: changeUser }}>
      {children}
    </userContext.Provider>
  );
};
