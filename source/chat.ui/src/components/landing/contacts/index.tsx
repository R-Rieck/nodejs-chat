import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/userContext";
import { User } from "../../../types/user";
import { SingleUserBlock } from "./components/singleUserBlock";

export const Contacts = () => {
  const { functions, user } = useUserContext();
  const [contacts, setContacts] = useState<User[]>();

  const fetchForContacts = () => {
    if (
      user.contacts !== undefined &&
      user?.contacts?.length > 0 &&
      functions &&
      functions.getContacts
    )
      functions.getContacts();
  };

  useEffect(() => fetchForContacts(), []);

  useEffect(() => {
    setContacts(user.contacts);
  }, [user.contacts]);

  return (
    <div className="contact__container">
      {contacts?.map((user: User) => {
        return typeof user !== "string" ? (
          <SingleUserBlock
            key={user._id}
            onClick={() =>
              functions &&
              functions.setCurrentChatUser &&
              functions.setCurrentChatUser(user)
            }
            user={user}
          ></SingleUserBlock>
        ) : (
          <></>
        );
      })}
    </div>
  );
};
