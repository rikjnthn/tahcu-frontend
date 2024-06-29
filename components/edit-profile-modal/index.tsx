"use client";
import React from "react";

import { SetStateType } from "@/interface";
import style from "./edit-profile-modal.module.scss";
import EditProfileModalHeader from "../edit-profile-modal-header";
import EditProfileModalBody from "../edit-profile-modal-body";
import Modal from "@/components/modal";

const EditProfileModal = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  return (
    <Modal
      setIsOpenModal={setIsOpenModal}
      onClick={(e) => {
        if (e.currentTarget === e.target) setIsOpenModal(false);
      }}
    >
      <div className={style.wrapper}>
        <EditProfileModalHeader setIsOpenModal={setIsOpenModal} />

        <EditProfileModalBody setIsOpenModal={setIsOpenModal} />
      </div>
    </Modal>
  );
};

export default EditProfileModal;
