import React from "react";

import BackButton from "../back-button";
import style from "./create-group-header.module.scss";

const CreateGroupHeader = () => {
  return (
    <header className={style.header}>
      <BackButton fill="#000" title="Back" />
      <span>Create Group</span>
    </header>
  );
};

export default CreateGroupHeader;
