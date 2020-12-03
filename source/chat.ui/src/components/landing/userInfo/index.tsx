import React, { useState } from "react";
import { useUserContext } from "../../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../../image";

type modalsType = {
  addContact: boolean,
  settings: boolean
}

export const UserInfo = () => {
  const { user } = useUserContext();
  const [modalsVisiblity, setModalsVisibility] = useState<modalsType>({
    addContact: false,
    settings: false,
  })

  return (
    <div className="userinfo__container">
      <div className="userinfo-info-display__container">
        <Avatar profilePicture={user.profilePicture} />
        <h2>{user.username}</h2>
      </div>
      <div className="userinfo-action-display__container">
        <FontAwesomeIcon icon={faUserPlus} size="2x" />
        <FontAwesomeIcon icon={faCog} size="2x" />
      </div>
    </div>
  );
};
