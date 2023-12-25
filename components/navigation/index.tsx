"use client";

import { useRouter } from "next/navigation";

import NavOption from "../nav-option";
import PhotoProfile from "../photo-profile";
import style from "./navigation.module.scss";
import DarkModeToggle from "../dark-mode-toggle";

const Navigation = ({ openNav }: { openNav: boolean }) => {
  const router = useRouter();

  return (
    <nav className={`${style.navigation} ${!openNav ? style.close_nav : ""}`}>
      <div onClick={() => router.push("/user")}>
        <PhotoProfile name="name" size="md" />
        <div>
          <span>User</span>
          <span>08123456789</span>
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
