"use client";
import { useId } from "react";

import style from "./add-new-contact-modal.module.scss";

const AddNewContactModal = () => {
  const nameId = useId();
  const phoneNumberId = useId();

  return (
    <div className={style.modal}>
      <form>
        <span>Add New Contact</span>

        <div>
          <label htmlFor={nameId}>Name</label>
          <input type="text" name="name" id={nameId} placeholder="Name" />
        </div>

        <div>
          <label htmlFor={phoneNumberId}>Phone Number</label>
          <input type="tel" name="phone_number" id={phoneNumberId} />
        </div>

        <div>
          <button type="button">Cancel</button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewContactModal;
