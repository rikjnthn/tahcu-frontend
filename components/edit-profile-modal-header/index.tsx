"use client";
import React from "react";

import CloseButton from "../close-button";
import { SetStateType } from "@/interface";
import style from "./edit-profile-modal-header.module.scss";
import { useDarkMode } from "@/context/dark-mode-context";

const EditProfileModalHeader = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const { isDark } = useDarkMode();

  return (
    <header className={style.header}>
      <CloseButton
        onClick={() => setIsOpenModal(false)}
        stroke={isDark ? "#ffffff" : "#000000"}
        title="Close"
      />
      <span>Edit Profile</span>
    </header>
  );
};

export default EditProfileModalHeader;
