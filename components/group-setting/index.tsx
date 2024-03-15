import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import style from "./group-setting.module.scss";
import {
  GroupWithMembershipType,
  SetStateType,
  UserDataType,
} from "@/interface";

const GroupSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const param = useParams();

  const router = useRouter();

  const { mutate: exitGroup } = useMutation({
    mutationKey: ["exitGroup"],
    mutationFn: async (newAdmin: string) =>
      axios.patch(
        `/api/group/exit-group/${param.contact}`,
        { new_admin: newAdmin },
        {
          withCredentials: true,
          withXSRFToken: true,
          xsrfCookieName: "CSRF_TOKEN",
          xsrfHeaderName: "x-csrf-token",
        }
      ),
  });

  const { mutate: deleteGroup } = useMutation({
    mutationKey: ["deleteGroup"],
    mutationFn: async () =>
      axios.delete(`/api/group/${param.contact}`, {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "CSRF_TOKEN",
        xsrfHeaderName: "x-csrf-token",
      }),
  });

  const queryClient = useQueryClient();

  const group = queryClient.getQueryData<GroupWithMembershipType>([
    "group",
    param.contact,
  ]);
  const user = queryClient.getQueryData<UserDataType>(["userData"]);

  const isGroupAdmin = group?.admin_id === user?.user_id;

  const handleExitGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const groupMemberships = group?.group_membership ?? [];

    const randomIndex = Math.floor(Math.random() * groupMemberships?.length);
    const newAdmin = groupMemberships[randomIndex];

    exitGroup(newAdmin.user_id);
    router.push("/a");

    setIsOpenSetting(false);
  };

  const handleDeleteGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    deleteGroup();
    router.push("/a");

    setIsOpenSetting(false);
  };

  return (
    <div className={style.setting}>
      <button onClick={handleExitGroup}>Exit</button>
      {isGroupAdmin && (
        <button onClick={handleDeleteGroup}>Delete Group</button>
      )}
    </div>
  );
};

export default GroupSetting;
