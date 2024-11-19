"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import style from "./group-setting.module.scss";
import { ChatType, GroupType, SetStateType, UserDataType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import { useURLHash } from "@/context/url-hash-context";

const GroupSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const { hash: chatId, setHash } = useURLHash();
  const router = useRouter();
  const messageio = useSocket();
  const queryClient = useQueryClient();

  const removeGroupFromLocal = () => {
    queryClient.setQueryData<ChatType[]>(["chats"], (chats) => {
      if (!chats) return [];

      return chats.filter((chat) => chat.id !== chatId);
    });

    setHash("");
    router.push("/a");
  };

  const { mutate: exitGroup } = useMutation<
    AxiosResponse<GroupType>,
    AxiosError,
    string
  >({
    mutationKey: ["exitGroup"],
    mutationFn: async (new_admin) =>
      axios.patch(`/api/group/exit-group/${chatId}`, { new_admin }),
    onSuccess: removeGroupFromLocal,
  });

  const { mutate: deleteGroup } = useMutation<
    AxiosResponse,
    AxiosError,
    string
  >({
    mutationKey: ["deleteGroup"],
    mutationFn: async (chatId) => axios.delete(`/api/group/${chatId}`),
    onSuccess: removeGroupFromLocal,
  });

  const chats = queryClient.getQueryData<ChatType[]>(["chats"]);
  const foundChat = chats?.find((chat) => chat.id === chatId);
  const group = foundChat?.type === "Group" ? foundChat : undefined;

  const user = queryClient.getQueryData<UserDataType>(["userData"]);

  const isGroupAdmin = group?.admin_id === user?.user_id;

  const handleExitGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const groupMemberships = group?.group_membership ?? [];

    const randomIndex = Math.floor(Math.random() * groupMemberships?.length);
    const newAdmin = groupMemberships[randomIndex];

    messageio.emit("remove-room", { id: group?.id });

    exitGroup(newAdmin.user_id);

    setIsOpenSetting(false);
  };

  const handleDeleteGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    messageio.emit("remove-room", { id: group?.id });

    deleteGroup(chatId);

    setIsOpenSetting(false);
  };

  return (
    <div className={style.setting}>
      <button onClick={handleExitGroup} title="Exit group">
        Exit
      </button>
      {isGroupAdmin && (
        <button onClick={handleDeleteGroup} title="Delete group">
          Delete Group
        </button>
      )}
    </div>
  );
};

export default GroupSetting;
