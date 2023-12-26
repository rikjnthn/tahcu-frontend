import React from "react";

import PhotoProfile from "../photo-profile";
import style from "./added-members.module.scss";
import CloseButton from "../close-button";

const AddedMember = ({ name }: { name: string }) => {
  return (
    <div className={style.added_member}>
      <PhotoProfile name={name} size="sm" />
      <span>{name}</span>
      <CloseButton stroke="#000" title="Delete member" />
    </div>
  );
};

export default AddedMember;
