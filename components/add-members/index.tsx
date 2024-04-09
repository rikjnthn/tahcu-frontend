import React from "react";

import style from "./add-members.module.scss";
import AddedMember from "../added-member";
import { useCreateGroup } from "@/context/create-group-context";

const AddMembers = () => {
  const { addedMembers } = useCreateGroup();

  return (
    <div className={style.add_members}>
      {addedMembers.map((addedMember) => (
        <AddedMember
          key={addedMember.user_id}
          name={addedMember.name}
          user_id={addedMember.user_id}
        />
      ))}
      <input type="text" placeholder="Add members" disabled />
    </div>
  );
};

export default AddMembers;
