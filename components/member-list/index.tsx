"use client";
import React from "react";

import style from "./member-list.module.scss";
import Member from "../member";
import { ContactType, UserDataType } from "@/interface";
import {
  useCreateGroup,
  useCreateGroupDispatch,
} from "@/context/create-group-context";

const MemberList = ({
  notCheckable,
  contacts,
  userData,
}: {
  notCheckable?: boolean;
  contacts?: ContactType[];
  userData?: UserDataType;
}) => {
  const { addedMembers } = useCreateGroup();
  const { setAddedMembers } = useCreateGroupDispatch();

  if (notCheckable) {
    return (
      <ul className={style.member_list}>
        {addedMembers
          ? addedMembers.map(({ user_id, name }) => (
              <Member
                key={user_id}
                name={name}
                user_id={user_id}
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
        ? contacts.map(({ id, user_id, friends, user, friends_id }) => (
            <Member
              key={id}
              name={
                user_id === userData.user_id ? friends.username : user.username
              }
              user_id={user_id === userData.user_id ? friends_id : user_id}
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
