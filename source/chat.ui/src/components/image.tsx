import React, { useEffect, useState } from "react";
import { ProfilePicture } from "../types/user";

type AvatarPropType = {
  profilePicture: Partial<ProfilePicture>;
};

type imageType = {
  image: string;
  contentType: string;
};

export const Avatar = (props: AvatarPropType) => {
  const { profilePicture } = props;
  const [image, setImage] = useState<imageType>();

  useEffect(() => {
    if (
      profilePicture.contentType !== undefined &&
      profilePicture.data !== undefined
    )
      setImage({
        image: profilePicture.data,
        contentType: profilePicture.contentType,
      });
  }, [profilePicture]);

  return (
    <img src={`data:${image?.contentType};base64,${image?.image}`} alt="lul" />
  );
};
