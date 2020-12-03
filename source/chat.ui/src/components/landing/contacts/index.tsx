import React from "react";
import { useUserContext } from "../../../context/userContext";
import { SingleUserBlock } from "./components/singleUserBlock";

export const Contacts = () => {
  const { user } = useUserContext();
  return (
    <div className="contact__container">
      <SingleUserBlock user={user} />
      <SingleUserBlock user={user} />
      <SingleUserBlock user={user} />
      <SingleUserBlock user={user} />
      <SingleUserBlock user={user} />
      <SingleUserBlock user={user} />
      <SingleUserBlock user={user} />
    </div>
  );
};
