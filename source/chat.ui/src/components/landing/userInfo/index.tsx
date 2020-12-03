import React, { useEffect, useState } from "react";
import { useUserContext } from "../../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../../image";
import { CustomModal } from "../../modal";
import { set } from "animejs";

type modalsType = {
  addContact: boolean;
  settings: boolean;
};

export const UserInfo = () => {
  const { user, suggestedUser, functions } = useUserContext();
  const [modalsVisiblity, setModalsVisibility] = useState<modalsType>({
    addContact: false,
    settings: false,
  });
  const [contactSearch, setContactSearch] = useState<string>("");

  useEffect(() => console.log(suggestedUser), [suggestedUser]);

  return (
    <div className="userinfo__container">
      <div className="userinfo-info-display__container">
        <Avatar profilePicture={user.profilePicture} />
        <h2>{user.username}</h2>
      </div>
      <div className="userinfo-action-display__container">
        <FontAwesomeIcon
          icon={faUserPlus}
          size="2x"
          onClick={() =>
            setModalsVisibility({ ...modalsVisiblity, addContact: true })
          }
        />
        <CustomModal
          title="Add Contact"
          isOpen={modalsVisiblity.addContact}
          setIsOpen={() =>
            setModalsVisibility({
              ...modalsVisiblity,
              addContact: !modalsVisiblity.addContact,
            })
          }
        >
          <div className="modal-addcontact__container">
            <h2>ADD CONTACT</h2>
            <div className="modal-addcontact-action__container">
              <input
                type="text"
                name="input"
                id=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContactSearch(e.target.value)
                }
              />
              <button
                className="action-button-positiv"
                onClick={() =>
                  functions &&
                  functions.getContactByName &&
                  functions.getContactByName(contactSearch)
                }
              >
                search
              </button>
            </div>
            <div
              className="modal-addcontact-display__container"
              style={
                suggestedUser === undefined
                  ? { visibility: "hidden" }
                  : { visibility: "visible" }
              }
            >
              {suggestedUser !== undefined ? (
                <>
                  <>
                    <Avatar profilePicture={suggestedUser.profilePicture} />
                    <h3>{suggestedUser.username}</h3>
                  </>
                  <button
                    className="action-button-positiv"
                    onClick={() =>
                      functions &&
                      functions.addContact &&
                      functions.addContact(suggestedUser._id)
                    }
                  >
                    Add
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </CustomModal>
        <FontAwesomeIcon icon={faCog} size="2x" />
      </div>
    </div>
  );
};
