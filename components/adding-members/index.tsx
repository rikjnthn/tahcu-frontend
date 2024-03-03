"use client";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import AddingMembersHeader from "../adding-members-header";
import AddMembers from "../add-members";
import MemberList from "../member-list";
import NextButton from "../next-button";
import {
  AddedMembersType,
  ContactType,
  SetStateType,
  UserDataType,
} from "@/interface";

const AddingMembers = ({
  addedMembers,
  setAddedMembers,
  setIsCreateGroup,
}: {
  addedMembers: AddedMembersType[];
  setAddedMembers: SetStateType<AddedMembersType[]>;
  setIsCreateGroup: SetStateType<boolean>;
}) => {
  const queryClient = useQueryClient();

  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);
  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  const next = () => {
    if (addedMembers.length > 0) setIsCreateGroup(false);
  };

  return (
    <div>
      <AddingMembersHeader />
      <AddMembers
        addedMembers={addedMembers}
        setAddedMembers={setAddedMembers}
      />
      <MemberList
        contacts={contacts}
        userData={userData}
        addedMembers={addedMembers}
        setAddedMembers={setAddedMembers}
      />
      <NextButton onClick={next} type="button" fill="#fff" title="Next" />
    </div>
  );
};

export default AddingMembers;
