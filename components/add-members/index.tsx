import React from "react";

import style from "./add-members.module.scss";
import AddedMember from "../added-member";
import { AddedMembersType, SetStateType } from "@/interface";

const AddMembers = ({
  addedMembers,
  setAddedMembers,
}: {
  addedMembers: AddedMembersType[];
  setAddedMembers: SetStateType<AddedMembersType[]>;
}) => {
  return (
    <div className={style.add_members}>
      {addedMembers.map((addedMember) => (
        <AddedMember
          key={addedMember.contact_id}
          name={addedMember.name}
          user_id={addedMember.user_id}
          setAddedMembers={setAddedMembers}
        />
      ))}
      <input type="text" placeholder="Add members" />
    </div>
  );
};

export default AddMembers;
