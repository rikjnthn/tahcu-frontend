import React from "react";

import CreateGroupInformation from "../create-group-information";
import CreateGroupHeader from "../create-group-header";
import NextButton from "../next-button";
import { SetStateType } from "@/interface";

const CreateGroup = ({
  setIsCreateGroup,
}: {
  setIsCreateGroup: SetStateType<boolean>;
}) => {
  return (
    <div>
      <CreateGroupHeader setIsCreateGroup={setIsCreateGroup} />
      <CreateGroupInformation />
      <NextButton title="Create" fill="#fff" />
    </div>
  );
};

export default CreateGroup;
