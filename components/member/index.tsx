import React, { useEffect, useRef } from "react";

import PhotoProfile from "../photo-profile";
import style from "./member.module.scss";
import { AddedMembersType, SetStateType } from "@/interface";

const Member = ({
  name,
  checkbox,
  user_id,
  addedMembers,
  setAddedMembers,
}: {
  name: string;
  checkbox?: boolean;
  user_id: string;
  addedMembers?: AddedMembersType[];
  setAddedMembers?: SetStateType<AddedMembersType[]>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;

    if (!setAddedMembers) return;

    if (checked) setAddedMembers((prev) => [...prev, { name, user_id }]);
    else
      setAddedMembers((prev) => prev.filter((val) => val.user_id !== user_id));
  };

  useEffect(() => {
    if (!inputRef.current) return;

    if (!addedMembers?.find((val) => val.user_id === user_id))
      inputRef.current.checked = false;
  });

  return (
    <li className={style.member}>
      {checkbox && setAddedMembers ? (
        <input ref={inputRef} onChange={addMember} type="checkbox" />
      ) : null}
      <PhotoProfile name={name} size="md" />
      <span>{name}</span>
    </li>
  );
};

export default Member;
