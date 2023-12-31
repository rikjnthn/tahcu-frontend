"use client";

import BackButton from "../back-button";
import style from "./user-profile-header.module.scss";
import EditButton from "../edit-button";
import { SetStateType } from "@/interface";
import { useHomePageDispatch } from "@/context/home-page-context";

const UserProfileHeader = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const dispatch = useHomePageDispatch();

  const closeUserProfile = () => {
    dispatch({ type: "SET_OPEN_CHAT_CONTACT" });
  };

  return (
    <header className={style.user_profile_header}>
      <BackButton onClick={closeUserProfile} fill="#000" />
      <span>Profile</span>
      <EditButton onClick={() => setIsOpenModal(true)} stroke="#000" />
    </header>
  );
};

export default UserProfileHeader;
