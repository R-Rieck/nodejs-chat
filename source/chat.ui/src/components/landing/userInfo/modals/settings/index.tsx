import React, { useState } from "react";
import { CustomModal } from "../../../../modal";
import { AccountSettings } from "./components/accountSettings";
import { AppSettings } from "./components/appSettings";
import { PasswordSettings } from "./components/passwordSettings";

type SettingsModalPropType = {
  visiblity: boolean;
  setVisibility: () => void;
};

type SettingsView = {
  account: boolean;
  app: boolean;
  password: boolean;
};



export const SettingsModals = (props: SettingsModalPropType) => {
  const { visiblity, setVisibility } = props;
  
  const [activeView, setActiveView] = useState<SettingsView>({
    account: false,
    app: false,
    password: false,
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
            <h3
              onClick={() =>
                setActiveView({ account: true, app: false, password: false })
              }
            >
              Account Settings
            </h3>
            <h3
              onClick={() =>
                setActiveView({ account: false, password: true, app: false })
              }
            >
              Password Settings
            </h3>
            <h3
              onClick={() =>
                setActiveView({ account: false, app: true, password: false })
              }
            >
              App Settings
            </h3>
          </div>
        </div>
        <div className="modal-settings-view">
          {activeView.account ? (
            <AccountSettings />
          ) : activeView.app ? (
            <AppSettings />
          ) : activeView.password ? (
            <PasswordSettings />
          ) : (
            <></>
          )}
        </div>
      </div>
    </CustomModal>
  );
};
