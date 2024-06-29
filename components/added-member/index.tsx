import React from "react";

import PhotoProfile from "../photo-profile";
import style from "./added-members.module.scss";
import CloseButton from "../close-button";
import { useCreateGroupDispatch } from "@/context/create-group-context";

const AddedMember = ({ name, user_id }: { name: string; user_id: string }) => {
  const { setAddedMembers } = useCreateGroupDispatch();

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
