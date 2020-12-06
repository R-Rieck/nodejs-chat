import React, { useState } from "react";
import { useUserContext } from "../../../../context/userContext";
import { Avatar } from "../../../image";
import { CustomModal } from "../../../modal";

type SettingsModalPropType = {
  visiblity: boolean;
  setVisibility: () => void;
};

type SettingsView = {
  account: boolean;
  app: boolean;
};

export const SettingsModals = (props: SettingsModalPropType) => {
  const { visiblity, setVisibility } = props;
  const { user } = useUserContext();
  const [activeView, setActiveView] = useState<SettingsView>({
    account: false,
    app: false,
  });

  return (
    <CustomModal
      title="Add Contact"
      isOpen={visiblity}
      setIsOpen={() => setVisibility()}
    >
      <div className="modal-settings__container">
        <div className="modal-settings-tablist">
          <div>
            <h2>Settings</h2>
            <h3 onClick={() => setActiveView({ account: true, app: false })}>
              Account Settings
            </h3>
            <h3 onClick={() => setActiveView({ account: false, app: true })}>
              App Settings
            </h3>
          </div>
        </div>
        <div className="modal-settings-view">
          {activeView.account ? (
            <>
              <h2>Account Settings</h2>
              <div className="modal-settings-view__block">
                <div className="modal-settings-view__block--box">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    readOnly
                    defaultValue={user.username}
                    style={{ color: "gray" }}
                  />
                </div>
                <div className="modal-settings-view__block--box">
                  <label htmlFor="username">E-Mail</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    defaultValue={user.email}
                  />
                </div>
              </div>
              <div className="modal-settings-view__block">
                <div className="modal-settings-view__block--box">
                  <label htmlFor="username">Password</label>
                  <input
                    type="password"
                    name="username"
                    id="username"
                    defaultValue={user.password}
                  />
                </div>
                <div className="modal-settings-view__block--box">
                  <label htmlFor="username">Confirm Password</label>
                  <input
                    type="password"
                    name="username"
                    id="username"
                    defaultValue={user.password}
                  />
                </div>
              </div>
              <div className="modal-settings-view__block">
                <div className="modal-settings-view__container--file-upload">
                  <Avatar profilePicture={user.profilePicture} />
                  <div className="container">
                    <form className="form">
                      <div
                        className="file-upload-wrapper"
                        data-text="Select your file!"
                      >
                        <input
                          name="file-upload-field"
                          type="file"
                          className="file-upload-field"
                          value=""
                          onChange={(e) => console.log(e)}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : activeView.app ? (
            <>
              <h2>App Settings</h2>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </CustomModal>
  );
};
