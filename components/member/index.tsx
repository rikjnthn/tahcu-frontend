import React from "react";

import PhotoProfile from "../photo-profile";
import style from "./member.module.scss";

const Member = ({ name, checkbox }: { name: string; checkbox: boolean }) => {
  return (
    <li className={style.member}>
      {checkbox && <input type="checkbox" />}
      <PhotoProfile name={name} size="md" />
      <span>{name}</span>
    </li>
  );
};

export default Member;
