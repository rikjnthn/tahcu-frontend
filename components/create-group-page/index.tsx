"use client";

import React from "react";

import CreateGroup from "../create-group";
import AddingMembers from "../adding-members";
import style from "./create-group.module.scss";
import { useCreateGroup } from "@/context/create-group-context";
import clsx from "clsx";

const CreateGroupPage = () => {
  const { isCreateGroup } = useCreateGroup();

  return (
    <div className={style.create_group_page}>
      <div className={clsx(!isCreateGroup ? "translateX-0" : "translateX-100")}>
        <AddingMembers />
      </div>
      <div className={clsx(isCreateGroup ? "translateX-0" : "translateX-100")}>
        <CreateGroup />
      </div>
    </div>
  );
};

export default CreateGroupPage;
