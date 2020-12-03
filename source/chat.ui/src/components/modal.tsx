import React from "react";
import Modal from "react-modal";

type ModalPropType = {
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  children: any;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    backgroundColor: "#494949"
  },
};

Modal.setAppElement("#root");

export const CustomModal = (props: ModalPropType) => {
  const { isOpen, setIsOpen, title, children } = props;

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={setIsOpen}
      contentLabel={title}
    >
      <div className="modal__container">{children}</div>
    </Modal>
  );
};
