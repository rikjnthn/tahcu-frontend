import React, { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import style from "./edit-members.module.scss";
import CloseButton from "../close-button";
import {
  AddedMembersType,
  ContactType,
  GroupMemberShipType,
  SetStateType,
  UserDataType,
} from "@/interface";
import Member from "../member";
import SubmitButton from "../submit-button";
import Modal from "@/components/modal";
import { useDarkMode } from "@/context/dark-mode-context";
import { useURLHash } from "@/context/url-hash-context";

const EditMembers = ({
  currentMembers,
  setIsEditMembers,
}: {
  currentMembers: GroupMemberShipType[];
  setIsEditMembers: SetStateType<boolean>;
}) => {
  const [addMemberErrorMessage, setAddMembersErrorMessage] =
    useState<string>("");
  const [addedMembers, setAddedMembers] = useState<AddedMembersType[]>([]);

  const { hash: chatId } = useURLHash();

  const { isDark } = useDarkMode();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);
  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);

  const { mutate: addMembers, isPending } = useMutation<
    AxiosResponse,
    AxiosError,
    AddMemberDataType
  >({
    mutationKey: ["add-members"],
    mutationFn: async (addMembersData) =>
      axios.patch("/api/group/member/add-member", addMembersData),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (addedMembers.length === 0) return;

    if (!chatId) return;

    const addMembersData = {
      group_id: chatId,
      members: addedMembers.map((addedMember) => addedMember.user_id),
    };

    addMembers(addMembersData, {
      onError() {
        setAddMembersErrorMessage("Failed to add members");
      },
      async onSuccess() {
        await queryClient.prefetchQuery({
          queryKey: ["group", chatId],
        });

        setIsEditMembers(false);
      },
    });
  };

  return (
    <Modal
      setIsOpenModal={setIsEditMembers}
      onClick={(e) => {
        if (e.currentTarget === e.target) setIsEditMembers(false);
      }}
    >
      <div className={style.contact_container}>
        <header className={style.header}>
          <CloseButton
            onClick={() => setIsEditMembers(false)}
            stroke={isDark ? "#ffffff" : "#000000"}
            title="Close"
          />
          <span>Add Members</span>
        </header>
        <div>
          {contacts?.map(({ id, friends, friends_id, user, user_id }) => {
            const isInGroup = currentMembers.find((currentMember) => {
              const memberId =
                userData?.user_id === user_id ? friends_id : user_id;

              return currentMember.user_id === memberId;
            });

            if (isInGroup) return;

            return (
              <Member
                key={id}
                name={
                  userData?.user_id === user_id
                    ? friends.username
                    : user.username
                }
                user_id={userData?.user_id === user_id ? friends_id : user_id}
                addedMembers={addedMembers}
                setAddedMembers={setAddedMembers}
                checkbox
              />
            );
          })}
        </div>

        {addMemberErrorMessage.length > 0 && (
          <em className={style.error_message}>{addMemberErrorMessage}</em>
        )}

        <form onSubmit={handleSubmit}>
          <SubmitButton
            className={style.submit}
            name="Add"
            isLoading={isPending}
          />
        </form>
      </div>
    </Modal>
  );
};

export default EditMembers;

interface AddMemberDataType {
  group_id: string;
  members: string[];
}