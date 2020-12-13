import React, { useState } from "react";
import { useUserContext } from "../../../../../../context/userContext";
import { User } from "../../../../../../types/user";
import { ImagePreview } from "../../../../../image";
import { useUpdateValidation } from "../../../../../../infrastructure/validation";

type PreviewFileType = {
  dataUrl: string | undefined;
  fileName: string | undefined;
  file: File | undefined;
};

export const AccountSettings = () => {
  const { user, functions } = useUserContext();
  const [imagePreview, setImagePreview] = useState<PreviewFileType>();
  const [localuser, setLocalUser] = useState<User>({ ...user });

  const userUpdated = useUpdateValidation({
    username: localuser.username,
    updatedUsername: user.username,
    email: localuser.email,
    updatedEmail: user.email,
  });

  const handleUpdateUser = () => {
    if (functions && functions.updateUser && userUpdated) {
      functions.updateUser({
        email: localuser.email,
        username: localuser.username,
      });
    }

    if (
      functions &&
      functions.updateAvatar &&
      imagePreview?.file !== undefined
    ) {
      functions.updateAvatar(imagePreview.file);
    }
  };

  const handleCanceUpdate = () => {
    if (imagePreview !== undefined && imagePreview?.dataUrl !== undefined)
      URL.revokeObjectURL(imagePreview?.dataUrl);

    setImagePreview({
      dataUrl: undefined,
      file: undefined,
      fileName: undefined,
    });
  };

  const handleDeleteAccount = () => console.log("delete account");

  return (
    <>
      <h2>Account Settings</h2>
      <div className="modal-settings-view__block">
        <div className="modal-settings-view__block--box">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={user.username}
            onChange={(e) =>
              setLocalUser({ ...localuser, username: e.target.value })
            }
          />
        </div>
        <div className="modal-settings-view__block--box">
          <label htmlFor="email">E-Mail: </label>
          <input
            type="text"
            name="email"
            id="username"
            value={localuser.email}
            onChange={(e) =>
              setLocalUser({ ...localuser, email: e.target.value })
            }
          />
        </div>
      </div>
      <div className="modal-settings-view__block">
        <div className="modal-settings-view__container--file-upload">
          <ImagePreview
            image={imagePreview?.dataUrl}
            defaultImage={user.profilePicture}
          />
          <form className="form">
            <div
              className="file-upload-wrapper"
              data-text={imagePreview?.fileName || "Select your file!"}
            >
              <input
                name="file-upload-field"
                type="file"
                className="file-upload-field"
                value=""
                onChange={(e) => {
                  if (e.target.files !== null)
                    setImagePreview({
                      dataUrl: URL.createObjectURL(e.target.files[0]),
                      fileName: e.target.files[0].name.substring(0, 20) || "",
                      file: e.target.files[0],
                    });
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="modal-settings-view__block">
        <div>
          <button
            className="action-button-positiv"
            onClick={() => handleUpdateUser()}
          >
            Save
          </button>
          <button
            className="action-button-negativ"
            onClick={() => handleCanceUpdate()}
          >
            Cancel
          </button>
          <button
            className="action-button-transparent"
            onClick={() => handleDeleteAccount()}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};
