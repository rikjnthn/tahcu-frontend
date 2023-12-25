import React from "react";

import BackButton from "../back-button";
import style from "./adding-members-header.module.scss";

const CreateGroupHeader = () => {
  return (
    <header className={style.header}>
      <BackButton fill="#000" title="Back" />

      <span>Add Members</span>
    </header>
  );
};

export default CreateGroupHeader;
