import React from "react";

import style from "./plus-button.module.scss";
import { ButtonType } from "@/interface";

const PlusButton = ({ fill, title, onClick }: ButtonType) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`icon ${style.plus_button}`}
      title={title}
    >
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="6.56689"
          width="14"
          height="1.86667"
          rx="0.933333"
          fill={fill}
        />
        <rect
          x="6.06667"
          y="14.5"
          width="14"
          height="1.86667"
          rx="0.933333"
          transform="rotate(-90 6.06667 14.5)"
          fill={fill}
        />
      </svg>
    </button>
  );
};

export default PlusButton;
