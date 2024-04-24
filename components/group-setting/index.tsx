import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

  const { mutate: exitGroup } = useMutation({
    mutationKey: ["exitGroup"],
    mutationFn: async (new_admin: string) =>
      axios.patch(`/api/group/exit-group/${chatId}`, {
        new_admin,
      }),
  });

  const { mutate: deleteGroup } = useMutation({
    mutationKey: ["deleteGroup"],
    mutationFn: async () => axios.delete(`/api/group/${chatId}`),
  });

  const { groupChatIo } = useSocket();
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

    groupChatIo.emit("remove-room", { group_id: group?.id });
    exitGroup(newAdmin.user_id);
    router.push("/a");

    setIsOpenSetting(false);
  };

  const handleDeleteGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    groupChatIo.emit("remove-room", group?.id);
    deleteGroup();
    router.push("/a");

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
