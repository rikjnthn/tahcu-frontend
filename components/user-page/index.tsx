"use client";
import { useState } from "react";

import PhotoProfile from "@/components/photo-profile";
import UserDatas from "@/components/user-datas";
import UserProfileHeader from "@/components/user-profile-header";
import EditProfileModal from "../edit-profile-modal";

const UserPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <main onScroll={() => console.log("first")} className="h-full-dvh">
      <UserProfileHeader setIsOpenModal={setIsOpenModal} />
      <div className="overflow-scroll user-profile-photo">
        <PhotoProfile name="User" size="xl" />
      </div>
      <UserDatas />
      {isOpenModal && <EditProfileModal setIsOpenModal={setIsOpenModal} />}
    </main>
  );
};

export default UserPage;
