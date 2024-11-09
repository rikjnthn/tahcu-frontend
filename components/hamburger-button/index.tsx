import clsx from "clsx";

import style from "./hamburger-button.module.scss";
import { ButtonType } from "@/interface";

const HamburgerButton = ({ fill, onClick, title }: ButtonType) => {
  return (
    <button
      onClick={onClick}
      className={clsx("icon", style.hamburger_button)}
      type="button"
      title={title}
    >
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="0.5" width="20" height="2.85714" rx="1.42857" fill={fill} />
        <rect
          y="7.35718"
          width="20"
          height="2.85714"
          rx="1.42857"
          fill={fill}
        />
        <rect
          y="14.2144"
          width="20"
          height="2.85714"
          rx="1.42857"
          fill={fill}
        />
      </svg>
    </button>
  );
};

export default HamburgerButton;
