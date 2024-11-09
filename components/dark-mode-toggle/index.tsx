"use client";

import clsx from "clsx";

import style from "./dark-mode-toggle.module.scss";
import { useDarkMode } from "@/context/dark-mode-context";

const DarkModeToggle = () => {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <div className={style.dark_mode_toggle} title={isDark ? "Dark" : "Light"}>
      <div>
        <svg
          width="15"
          height="15"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7073 3.9498C13.8167 2.11824 17.2418 1.29142 20.613 1.37202C13.272 5.97959 10.9345 15.6726 15.3928 23.2411C19.851 30.8097 29.4619 33.4645 37.0507 29.2777C35.4868 32.2653 33.1032 34.8601 29.9938 36.6917C21.0514 41.9592 9.47518 38.916 4.14475 29.8667C-1.18568 20.8174 1.76492 9.21729 10.7073 3.9498Z"
            fill={isDark ? "#ffffff" : "#000000"}
            stroke={isDark ? "#ffffff" : "#000000"}
            strokeWidth="2"
          />
        </svg>
      </div>

      <span>Dark mode</span>

      <div
        onClick={() => setIsDark((prev) => !prev)}
        className={clsx(
          style.toggle,
          isDark ? style.toggle_true : style.toggle_false
        )}
      />
    </div>
  );
};

export default DarkModeToggle;
