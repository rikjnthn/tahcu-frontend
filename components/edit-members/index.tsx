import React, { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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

const EditMembers = ({
  currentMembers,
  setIsEditMembers,
}: {
  currentMembers: GroupMemberShipType[];
  setIsEditMembers: SetStateType<boolean>;
}) => {
  const [addedMembers, setAddedMembers] = useState<AddedMembersType[]>([]);

  const searchParams = useSearchParams();

  const { isDark } = useDarkMode();
  const queryClient = useQueryClient();

  const chatId = searchParams.get("chatId");

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);
  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);

  const { mutate: addMembers, isPending } = useMutation({
    mutationKey: ["add-members"],
    mutationFn: async (addMembersData: {
      group_id: string;
      members: string[];
    }) => axios.patch("/api/group/member/add-member", addMembersData),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const addMembersData = {
      group_id: chatId ?? "",
      members: addedMembers.map((addedMember) => addedMember.user_id),
    };

    addMembers(addMembersData, {
      onSuccess: () => {
        queryClient.prefetchQuery({
          queryKey: ["group", chatId],
        });

        setIsEditMembers(false);
      },
    });
  };

  return (
    <Modal
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
          {contacts
            ? contacts.map(({ id, friends, friends_id, user, user_id }) => {
                const isInGroup = currentMembers.find((currentMember) => {
                  const memberId =
                    userData?.user_id === user_id ? friends_id : user_id;

                  return currentMember.user_id === memberId;
                });

                if (isInGroup) return;

                return (
                  <Member
                    key={id}
                    checkbox
                    name={
                      userData?.user_id === user_id
                        ? friends.username
                        : user.username
                    }
                    user_id={
                      userData?.user_id === user_id ? friends_id : user_id
                    }
                    addedMembers={addedMembers}
                    setAddedMembers={setAddedMembers}
                  />
                );
              })
            : null}
        </div>

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
