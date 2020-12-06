import React, { useState } from "react";
import { useUserContext } from "../../../../context/userContext";
import { Avatar } from "../../../image";
import { CustomModal } from "../../../modal";

type AddContactModalPropType = {
    visiblity: boolean;
    setVisibility: () => void;
} 

export const AddContactModal = (props: AddContactModalPropType) => {
    const { visiblity, setVisibility } = props;
    const { suggestedUser, functions } = useUserContext();

    const [contactSearch, setContactSearch] = useState<string>("");

    return (
        <CustomModal
        title="Add Contact"
        isOpen={visiblity}
        setIsOpen={() => setVisibility()}
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
  )
};
