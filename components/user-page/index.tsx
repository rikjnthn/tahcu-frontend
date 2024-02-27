"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import PhotoProfile from "@/components/photo-profile";
import UserDatas from "@/components/user-datas";
import UserProfileHeader from "@/components/user-profile-header";
import EditProfileModal from "../edit-profile-modal";

const getUserData = async () => {
  const { data } = await axios.get("/api/users", {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "CSRF_TOKEN",
    xsrfHeaderName: "x-csrf-token",
  });

  return data;
};

const UserPage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
    retry: false,
  });

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
