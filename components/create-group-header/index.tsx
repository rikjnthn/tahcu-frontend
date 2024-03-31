import React from "react";

import BackButton from "../back-button";
import style from "./create-group-header.module.scss";
import { useCreateGroupDispatch } from "@/context/create-group-context";

const CreateGroupHeader = () => {
  const { setIsCreateGroup } = useCreateGroupDispatch();

  return (
    <header className={style.header}>
      <BackButton
        onClick={() => setIsCreateGroup(false)}
        fill="#000"
        title="Back"
      />
      <span>Create Group</span>
    </header>
  );
};

export default CreateGroupHeader;
