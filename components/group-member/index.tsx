import React from "react";

import Member from "../member";
import style from "./group-member.module.scss";

const GroupMember = () => {
  return (
    <div className={style.group_member}>
      <span>Member</span>
      <ul>
        <Member name="User" checkbox={false} />
        <Member name="User" checkbox={false} />
        <Member name="User" checkbox={false} />
      </ul>
    </div>
  );
};

export default GroupMember;
