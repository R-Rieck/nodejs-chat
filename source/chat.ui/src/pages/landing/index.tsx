import React from "react";
import { UserInfo } from "../../components/landing/userInfo/index";
import { Contacts } from "../../components/landing/contacts/index";
import { CurrentUserInfo } from "../../components/landing/currentChatUser/index";
import { ChatWindow } from "../../components/landing/chatWIndow/index";
import { MessageView } from "../../components/landing/message/index";
import { useUserContext } from "../../context/userContext";

export const Landing = () => {
  const { currentChatUser } = useUserContext();

  return (
    <div className="landing-page__container">
      <div className="landing-page-user-contact__container">
        <UserInfo />
        <Contacts />
      </div>
      <div className="landing-page-user-chat__container">
        {currentChatUser !== undefined ? (
          <>
            <CurrentUserInfo />
            <ChatWindow />
            <MessageView />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
