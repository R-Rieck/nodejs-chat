import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { ProfilePicture } from "../types/user";

type AvatarPropType = {
  profilePicture: Partial<ProfilePicture>;
};

type ImagePreviewPropType = {
  image: string | undefined;
  defaultImage: Partial<ProfilePicture>;
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
    <img
      src={`data:${image?.contentType};base64,${image?.image}`}
      alt="avatar"
    />
  );
};

export const ImagePreview = (props: ImagePreviewPropType) => {
  const { image, defaultImage } = props;

  const [imagePreview, setImagePreview] = useState<string>();

  useEffect(() => {
    if (image !== undefined) setImagePreview(image);
  }, [image]);

  return (
    <>
      {image !== undefined ? (
        <img src={imagePreview} alt="" />
      ) : (
        <Avatar profilePicture={defaultImage}></Avatar>
      )}
    </>
  );
};
