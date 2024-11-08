import React, { forwardRef, useId } from "react";
import clsx from "clsx";

import style from "./input.module.scss";

const Input = (
  { noTransition, labelName, className, error, ...props }: InputPropsType,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const id = useId();

  const isError = typeof error === "string" && error.length > 0;

  return (
    <div
      className={clsx(
        noTransition ? style.input_no_transition : style.input_with_transition,
        { className: !!className }
      )}
    >
      <div>
        <input ref={ref} id={id} aria-invalid={isError} {...props} />
        {labelName ? <label htmlFor={id}>{labelName}</label> : null}
      </div>

      {isError && (
        <span className={style.error_message} title={error}>
          {error}
        </span>
      )}
    </div>
  );
};

export default forwardRef(Input);

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  noTransition?: boolean;
  labelName?: string;
  error?: string;
}
