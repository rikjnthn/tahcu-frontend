"use client";

import React, { useEffect, useState } from "react";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import style from "./chat-profile.module.scss";
import PlusButton from "../plus-button";
import ChatProfileHeader from "../chat-profile-header";
import GroupMember from "../group-member";
import GroupDescription from "../group-description";
import ChangeGroupInformationModal from "../change-group-information-modal";
import Input from "../input";
import { GroupWithMembershipType, UserDataType } from "@/interface";
import EditMembers from "../edit-members";
import { useChatPage } from "@/context/chat-page-context";
import { useURLHash } from "@/context/url-hash-context";

const getGroup = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<GroupWithMembershipType> => {
  const [_, chatId] = queryKey;

  const { data } = await axios.get(`/api/group/${chatId}`);
  return data;
};

const ChatProfile = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditMembers, setIsEditMembers] = useState<boolean>(false);

  const { hash: chatId } = useURLHash();
  const { isGroup, name } = useChatPage();
  const queryClient = useQueryClient();

  const { data: group, refetch } = useQuery<GroupWithMembershipType>({
    queryKey: ["group", chatId],
    queryFn: getGroup,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const user = queryClient.getQueryData<UserDataType>(["userData"]);

  const isGroupAdmin = group?.admin_id === user?.user_id;

  const editMembers = () => {
    setIsEditMembers(true);
  };

  useEffect(() => {
    if (isGroup) refetch();
  });

  if (isGroup) {
    return (
      <div className={style.chat_profile}>
        <ChatProfileHeader setIsOpenModal={setIsOpenModal} />

        {isOpenModal && (
          <ChangeGroupInformationModal
            description={group?.description ?? ""}
            setIsOpenModal={setIsOpenModal}
          />
        )}

        <GroupDescription description={group?.description} />

        <GroupMember
          members={group?.group_membership}
          adminId={group?.admin_id}
        />

        {isEditMembers && (
          <EditMembers
            currentMembers={group?.group_membership ?? []}
            setIsEditMembers={setIsEditMembers}
          />
        )}

        {isGroupAdmin && (
          <div className={style.float_button}>
            <PlusButton onClick={editMembers} fill="#fff" title="Add member" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={style.chat_profile}>
      <ChatProfileHeader />

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
