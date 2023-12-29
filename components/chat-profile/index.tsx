"use client";

import React, { useState } from "react";

import style from "./chat-profile.module.scss";
import PlusButton from "../plus-button";
import ChatProfileHeader from "../chat-profile-header";
import GroupMember from "../group-member";
import GroupDescription from "../group-description";
import ChangeGroupInformationModal from "../change-group-information-modal";
import { SetStateType } from "@/interface";

const ChatProfile = ({
  setOpenHeader,
}: {
  setOpenHeader: SetStateType<boolean>;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div>
      <ChatProfileHeader
        setOpenModal={setOpenModal}
        setOpenHeader={setOpenHeader}
      />

      {openModal && <ChangeGroupInformationModal setOpenModal={setOpenModal} />}

      <GroupDescription />

      <GroupMember />

      {true && (
        <div className={style.float_button}>
          <PlusButton fill="#fff" />
        </div>
      )}
    </div>
  );
};

export default ChatProfile;
