"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

import MemberList from "../member-list";
import style from "./create-group-information.module.scss";
import { UserDataType } from "@/interface";
import Input from "../input";
import NextButton from "../next-button";
import { useHomePageDispatch } from "@/context/home-page-context";
import {
  useCreateGroup,
  useCreateGroupDispatch,
} from "@/context/create-group-context";
import { useEffect } from "react";

const CreateGroupInformation = ({ userData }: { userData?: UserDataType }) => {
  const queryClient = useQueryClient();

  const { addedMembers, isCreateGroup } = useCreateGroup();
  const { setAddedMembers, setIsCreateGroup } = useCreateGroupDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ group_name: string }>();

  const { mutate } = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: (groupData: GroupDataType) =>
      axios.post("api/group", groupData),
  });

  const dispatch = useHomePageDispatch();

  const onSubmit = (data: { group_name: string }) => {
    const userId = userData?.user_id ?? undefined;

    const members = [userId, ...addedMembers.map((member) => member.user_id)];

    const groupData = {
      name: data.group_name,
      description: "",
      members,
    };

    mutate(groupData, {
      onSuccess: () => {
        queryClient.prefetchQuery({
          queryKey: ["groupList"],
        });

        setIsCreateGroup(false);
        setAddedMembers([]);
        dispatch({ type: "SET_OPEN_CHAT_CONTACT" });
      },
    });
  };

  useEffect(() => {
    if (!isCreateGroup) setValue("group_name", "");
  }, [isCreateGroup, setValue]);

  return (
    <div className={style.create_group_information}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelName="Group Name"
          errorMessage={errors.group_name?.message?.toString()}
          placeholder="Group"
          {...register("group_name", {
            required: {
              value: true,
              message: "Please enter your group name",
            },
          })}
        />

        <NextButton type="submit" fill="#fff" title="Create group" />
      </form>

      <MemberList notCheckable userData={userData} />
    </div>
  );
};

export default CreateGroupInformation;

interface GroupDataType {
  name: string;
  description: string;
  members: Array<string | undefined>;
}
