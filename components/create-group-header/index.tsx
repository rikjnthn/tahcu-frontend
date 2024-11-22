"use client";
import React from "react";

import BackButton from "../back-button";
import style from "./create-group-header.module.scss";
import { useCreateGroupDispatch } from "@/context/create-group-context";
import { useDarkMode } from "@/context/dark-mode-context";

const CreateGroupHeader = () => {
  const { isDark } = useDarkMode();
  const { setIsCreateGroup } = useCreateGroupDispatch();

  return (
    <header className={style.header}>
      <BackButton
        onClick={() => setIsCreateGroup(false)}
        fill={isDark ? "#ffffff" : "#000000"}
        title="Back"
      />
      <span>Create Group</span>
    </header>
  );
};

export default CreateGroupHeader;
