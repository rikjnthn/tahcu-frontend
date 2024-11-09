"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

import MemberList from "../member-list";
import style from "./create-group-information.module.scss";
import { ErrorResponseType, UserDataType } from "@/interface";
import Input from "../input";
import NextButton from "../next-button";
import { useHomePageDispatch } from "@/context/home-page-context";
import {
  useCreateGroup,
  useCreateGroupDispatch,
} from "@/context/create-group-context";

const CreateGroupInformation = ({ userData }: { userData?: UserDataType }) => {
  const [createGroupErrorMessage, setCreateGroupErrorMessage] =
    useState<string>("");

  const queryClient = useQueryClient();

  const { addedMembers, isCreateGroup } = useCreateGroup();
  const { setAddedMembers, setIsCreateGroup } = useCreateGroupDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<{ group_name: string }>();

  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponseType>,
    GroupDataType
  >({
    mutationKey: ["createGroup"],
    mutationFn: (groupData) => axios.post("api/group", groupData),
  });

  const dispatch = useHomePageDispatch();

  const onSubmit = (data: { group_name: string }) => {
    const userId = userData?.user_id;

    const members = [userId, ...addedMembers.map((member) => member.user_id)];

    const groupData = {
      name: data.group_name,
      description: "",
      members,
    };

    setCreateGroupErrorMessage("");

    mutate(groupData, {
      onError(error) {
        if (error.response?.data.error.code === "VALIDATION_ERROR") {
          setError("group_name", {
            message: error.response.data.error.message,
          });

          return;
        }

        if (error.response?.data.error.code === "NOT_FOUND") {
          setCreateGroupErrorMessage(
            "One or more members to be added to the group are not found"
          );

          return;
        }

        setCreateGroupErrorMessage("Failed to create group");
      },
      async onSuccess() {
        await queryClient.prefetchQuery({ queryKey: ["groups"] });

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
          error={errors.group_name?.message?.toString()}
          placeholder="Group"
          {...register("group_name", {
            required: {
              value: true,
              message: "Please enter your group name",
            },
          })}
        />

        {createGroupErrorMessage.length > 0 && (
          <em>{createGroupErrorMessage}</em>
        )}

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
