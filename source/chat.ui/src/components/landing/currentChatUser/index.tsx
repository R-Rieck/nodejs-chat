import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../../context/userContext";
import { Avatar } from "../../image";
import { User } from "../../../types/user";

export const CurrentUserInfo = () => {
  const { currentChatUser } = useUserContext();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (currentChatUser !== undefined) setUser(currentChatUser);
  }, [currentChatUser]);

  return (
    <>
      {user !== undefined ? (
        <div className="current-user-info__container">
          <div className="current-user-info-display__container">
            <Avatar profilePicture={user.profilePicture} />
            <h2>{user.username}</h2>
          </div>
          <div className="current-user-info-action__container">
            <FontAwesomeIcon icon={faSync} size="2x" />
          </div>
        </div>
      ) : (
        <div style={{height:'60px'}}></div>
      )}
    </>
  );
};
