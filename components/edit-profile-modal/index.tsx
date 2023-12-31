"use client";
import React from "react";

import { SetStateType } from "@/interface";
import style from "./edit-profile-modal.module.scss";
import EditProfileModalHeader from "../edit-profile-modal-header";
import EditProfileModalBody from "../edit-profile-modal-body";

const EditProfileModal = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  return (
    <div
      onClick={(e) => {
        if (e.currentTarget === e.target) setIsOpenModal(false);
      }}
      className={style.modal}
    >
      <div>
        <EditProfileModalHeader setIsOpenModal={setIsOpenModal} />

        <EditProfileModalBody />
      </div>
    </div>
  );
};

export default EditProfileModal;
