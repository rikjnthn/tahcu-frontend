import React from "react";

import style from "./submit-button.module.scss";
import Spinner from "../spinner";

const SubmitButton = ({
  name,
  isLoading,
  className,
  title,
}: SubmitButtonPropsType) => {
  return (
    <button
      className={`${style.button} ${className}`}
      type="submit"
      title={title}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : name}
    </button>
  );
};

export default SubmitButton;

interface SubmitButtonPropsType {
  className?: string;
  name: string;
  title?: string;
  isLoading: boolean;
}
