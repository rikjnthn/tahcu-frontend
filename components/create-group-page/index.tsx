import React from "react";

import CreateGroup from "../create-group";
import AddingMembers from "../adding-members";

const CreateGroupPage = () => {
  return true ? (
    <div>
      <AddingMembers />
    </div>
  ) : (
    <div>
      <CreateGroup />
    </div>
  );
};

export default CreateGroupPage;
