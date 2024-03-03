import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import CreateGroupInformation from "../create-group-information";
import CreateGroupHeader from "../create-group-header";
import { AddedMembersType, SetStateType, UserDataType } from "@/interface";

const CreateGroup = ({
  addedMembers,
  setIsCreateGroup,
}: {
  addedMembers: AddedMembersType[];
  setIsCreateGroup: SetStateType<boolean>;
}) => {
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  return (
    <div>
      <CreateGroupHeader setIsCreateGroup={setIsCreateGroup} />
      <CreateGroupInformation addedMembers={addedMembers} userData={userData} />
    </div>
  );
};

export default CreateGroup;
