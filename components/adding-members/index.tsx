import React from "react";

import AddingMembersHeader from "../adding-members-header";
import AddMembers from "../add-members";
import MemberList from "../member-list";
import NextButton from "../next-button";
import { SetStateType } from "@/interface";

const AddingMembers = ({
  setIsCreateGroup,
}: {
  setIsCreateGroup: SetStateType<boolean>;
}) => {
  return (
    <div>
      <AddingMembersHeader />
      <AddMembers />
      <MemberList checkbox />
      <NextButton
        onClick={() => setIsCreateGroup(false)}
        fill="#fff"
        title="Next"
      />
    </div>
  );
};

export default AddingMembers;
