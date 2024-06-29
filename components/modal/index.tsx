import React, { useEffect } from "react";

import style from "./modal.module.scss";
import { SetStateType } from "@/interface";

const Modal = ({
  onClick,
  setIsOpenModal,
  children,
}: {
  onClick?: React.MouseEventHandler;
  setIsOpenModal: SetStateType<boolean>;
  children: React.ReactNode | React.ReactNode[];
}) => {
  useEffect(() => {
    const closeModalOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpenModal(false);
    };

    document.addEventListener("keyup", closeModalOnEsc);

    return () => document.removeEventListener("keyup", closeModalOnEsc);
  }, [setIsOpenModal]);

  return (
    <div onClick={onClick} className={style.modal}>
      {children}
    </div>
  );
};

export default Modal;
