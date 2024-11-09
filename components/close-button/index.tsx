import React from "react";

import { ButtonType } from "@/interface";
import style from "./close-button.module.scss";
import clsx from "clsx";

const CloseButton = ({
  stroke,
  onClick,
  title,
}: ButtonType & { stroke: string }) => {
  return (
    <button
      onClick={onClick}
      className={clsx("icon", style.close_button)}
      type="button"
      title={title}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 7 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.42462 1L6.37437 5.94975"
          stroke={stroke}
          strokeLinecap="round"
        />
        <path
          d="M1.42462 6L6.37437 1.05025"
          stroke={stroke}
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default CloseButton;
