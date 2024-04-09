import React from "react";

import BackButton from "../back-button";
import style from "./adding-members-header.module.scss";
import { useHomePageDispatch } from "@/context/home-page-context";
import { useCreateGroupDispatch } from "@/context/create-group-context";
import { useDarkMode } from "@/context/dark-mode-context";

const CreateGroupHeader = () => {
  const { isDark } = useDarkMode();
  const dispatch = useHomePageDispatch();

  const { setAddedMembers } = useCreateGroupDispatch();

  const openChatContact = () => {
    setAddedMembers([]);
    dispatch({ type: "SET_OPEN_CHAT_CONTACT" });
  };
  return (
    <header className={style.header}>
      <BackButton
        onClick={openChatContact}
        fill={isDark ? "#ffffff" : "#000000"}
        title="Back"
      />

      <span>Add Members</span>
    </header>
  );
};

export default CreateGroupHeader;
