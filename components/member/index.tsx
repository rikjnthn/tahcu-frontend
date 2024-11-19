"use client";
import React, { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import PhotoProfile from "../photo-profile";
import style from "./member.module.scss";
import {
  AddedMembersType,
  ChatType,
  GroupMemberShipType,
  GroupType,
  SetStateType,
  UserDataType,
} from "@/interface";
import DeleteButton from "../close-button";
import { useDarkMode } from "@/context/dark-mode-context";
import { useURLHash } from "@/context/url-hash-context";

const KickMember = ({ user_id, adminId }: KickMemberPropsType) => {
  const queryClient = useQueryClient();
  const { isDark } = useDarkMode();
  const { hash: chatId } = useURLHash();

  const { mutate } = useMutation<
    AxiosResponse<GroupMemberShipType[]>,
    AxiosError,
    DeleteMemberDataType
  >({
    mutationKey: ["remove-members"],
    mutationFn: async (deleteMemberData) =>
      axios.patch("/api/group/member/remove-member", deleteMemberData),
  });

  const group = queryClient.getQueryData<GroupType>(["group", chatId]);

  const deleteMember = () => {
    if (!group?.id) return;

    const deleteMemberData = {
      group_id: group.id,
      members: [user_id],
    };

    mutate(deleteMemberData, {
      onSuccess(data) {
        queryClient.setQueryData<ChatType[]>(["chats"], (chats) => {
          if (!chats) return [];

          const newChats = [...chats];
          const groupIndex = newChats.findIndex((chat) => chat.id === chatId);

          if (newChats[groupIndex].type === "Group") {
            newChats[groupIndex].group_membership = [
              ...newChats[groupIndex].group_membership,
              ...data.data,
            ];
          }

          return newChats;
        });
      },
    });
  };

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  const isAdmin = userData?.user_id === adminId;

  if (!isAdmin) return;

  return (
    <div className={style.delete_member}>
      <DeleteButton
        onClick={deleteMember}
        stroke={isDark ? "#ffffff" : "#000000"}
      />
    </div>
  );
};

const Member = ({
  name,
  checkbox,
  isMemberAdmin,
  adminId,
  showDelete,
  user_id,
  addedMembers,
  setAddedMembers,
}: MembersPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addMemberCreateGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;

    if (!setAddedMembers) return;

    if (checked) setAddedMembers((prev) => [...prev, { name, user_id }]);
    else {
      setAddedMembers((prev) => prev.filter((val) => val.user_id !== user_id));
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;

    const addedMember = addedMembers?.find((val) => val.user_id === user_id);

    if (!addedMember) inputRef.current.checked = false;
  }, [addedMembers, user_id]);

  return (
    <li className={style.member}>
      {checkbox && setAddedMembers ? (
        <input ref={inputRef} onChange={addMemberCreateGroup} type="checkbox" />
      ) : null}

      <PhotoProfile name={name} size="md" />

      <span>{name}</span>

      {isMemberAdmin && (
        <div className={style.admin}>
          <span>Admin</span>
        </div>
      )}

      {!isMemberAdmin && showDelete ? (
        <KickMember adminId={adminId} user_id={user_id} />
      ) : null}
    </li>
  );
};

export default Member;

interface DeleteMemberDataType {
  group_id: string;
  members: string[];
}

interface MembersPropsType {
  name: string;
  checkbox?: boolean;
  isMemberAdmin?: boolean;
  adminId?: string;
  showDelete?: boolean;
  user_id: string;
  addedMembers?: AddedMembersType[];
  setAddedMembers?: SetStateType<AddedMembersType[]>;
}

interface KickMemberPropsType {
  user_id: string;
  adminId?: string;
}
