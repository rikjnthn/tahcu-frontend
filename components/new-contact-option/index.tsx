import React from "react";

import PlusButton from "../plus-button";
import style from "./new-contact-option.module.scss";
import AddNewContactModal from "../add-new-contact-modal";

const NewContactOption = () => {
  return (
    <div>
      {!true && <AddNewContactModal />}
      <div className={style.new_contact}>
        <PlusButton title="New Contact" fill="#fff" />
      </div>
    </div>
  );
};

export default NewContactOption;
