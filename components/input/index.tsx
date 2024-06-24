import React, { forwardRef, useId } from "react";

import style from "./input.module.scss";

const Input = (
  {
    noTransition,
    labelName,
    className,
    errorMessage,
    ...props
  }: {
    noTransition?: boolean;
    labelName?: string;
    errorMessage?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const id = useId();

  const isError = typeof errorMessage === "string" && errorMessage.length > 0;

  return (
    <div
      className={`${
        noTransition ? style.input_no_transition : style.input_with_transition
      } ${className ? className : ""}`}
    >
      <div>
        <input ref={ref} id={id} aria-invalid={isError} {...props} />
        {labelName ? <label htmlFor={id}>{labelName}</label> : null}
      </div>
      {isError ? (
        <em className={style.error_message} title={errorMessage}>
          {errorMessage}
        </em>
      ) : null}
    </div>
  );
};

export default forwardRef(Input);
