import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../types/store";
import { User } from "../types/user";

const defaultUser: User = {
  _id: "",
  username: "",
  email: "",
  password: "",
  profilePicture: {},
  contacts: undefined,
};
const userContext = createContext<UserContext>({
  user: defaultUser,
  isValid: false,
  errorMessage: undefined,
  functions: {},
  suggestedUser: undefined,
  currentChatUser: undefined,
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
    suggestedUser: undefined,
    currentChatUser: undefined,
  });

  const changeUser = (userCtx: Partial<UserContext>) => {
    setUser({
      user: userCtx.user || { ...user.user },
      errorMessage: userCtx.errorMessage || undefined,
      isValid: userCtx.isValid || false,
      currentChatUser: userCtx.currentChatUser || undefined,
      functions: { ...user.functions } || {},
      suggestedUser: userCtx.suggestedUser || undefined,
    });
  };

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
        console.error(err);
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
        console.error(err);
        return false;
      });

    return await result;
  };

  const fetchContact = async (name: string) => {
    fetch("http://localhost:3001/users/getUserByName", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username: name }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result !== false) {
          changeUser({ suggestedUser: result });
          return true;
        } else {
          changeUser({ errorMessage: "No User found!" });
          return false;
        }
      });
  };

  const fetchAddContact = async (id: string) => {
    const userId = user.user._id;

    const result = fetch(`http://localhost:3001/users/add/${userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ _id: id }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result !== false)
          changeUser({
            ...user,
            user: { ...user.user, contacts: result.contacts },
          });
      })
      .catch((err) => console.error(err));

    return await result;
  };

  const fetchGetContactList = async (): Promise<boolean> => {
    const userId = user.user._id;

    const result = fetch(`http://localhost:3001/users/getContacts/${userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((result) => result.json())
      .then((result) => {
        changeUser({ ...user, user: { ...user.user, contacts: result } });
      });

    return await false;
  };

  const setCurrentChatUser = (user: User) => {
    changeUser({
      currentChatUser: user,
    });
  };

  return (
    <userContext.Provider
      value={{
        ...user,
        functions: {
          setUser: fetchLogin,
          userRegistration: fetchRegistration,
          getContactByName: fetchContact,
          addContact: fetchAddContact,
          getContacts: fetchGetContactList,
          setCurrentChatUser: setCurrentChatUser,
        },
      }}
    >
      {children}
    </userContext.Provider>
  );
};
