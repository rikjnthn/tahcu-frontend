import React from "react";

const TahcuLogo = ({ white }: { white?: boolean }) => {
  if (white) {
    return (
      <svg
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.2019 2C27.6308 8.04167 29.4971 19.2917 17.5319 15.9583C5.56658 12.625 2.19175 21.9306 2 27"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M7 9.66196H19.9443C20.8506 9.66196 21.7445 9.16487 21.924 8.24773C22.2607 6.52719 21.5997 4.5 17.4605 4.5M14.5 9.66196V21.7926C14.5 22.6049 14.5712 23.7045 15.25 24.1154C16.4661 24.8517 18.75 24.6316 18.75 22.5668"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.2019 2C27.6308 8.04167 29.4971 19.2917 17.5319 15.9583C5.56658 12.625 2.19175 21.9306 2 27"
        stroke="#6BBF59"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M7 9.66196H19.9443C20.8506 9.66196 21.7445 9.16487 21.924 8.24773C22.2607 6.52719 21.5997 4.5 17.4605 4.5M14.5 9.66196V21.7926C14.5 22.6049 14.5712 23.7045 15.25 24.1154C16.4661 24.8517 18.75 24.6316 18.75 22.5668"
        stroke="#0B6E4F"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TahcuLogo;
