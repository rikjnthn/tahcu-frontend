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
  const { data } = await axios.get("/api/users");
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

  const openSetting = () => {
    setIsOpenNav(false);
    dispatch({ type: "SET_OPEN_SETTING" });
  };

  return (
    <nav
      className={`${style.navigation} ${
        !isOpenNav ? `${style.close_nav}` : ""
      }`}
    >
      <div className={style.user_data} onClick={openUserProfile}>
        <PhotoProfile name={data?.username} size="md" />
        <div>
          <span className={style.username}>{data?.username}</span>
          <span className={style.email}>{data?.email}</span>
        </div>
      </div>
      <div className={style.nav_option}>
        <DarkModeToggle />
        <NavOption onClick={openSetting} icon="setting.svg" name="Setting" />
      </div>
    </nav>
  );
};

export default Navigation;
