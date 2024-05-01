"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import NavOption from "../nav-option";
import PhotoProfile from "../photo-profile";
import style from "./navigation.module.scss";
import DarkModeToggle from "../dark-mode-toggle";
import { useHomePageDispatch } from "@/context/home-page-context";
import { SetStateType, UserDataType } from "@/interface";
import { useDarkMode } from "@/context/dark-mode-context";
import cookieParser from "@/util/cookie-parser";

const Navigation = ({
  isOpenNav,
  setIsOpenNav,
}: {
  isOpenNav: boolean;
  setIsOpenNav: SetStateType<boolean>;
}) => {
  const router = useRouter();
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

  const logout = () => {
    const cookies = cookieParser(document.cookie);

    for (const cookieName in cookies) {
      document.cookie = `${cookieName}=${
        cookies[cookieName]
      }; expires=${new Date(0).toUTCString()};`;
    }

    router.push("/");
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
        <NavOption
          onClick={logout}
          className="margin-top-auto"
          icon={isDark ? "logout-white.svg" : "logout-black.svg"}
          name="Logout"
        />
      </div>
    </nav>
  );
};

export default Navigation;
