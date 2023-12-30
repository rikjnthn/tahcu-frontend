import React from "react";

import BackButton from "../back-button";
import style from "./create-group-header.module.scss";
import { SetStateType } from "@/interface";

const CreateGroupHeader = ({
  setIsCreateGroup,
}: {
  setIsCreateGroup: SetStateType<boolean>;
}) => {
  return (
    <header className={style.header}>
      <BackButton
        onClick={() => setIsCreateGroup(true)}
        fill="#000"
        title="Back"
      />
      <span>Create Group</span>
    </header>
  );
};

export default CreateGroupHeader;
