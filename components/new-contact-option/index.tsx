"use client";
import React, { useState } from "react";

import PlusButton from "../plus-button";
import style from "./new-contact-option.module.scss";
import AddNewContactModal from "../add-new-contact-modal";

const NewContactOption = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <div>
      {isOpenModal && <AddNewContactModal setIsOpenModal={setIsOpenModal} />}
      <div className={style.new_contact}>
        <PlusButton
          onClick={() => setIsOpenModal(true)}
          title="New contact"
          fill="#fff"
        />
      </div>
    </div>
  );
};

export default NewContactOption;
