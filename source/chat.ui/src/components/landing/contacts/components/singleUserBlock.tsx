import React, { useEffect } from "react";
import { User } from "../../../../types/user";
import { Avatar } from "../../../image";

type SingleUserBlockPropType = {
  user: User;
  onClick: () => void;
};

export const SingleUserBlock = (props: SingleUserBlockPropType) => {
  const { user, onClick } = props;

  return (
    <div className="single-user__container" onClick={onClick}>
      <Avatar profilePicture={user.profilePicture} />
      <div className="single-user-info__container">
        <p>{user.username}</p>
        <p>nachricht</p>
      </div>
    </div>
  );
};
