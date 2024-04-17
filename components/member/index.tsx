import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import PhotoProfile from "../photo-profile";
import style from "./member.module.scss";
import {
  AddedMembersType,
  GroupType,
  SetStateType,
  UserDataType,
} from "@/interface";
import DeleteButton from "../close-button";
import { useDarkMode } from "@/context/dark-mode-context";

const KickMember = ({
  deleteMember,
  isDark,
  adminId,
}: {
  deleteMember: () => void;
  isDark: boolean;
  adminId?: string;
}) => {
  const queryClient = useQueryClient();

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
}: {
  name: string;
  checkbox?: boolean;
  isMemberAdmin?: boolean;
  adminId?: string;
  showDelete?: boolean;
  user_id: string;
  addedMembers?: AddedMembersType[];
  setAddedMembers?: SetStateType<AddedMembersType[]>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const param = useParams<{ contact: string }>();

  const { isDark } = useDarkMode();
  const queryClient = useQueryClient();

  const addMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;

    if (!setAddedMembers) return;

    if (checked) setAddedMembers((prev) => [...prev, { name, user_id }]);
    else
      setAddedMembers((prev) => prev.filter((val) => val.user_id !== user_id));
  };

  const { mutate } = useMutation({
    mutationKey: ["remove-members"],
    mutationFn: async (deleteMemberData: {
      group_id: string;
      members: string[];
    }) => axios.patch("/api/group/member/remove-member", deleteMemberData),
  });

  const group = queryClient.getQueryData<GroupType>(["group", param.contact]);

  const deleteMember = () => {
    const deleteMemberData = {
      group_id: group?.id ?? "",
      members: [user_id],
    };

    mutate(deleteMemberData, {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["group", param.contact],
        });
      },
    });
  };

  useEffect(() => {
    if (!inputRef.current) return;

    if (!addedMembers?.find((val) => val.user_id === user_id))
      inputRef.current.checked = false;
  }, [addedMembers, user_id]);

  return (
    <li className={style.member}>
      {checkbox && setAddedMembers ? (
        <input ref={inputRef} onChange={addMember} type="checkbox" />
      ) : null}
      <PhotoProfile name={name} size="md" />
      <span>{name}</span>
      {isMemberAdmin && (
        <div className={style.admin}>
          <span>Admin</span>
        </div>
      )}

      {!isMemberAdmin && showDelete ? (
        <KickMember
          isDark={isDark}
          adminId={adminId}
          deleteMember={deleteMember}
        />
      ) : null}
    </li>
  );
};

export default Member;
