import React from "react";
import CreateGroupInformation from "../create-group-information";
import CreateGroupHeader from "../create-group-header";
import NextButton from "../next-button";

const CreateGroup = () => {
  return (
    <>
      <CreateGroupHeader />
      <CreateGroupInformation />
      <NextButton title="Create" fill="#fff" />
    </>
  );
};

export default CreateGroup;
