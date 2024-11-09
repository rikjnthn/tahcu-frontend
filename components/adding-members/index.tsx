"use client";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import AddingMembersHeader from "../adding-members-header";
import AddMembers from "../add-members";
import MemberList from "../member-list";
import NextButton from "../next-button";
import { ContactType, UserDataType } from "@/interface";
import {
  useCreateGroup,
  useCreateGroupDispatch,
} from "@/context/create-group-context";

const AddingMembers = () => {
  const queryClient = useQueryClient();

  const contacts = queryClient.getQueryData<ContactType[]>(["contacts"]);
  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  const { addedMembers } = useCreateGroup();
  const { setIsCreateGroup } = useCreateGroupDispatch();

  const next = () => {
    if (addedMembers.length > 0) setIsCreateGroup(true);
  };

  return (
    <div>
      <AddingMembersHeader />
      <AddMembers />
      <MemberList contacts={contacts} userData={userData} />
      <NextButton onClick={next} type="button" fill="#fff" title="Next" />
    </div>
  );
};

export default AddingMembers;
