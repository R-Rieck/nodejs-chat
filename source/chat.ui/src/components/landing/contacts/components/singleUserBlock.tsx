import React from "react";
import { User } from "../../../../types/user";
import { Avatar } from "../../../image";

type SingleUserBlockPropType = {
  user: User;
};

export const SingleUserBlock = (props: SingleUserBlockPropType) => {
  const { user } = props;

  return (
    <div className="single-user__container">
      <Avatar profilePicture={user.profilePicture} />
      <div className="single-user-info__container">
        <p>{user.username}</p>
        <p>nachricht</p>
      </div>
    </div>
  );
};
