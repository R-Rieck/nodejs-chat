import React, { useEffect, useState } from "react";
import { ProfilePicture } from "../types/user";
import { convertBufferFrom } from "../infrastructure/imageConverter";

type AvatarPropType = {
  profilePicture: Partial<ProfilePicture>;
};

export const Avatar = (props: AvatarPropType) => {
  const { profilePicture } = props;
  const [image, setImage] = useState<Buffer>();

    useEffect(() => {
        setImage(convertBufferFrom(profilePicture))
    }, [profilePicture]);

  return (
    <img
      src={`data:${profilePicture?.data?.contentType};base64,${image?.toString(
        "base64"
      )}`}
      alt="lul"
    />
  );
};
