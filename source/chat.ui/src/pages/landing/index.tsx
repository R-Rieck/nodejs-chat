import React from "react";
import { UserInfo } from "../../components/landing/userInfo/index";
import { Contacts } from "../../components/landing/contacts/index";

export const Landing = () => {
  return (
    <div className="landing-page__container">
      <div className="landing-page-user-contact__container">
        <UserInfo />
        <Contacts />
      </div>
    </div>
  );
};
