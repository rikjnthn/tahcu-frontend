import React, { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
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

const EditMembers = ({
  currentMembers,
  setIsEditMembers,
}: {
  currentMembers: GroupMemberShipType[];
  setIsEditMembers: SetStateType<boolean>;
}) => {
  const [addedMembers, setAddedMembers] = useState<AddedMembersType[]>([]);

  const param = useParams<{ contact: string }>();

  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);
  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);

  const { mutate: addMembers } = useMutation({
    mutationKey: ["add-members"],
    mutationFn: async (addMembersData: {
      group_id: string;
      members: string[];
    }) => axios.patch("/api/group/member/add-member", addMembersData),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const addMembersData = {
      group_id: param.contact,
      members: addedMembers.map((addedMember) => addedMember.user_id),
    };

    addMembers(addMembersData, {
      onSuccess: () => {
        queryClient.prefetchQuery({
          queryKey: ["group", param.contact],
        });

        setIsEditMembers(false);
      },
    });
  };

  return (
    <div className={style.modal}>
      <div>
        <header>
          <CloseButton onClick={() => setIsEditMembers(false)} stroke="#000" />
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
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default EditMembers;
