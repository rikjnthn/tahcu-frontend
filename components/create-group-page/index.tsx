"use client";

import React, { useState } from "react";

import CreateGroup from "../create-group";
import AddingMembers from "../adding-members";
import style from "./create-group.module.scss";
import { AddedMembersType } from "@/interface";

const CreateGroupPage = () => {
  const [isCreateGroup, setIsCreateGroup] = useState<boolean>(true);
  const [addedMembers, setAddedMembers] = useState<AddedMembersType[]>([]);

  return (
    <div className={style.create_group_page}>
      <div className={`${isCreateGroup ? "translateX-0" : "translateX-100"}`}>
        <AddingMembers
          addedMembers={addedMembers}
          setAddedMembers={setAddedMembers}
          setIsCreateGroup={setIsCreateGroup}
        />
      </div>
      <div className={`${!isCreateGroup ? "translateX-0" : "translateX-100"}`}>
        <CreateGroup
          addedMembers={addedMembers}
          setIsCreateGroup={setIsCreateGroup}
        />
      </div>
    </div>
  );
};

export default CreateGroupPage;
