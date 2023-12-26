"use client";
import { useId } from "react";

import MemberList from "../member-list";
import style from "./create-group-information.module.scss";

const CreateGroupInformation = () => {
  const groupNameInputId = useId();

  return (
    <div className={style.create_group_information}>
      <form>
        <label htmlFor={groupNameInputId}>Group Name : </label>
        <input
          id={groupNameInputId}
          type="text"
          name="group-name"
          placeholder="Group 1"
        />
      </form>

      <MemberList checkbox={false} />
    </div>
  );
};

export default CreateGroupInformation;
