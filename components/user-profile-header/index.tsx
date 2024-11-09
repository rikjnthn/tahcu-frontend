"use client";

import BackButton from "../back-button";
import style from "./user-profile-header.module.scss";
import EditButton from "../edit-button";
import { SetStateType } from "@/interface";
import { useHomePageDispatch } from "@/context/home-page-context";
import { useDarkMode } from "@/context/dark-mode-context";

const UserProfileHeader = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const { isDark } = useDarkMode();
  const dispatch = useHomePageDispatch();

  const closeUserProfile = () => {
    dispatch({ type: "OPEN_CHAT_CONTACT" });
  };

  return (
    <header className={style.user_profile_header}>
      <BackButton
        onClick={closeUserProfile}
        fill={isDark ? "#ffffff" : "#000000"}
      />
      <span>Profile</span>
      <EditButton
        onClick={() => setIsOpenModal(true)}
        stroke={isDark ? "#ffffff" : "#000000"}
      />
    </header>
  );
};

export default UserProfileHeader;
