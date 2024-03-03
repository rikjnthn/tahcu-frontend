"use client";
import React from "react";

import style from "./member-list.module.scss";
import Member from "../member";
import {
  AddedMembersType,
  ContactType,
  SetStateType,
  UserDataType,
} from "@/interface";

const MemberList = ({
  notCheckable,
  addedMembers,
  contacts,
  userData,
  setAddedMembers,
}: {
  notCheckable?: boolean;
  contacts?: ContactType[];
  userData?: UserDataType;
  addedMembers?: AddedMembersType[];
  setAddedMembers?: SetStateType<AddedMembersType[]>;
}) => {
  if (notCheckable) {
    return (
      <ul className={style.member_list}>
        {addedMembers
          ? addedMembers.map(({ user_id, contact_id, name }) => (
              <Member
                key={contact_id}
                name={name}
                user_id={user_id}
                contact_id={contact_id}
                addedMembers={addedMembers}
              />
            ))
          : null}
      </ul>
    );
  }

  return (
    <ul className={style.member_list}>
      {contacts && userData
        ? contacts.map(({ id, user_id, friends, user }) => (
            <Member
              key={id}
              name={
                user_id === userData.user_id ? friends.username : user.username
              }
              user_id={user_id}
              contact_id={id}
              checkbox
              addedMembers={addedMembers}
              setAddedMembers={setAddedMembers}
            />
          ))
        : null}
    </ul>
  );
};

export default MemberList;
