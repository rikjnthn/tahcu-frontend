"use client";

import { useState } from "react";

import style from "./float-button.module.scss";
import EditButton from "../edit-button";
import FloatOption from "../float-option";
import CloseButton from "../close-button";

const FloatButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={style.float_button}>
      {isOpen && <FloatOption setIsOpen={setIsOpen} />}

      {isOpen ? (
        <CloseButton
          onClick={() => setIsOpen(false)}
          stroke="#fff"
          title="Close"
        />
      ) : (
        <EditButton
          onClick={() => setIsOpen(true)}
          stroke="transparant"
          title="Open"
        />
      )}
    </div>
  );
};

export default FloatButton;
