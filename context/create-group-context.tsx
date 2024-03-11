import { AddedMembersType, SetStateType } from "@/interface";
import React, { createContext, useContext, useState } from "react";

const CreateGroupContext = createContext<CreateGroupStateType | null>(null);

const CreateGroupDispatchContext =
  createContext<CreateGroupDispatchType | null>(null);

export const useCreateGroup = () => {
  const context = useContext(CreateGroupContext);

  if (!context)
    throw new Error("useCreateGroup must be used within a CreateGroupProvider");

  return context;
};

export const useCreateGroupDispatch = () => {
  const context = useContext(CreateGroupDispatchContext);

  if (!context)
    throw new Error(
      "useCreateGroupDispatch must be used within a CreateGroupProvider"
    );

  return context;
};

export const CreateGroupProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCreateGroup, setIsCreateGroup] = useState<boolean>(false);
  const [addedMembers, setAddedMembers] = useState<AddedMembersType[]>([]);

  return (
    <CreateGroupContext.Provider value={{ isCreateGroup, addedMembers }}>
      <CreateGroupDispatchContext.Provider
        value={{ setIsCreateGroup, setAddedMembers }}
      >
        {children}
      </CreateGroupDispatchContext.Provider>
    </CreateGroupContext.Provider>
  );
};

interface CreateGroupStateType {
  isCreateGroup: boolean;
  addedMembers: AddedMembersType[];
}

interface CreateGroupDispatchType {
  setIsCreateGroup: SetStateType<boolean>;
  setAddedMembers: SetStateType<AddedMembersType[]>;
}
