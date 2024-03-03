import React from "react";

import PhotoProfile from "../photo-profile";
import style from "./added-members.module.scss";
import CloseButton from "../close-button";
import { AddedMembersType, SetStateType } from "@/interface";

const AddedMember = ({
  name,
  user_id,
  setAddedMembers,
}: {
  name: string;
  user_id: string;
  setAddedMembers: SetStateType<AddedMembersType[]>;
}) => {
  const removeAddedMember = () => {
    setAddedMembers((prev) => prev.filter((val) => val.user_id !== user_id));
  };
  return (
    <div className={style.added_member}>
      <PhotoProfile name={name} size="sm" />
      <span>{name}</span>
      <CloseButton
        onClick={removeAddedMember}
        stroke="#000"
        title="Delete member"
      />
    </div>
  );
};

export default AddedMember;
