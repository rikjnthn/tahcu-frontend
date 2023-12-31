"use client";

import React, { useId } from "react";

import style from "./edit-profile-modal-body.module.scss";

const EditProfileModalBody = () => {
  const userNameId = useId();
  const userIdId = useId();
  const phoneId = useId();

  return (
    <form className={style.body}>
      <div>
        <input type="text" name="" id={userNameId} defaultValue={"User"} />
        <label htmlFor={userNameId}>Username</label>
      </div>

      <div>
        <input type="text" name="" id={userIdId} defaultValue={"User123"} />
        <label htmlFor={userIdId}>User Id</label>
      </div>

      <div>
        <input type="tel" name="" id={phoneId} defaultValue={"0812345678"} />
        <label htmlFor={phoneId}>Phone</label>
      </div>

      <button type="submit">Confirm</button>
    </form>
  );
};

export default EditProfileModalBody;
