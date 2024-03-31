import React from "react";

import style from "./modal.module.scss";

const Modal = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler;
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <div onClick={onClick} className={style.modal}>
      {children}
    </div>
  );
};

export default Modal;
