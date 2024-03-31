import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import CreateGroupInformation from "../create-group-information";
import CreateGroupHeader from "../create-group-header";
import { UserDataType } from "@/interface";

const CreateGroup = () => {
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  return (
    <div>
      <CreateGroupHeader />
      <CreateGroupInformation userData={userData} />
    </div>
  );
};

export default CreateGroup;
