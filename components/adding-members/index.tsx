import React from "react";

import AddingMembersHeader from "../adding-members-header";
import AddMembers from "../add-members";
import MemberList from "../member-list";
import NextButton from "../next-button";

const AddingMembers = () => {
  return (
    <>
      <AddingMembersHeader />
      <AddMembers />
      <MemberList checkbox />
      <NextButton fill="#fff" title="Next" />
    </>
  );
};

export default AddingMembers;
