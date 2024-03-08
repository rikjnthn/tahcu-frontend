"use client";

import NavOption from "../nav-option";
import PhotoProfile from "../photo-profile";
import style from "./navigation.module.scss";
import DarkModeToggle from "../dark-mode-toggle";
import { useHomePageDispatch } from "@/context/home-page-context";
import { SetStateType } from "@/interface";

const Navigation = ({
  isOpenNav,
  setIsOpenNav,
}: {
  isOpenNav: boolean;
  setIsOpenNav: SetStateType<boolean>;
}) => {
  const dispatch = useHomePageDispatch();

  const openUserProfile = () => {
    setIsOpenNav(false);
    dispatch({ type: "SET_OPEN_PROFILE" });
  };

  const openSetting = () => {
    setIsOpenNav(false), dispatch({ type: "SET_OPEN_SETTING" });
  };

  return (
    <nav
      className={`${style.navigation} ${
        !isOpenNav ? `${style.close_nav}` : ""
      }`}
    >
      <div onClick={openUserProfile}>
        <PhotoProfile name="name" size="md" />
        <div>
          <span>User</span>
          <span>08123456789</span>
        </div>
      </div>
      <div>
        <DarkModeToggle />
        <NavOption onClick={openSetting} icon="setting.svg" name="Setting" />
      </div>
    </nav>
  );
};

export default Navigation;
