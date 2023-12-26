import React from "react";

import style from "./add-members.module.scss";
import AddedMember from "../added-member";

const AddMembers = () => {
  return (
    <div className={style.add_members}>
      <input type="text" placeholder="Add members" />
    </div>
  );
};

export default AddMembers;
