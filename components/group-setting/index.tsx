import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import style from "./group-setting.module.scss";
import {
  GroupWithMembershipType,
  SetStateType,
  UserDataType,
} from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import { useURLHash } from "@/context/url-hash-context";

const GroupSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const { hash: chatId } = useURLHash();
  const router = useRouter();

  const { mutate: exitGroup } = useMutation<AxiosResponse, AxiosError, string>({
    mutationKey: ["exitGroup"],
    mutationFn: async (new_admin) =>
      axios.patch(`/api/group/exit-group/${chatId}`, {
        new_admin,
      }),
  });

  const { mutate: deleteGroup } = useMutation<AxiosResponse, AxiosError, void>({
    mutationKey: ["deleteGroup"],
    mutationFn: async () => axios.delete(`/api/group/${chatId}`),
  });

  const messageio = useSocket();
  const queryClient = useQueryClient();

  const group = queryClient.getQueryData<GroupWithMembershipType>([
    "group",
    chatId,
  ]);
  const user = queryClient.getQueryData<UserDataType>(["userData"]);

  const isGroupAdmin = group?.admin_id === user?.user_id;

  const handleExitGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const groupMemberships = group?.group_membership ?? [];

    const randomIndex = Math.floor(Math.random() * groupMemberships?.length);
    const newAdmin = groupMemberships[randomIndex];

    messageio.emit("remove-room", { id: group?.id });
    exitGroup(newAdmin.user_id, {
      onSuccess() {
        router.push("/a");
      },
    });

    setIsOpenSetting(false);
  };

  const handleDeleteGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    messageio.emit("remove-room", { id: group?.id });
    deleteGroup(undefined, {
      onSuccess() {
        router.push("/a");
      },
      onSettled() {
        alert("ts");
      },
    });

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
