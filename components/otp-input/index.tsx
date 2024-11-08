import React, { useEffect, useRef, useState } from "react";

import style from "./otp-input.module.scss";
import Input from "../input";
import SubmitButton from "../submit-button";

const OTPInput = ({
  length,
  handleSubmit,
  isLoading,
  autoFocus = false,
  isInvalid = false,
  error,
}: OTPInputPropsType) => {
  const [otpValue, setOtpValue] = useState<string[]>(Array(length).fill(""));

  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!autoFocus) return;

    inputRef.current[0]?.focus();
  }, [autoFocus]);

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const pasteValue = e.clipboardData.getData("text").split("");

    if (pasteValue.length === 0) return;

    if (pasteValue.every((val) => !Number.isNaN(Number(val)))) {
      const newOtp = [...otpValue];

      for (let i = 0; i < pasteValue.length; i++) {
        if (idx < otpValue.length) newOtp[i] = pasteValue[i];
      }

      setOtpValue(newOtp);
      inputRef.current[length - 1]?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.currentTarget.value;

    if (!isNaN(parseInt(value))) {
      setOtpValue((prev) => {
        const newOtp = [...prev];
        newOtp[idx] = value;

        return newOtp;
      });

      if (value !== "" && idx + 1 < otpValue.length) {
        inputRef.current[idx + 1]?.focus();
      }
    }
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setOtpValue((prev) => {
        const newOtp = [...prev];
        newOtp[idx] = "";

        return newOtp;
      });

      if (idx > 0) {
        inputRef.current[idx - 1]?.focus();
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const otpAsNumber = otpValue.join("");

    if (otpAsNumber.length === 4) {
      handleSubmit(otpAsNumber);
    }
  };

  return (
    <form onSubmit={onSubmit} className={style.otp_input}>
      <div>
        {Array.from({ length }, (_, idx) => {
          return (
            <Input
              key={idx}
              ref={(ref) => (inputRef.current[idx] = ref)}
              onPaste={(e) => handlePaste(e, idx)}
              onChange={(e) => handleChange(e, idx)}
              onKeyUp={(e) => handleKeyUp(e, idx)}
              inputMode="numeric"
              type="text"
              value={otpValue[idx]}
              maxLength={1}
              autoComplete="off"
              aria-invalid={isInvalid}
            />
          );
        })}
      </div>

      <span className={style.error_message}>{error}</span>

      <SubmitButton
        className={style.submit}
        name="Submit"
        isLoading={isLoading}
        title="Send OTP"
      />
    </form>
  );
};

export default OTPInput;

interface OTPInputPropsType {
  length: number;
  handleSubmit: (otp: string) => void;
  isLoading: boolean;
  autoFocus?: boolean;
  isInvalid?: boolean;
  error?: string;
}
