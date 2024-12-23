import React from "react";
import clsx from "clsx";

import { ButtonType } from "@/interface";
import style from "./three-dots.module.scss";

const ThreeDots = ({ onClick, fill }: ButtonType) => {
  return (
    <button onClick={onClick} className={clsx("icon", style.three_dots)}>
      <svg
        width="4"
        height="16"
        viewBox="0 0 4 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="2" cy="2" r="2" fill={fill} />
        <circle cx="2" cy="8" r="2" fill={fill} />
        <circle cx="2" cy="14" r="2" fill={fill} />
      </svg>
    </button>
  );
};

export default ThreeDots;
