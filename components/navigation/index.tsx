"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import NavOption from "../nav-option";
import PhotoProfile from "../photo-profile";
import style from "./navigation.module.scss";
import DarkModeToggle from "../dark-mode-toggle";
import { useHomePageDispatch } from "@/context/home-page-context";
import { SetStateType } from "@/interface";

const getUserData = async () => {
  const { data } = await axios.get("/api/users", {
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "CSRF_TOKEN",
    xsrfHeaderName: "x-csrf-token",
  });

  return data;
};

const Navigation = ({
  isOpenNav,
  setIsOpenNav,
}: {
  isOpenNav: boolean;
  setIsOpenNav: SetStateType<boolean>;
}) => {
  const { data } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  const dispatch = useHomePageDispatch();

  const openUserProfile = () => {
    setIsOpenNav(false);
    dispatch({ type: "SET_OPEN_PROFILE" });
  };

  return (
    <nav
      className={`${style.navigation} ${
        !isOpenNav ? `${style.close_nav}` : ""
      }`}
    >
      <div onClick={openUserProfile}>
        <PhotoProfile name={data?.username} size="md" />
        <div>
          <span>{data?.username}</span>
          <span>{data?.email}</span>
        </div>
      </div>
      <div>
        <DarkModeToggle />
        <NavOption icon="setting.svg" name="Setting" />
      </div>
    </nav>
  );
};

export default Navigation;
