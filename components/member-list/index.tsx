import React from "react";

import style from "./member-list.module.scss";
import Member from "../member";

const MemberList = ({ checkbox }: { checkbox: boolean }) => {
  return (
    <ul className={style.member_list}>
      <Member name="user" checkbox={checkbox} />
      <Member name="user" checkbox={checkbox} />
      <Member name="user" checkbox={checkbox} />
    </ul>
  );
};

export default MemberList;
