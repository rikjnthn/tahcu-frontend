import React, { forwardRef, useId } from "react";

import style from "./input.module.scss";

const Input = (
  {
    withLabel,
    labelName,
    className,
    errorMessage,
    ...props
  }: {
    withLabel?: boolean;
    labelName?: string;
    errorMessage?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const id = useId();

  const isError = typeof errorMessage?.length !== "undefined";

  if (withLabel) {
    return (
      <div className={`${style.input_container} ${className}`}>
        <div>
          <input ref={ref} id={id} aria-invalid={isError} {...props} />
          <label htmlFor={id}>{labelName}</label>
        </div>
        {errorMessage ? (
          <em className={style.error_message} title={errorMessage}>
            {errorMessage}
          </em>
        ) : null}
      </div>
    );
  }

  return (
    <input
      ref={ref}
      className={`${style.input_only} ${className}`}
      {...props}
    />
  );
};

export default forwardRef(Input);
