import React from "react";

import CloseButton from "../close-button";
import { SetStateType } from "@/interface";
import style from "./edit-profile-modal-header.module.scss";

const EditProfileModalHeader = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  return (
    <header className={style.header}>
      <CloseButton
        onClick={() => {
          setIsOpenModal(false);
        }}
        stroke="#000"
      />
      <span>Edit Profile</span>
    </header>
  );
};

export default EditProfileModalHeader;
