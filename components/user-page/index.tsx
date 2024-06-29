"use client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import PhotoProfile from "@/components/photo-profile";
import UserDatas from "@/components/user-datas";
import UserProfileHeader from "@/components/user-profile-header";
import EditProfileModal from "../edit-profile-modal";
import { UserDataType } from "@/interface";

const UserPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const queryCLient = useQueryClient();

  const data = queryCLient.getQueryData<UserDataType>(["userData"]);

  return (
    <div>
      <UserProfileHeader setIsOpenModal={setIsOpenModal} />
      <div className="overflow-scroll user-profile-photo">
        <PhotoProfile name={data?.username} size="xl" />
      </div>
      <UserDatas
        userId={data?.user_id}
        username={data?.username}
        email={data?.email}
      />
      {isOpenModal && <EditProfileModal setIsOpenModal={setIsOpenModal} />}
    </div>
  );
};

export default UserPage;
