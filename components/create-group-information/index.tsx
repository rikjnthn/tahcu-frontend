"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

import MemberList from "../member-list";
import style from "./create-group-information.module.scss";
import { AddedMembersType, ContactType, UserDataType } from "@/interface";
import Input from "../input";
import NextButton from "../next-button";
import { useHomePageDispatch } from "@/context/home-page-context";

const CreateGroupInformation = ({
  contacts,
  userData,
  addedMembers,
}: {
  contacts?: ContactType[];
  userData?: UserDataType;
  addedMembers: AddedMembersType[];
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ group_name: string }>();

  const { mutate } = useMutation({
    mutationKey: ["createGroup"],
    mutationFn: (groupData: GroupDataType) =>
      axios.post("api/group", groupData, {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "CSRF_TOKEN",
        xsrfHeaderName: "x-csrf-token",
      }),
  });

  const dispatch = useHomePageDispatch();

  const onSubmit = (data: { group_name: string }) => {
    const groupData = {
      name: data.group_name,
      description: "",
      members: addedMembers.map((member) => member.user_id),
    };

    mutate(groupData, {
      onSuccess: () => {
        queryClient.prefetchQuery({
          queryKey: ["groupList"],
        });

        dispatch({ type: "SET_OPEN_CHAT_CONTACT" });
      },
    });
  };

  return (
    <div className={style.create_group_information}>
      <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
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

      <MemberList
        notCheckable
        addedMembers={addedMembers}
        contacts={contacts}
        userData={userData}
      />
    </div>
  );
};

export default CreateGroupInformation;

interface GroupDataType {
  name: string;
  description: string;
  members: string[];
}
