import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export const UserInfo = () => {
  const { user } = useUserContext();
  const [image, setImage] = useState<Buffer>();

  useEffect(() => {
    const buffer: Buffer = Buffer.from(
      (user && user.profilePicture?.data.data) || []
    );

    setImage(buffer);
  }, [user]);

  useEffect(() => console.log(image), [image]);
  return (
    <div className="userinfo-container">
      <div className="userinfo-info-display__container">
        <img
          src={`data:${
            user && user.profilePicture?.data.contentType
          };base64,${image?.toString("base64")}`}
          alt="lul"
        />
        <h2>{user && user.username}</h2>
      </div>
      <FontAwesomeIcon icon={faCog} size="2x" />
    </div>
  );
};
