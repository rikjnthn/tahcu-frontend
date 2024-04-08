"use client";
import { useQueryClient } from "@tanstack/react-query";

import NavOption from "../nav-option";
import PhotoProfile from "../photo-profile";
import style from "./navigation.module.scss";
import DarkModeToggle from "../dark-mode-toggle";
import { useHomePageDispatch } from "@/context/home-page-context";
import { SetStateType, UserDataType } from "@/interface";
import { useDarkMode } from "@/context/dark-mode-context";

const Navigation = ({
  isOpenNav,
  setIsOpenNav,
}: {
  isOpenNav: boolean;
  setIsOpenNav: SetStateType<boolean>;
}) => {
  const { isDark } = useDarkMode();
  const queryClient = useQueryClient();
  const dispatch = useHomePageDispatch();

  const data = queryClient.getQueryData<UserDataType>(["userData"]);

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
        <NavOption
          onClick={openSetting}
          icon={isDark ? "setting-white.svg" : "setting-black.svg"}
          name="Setting"
        />
      </div>
    </nav>
  );
};

export default Navigation;
