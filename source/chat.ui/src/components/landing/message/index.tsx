import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane} from '@fortawesome/free-regular-svg-icons'
import React from "react";

export const MessageView = () => {
  return (
    <div className="message-view__container">
      <input type="text" name="" id="" />
      <FontAwesomeIcon icon={faPaperPlane} size="2x" />
    </div>
  );
};
