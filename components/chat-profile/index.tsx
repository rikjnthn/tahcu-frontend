"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import style from "./chat-profile.module.scss";
import PlusButton from "../plus-button";
import ChatProfileHeader from "../chat-profile-header";
import GroupMember from "../group-member";
import GroupDescription from "../group-description";
import ChangeGroupInformationModal from "../change-group-information-modal";
import Input from "../input";
import { GroupWithMembershipType } from "@/interface";

const ChatProfile = ({
  name,
  isGroup,
}: {
  name: string;
  isGroup?: boolean;
}) => {
  const [openModal, setIsOpenModal] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const group = queryClient.getQueryData<GroupWithMembershipType>(["group"]);

  if (isGroup) {
    return (
      <div>
        <ChatProfileHeader
          isGroup
          name={name}
          setIsOpenModal={setIsOpenModal}
        />

        {openModal && (
          <ChangeGroupInformationModal
            name={name}
            description={group?.description ?? ""}
            setIsOpenModal={setIsOpenModal}
          />
        )}

        <GroupDescription description={group?.description} />

        <GroupMember members={group?.group_membership} />

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
        <Input
          labelName="Name"
          type="text"
          defaultValue={name}
          minLength={4}
          maxLength={20}
          autoComplete="off"
          autoCorrect="off"
          readOnly
        />
      </form>
    </div>
  );
};

export default ChatProfile;
