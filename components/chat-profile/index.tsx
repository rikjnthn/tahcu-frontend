"use client";

import React, { useId, useState } from "react";

import style from "./chat-profile.module.scss";
import PlusButton from "../plus-button";
import ChatProfileHeader from "../chat-profile-header";
import GroupMember from "../group-member";
import GroupDescription from "../group-description";
import ChangeGroupInformationModal from "../change-group-information-modal";

const ChatProfile = ({
  name,
  isGroup,
}: {
  name: string;
  isGroup?: boolean;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const nameId = useId();

  if (isGroup) {
    return (
      <div>
        <ChatProfileHeader isGroup name={name} setOpenModal={setOpenModal} />

        {openModal && (
          <ChangeGroupInformationModal setOpenModal={setOpenModal} />
        )}

        <GroupDescription />

        <GroupMember />

        {true && (
          <div className={style.float_button}>
            <PlusButton fill="#fff" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <ChatProfileHeader name={name} />

      <form className={style.change_name}>
        <input
          type="text"
          id={nameId}
          defaultValue={name}
          minLength={4}
          maxLength={20}
          autoComplete="off"
          autoCorrect="off"
          readOnly
        />
        <label htmlFor={nameId}>Name</label>
      </form>
    </div>
  );
};

export default ChatProfile;
