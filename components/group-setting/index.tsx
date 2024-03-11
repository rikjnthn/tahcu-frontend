import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import style from "./group-setting.module.scss";
import { GroupType, SetStateType, UserDataType } from "@/interface";

const GroupSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const param = useParams();

  const router = useRouter();

  const { mutate: addMembers } = useMutation({
    mutationKey: ["add-members"],
    mutationFn: async () =>
      axios.patch(
        "/api/group/member/add-member",
        {},
        {
          withCredentials: true,
          withXSRFToken: true,
          xsrfCookieName: "CSRF_TOKEN",
          xsrfHeaderName: "x-csrf-token",
        }
      ),
  });

  const { mutate: removeMembers } = useMutation({
    mutationKey: ["remove-members"],
    mutationFn: async () =>
      axios.patch(
        "/api/group/member/remove-member",
        {},
        {
          withCredentials: true,
          withXSRFToken: true,
          xsrfCookieName: "CSRF_TOKEN",
          xsrfHeaderName: "x-csrf-token",
        }
      ),
  });

  const { mutate: exitGroup } = useMutation({
    mutationKey: ["exitGroup"],
    mutationFn: async () =>
      axios.delete(`/api/group/exit-group/${param.contact}`, {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "CSRF_TOKEN",
        xsrfHeaderName: "x-csrf-token",
      }),
  });

  const { mutate: deleteGroup } = useMutation({
    mutationKey: ["exitGroup"],
    mutationFn: async () =>
      axios.delete(`/api/group/${param.contact}`, {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "CSRF_TOKEN",
        xsrfHeaderName: "x-csrf-token",
      }),
  });

  const queryClient = useQueryClient();

  const group = queryClient.getQueryData<GroupType>(["group", param.contact]);
  const user = queryClient.getQueryData<UserDataType>(["userData"]);

  const isGroupAdmin = group?.admin_id === user?.user_id;

  const handleExitGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    exitGroup();
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
