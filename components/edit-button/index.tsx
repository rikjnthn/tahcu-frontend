import React from "react";

import style from "./edit-button.module.scss";
import { ButtonType } from "@/interface";
import clsx from "clsx";

const EditButton = ({
  onClick,
  title,
  stroke,
}: ButtonType & { stroke: string }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("icon", style.edit_button)}
      title={title}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.78638 14.5902L3.74163 11.4298L11.944 3.22751C12.1392 3.03224 12.4558 3.03224 12.6511 3.22751L14.7724 5.34883C14.9676 5.54409 14.9676 5.86067 14.7724 6.05593L6.57006 14.2583L3.40966 15.2135C3.0276 15.329 2.6709 14.9723 2.78638 14.5902Z"
          stroke={stroke}
        />
        <path
          d="M12.3897 2.78174L13.7886 1.3829C13.9838 1.18764 14.3004 1.18764 14.4957 1.3829L16.617 3.50422C16.8123 3.69948 16.8123 4.01606 16.617 4.21132L15.2182 5.61017L12.3897 2.78174Z"
          stroke={stroke}
        />
      </svg>
    </button>
  );
};

export default EditButton;
