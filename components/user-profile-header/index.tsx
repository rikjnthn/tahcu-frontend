"use client";

import React from "react";
import { useRouter } from "next/navigation";

import BackButton from "../back-button";
import style from "./user-profile-header.module.scss";
import EditButton from "../edit-button";
import { SetStateType } from "@/interface";

const UserProfileHeader = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const router = useRouter();

  return (
    <header className={style.user_profile_header}>
      <BackButton onClick={() => router.push("/")} fill="#000" />
      <span>Profile</span>
      <EditButton onClick={() => setIsOpenModal(true)} stroke="#000" />
    </header>
  );
};

export default UserProfileHeader;
