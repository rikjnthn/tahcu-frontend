"use client";

import React, { useEffect, useId } from "react";

import style from "./change-group-information-modal.module.scss";
import CloseButton from "../close-button";
import { SetStateType } from "@/interface";

const ChangeGroupInformationModal = ({
  setOpenModal,
}: {
  setOpenModal: SetStateType<boolean>;
}) => {
  const groupNameId = useId();
  const descriptionId = useId();

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const closeModalOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenModal(false);
    };

    document.addEventListener("keyup", closeModalOnEsc);

    return () => document.removeEventListener("keyup", closeModalOnEsc);
  }, [setOpenModal]);

  return (
    <div className={style.modal}>
      <form autoComplete="off">
        <CloseButton onClick={handleCloseModal} stroke="#000" title="Close" />
        <div>
          <input
            id={groupNameId}
            type="text"
            autoFocus
            autoComplete="off"
            defaultValue={"Group"}
          />
          <label htmlFor={groupNameId}>Name</label>
        </div>
        {true && (
          <div>
            <textarea
              id={descriptionId}
              autoComplete="off"
              defaultValue=""
              placeholder="No Description"
              rows={8}
            />
            <label htmlFor={descriptionId}>Description</label>
          </div>
        )}
        <button type="submit">Confirm</button>
      </form>
      <div onClick={handleCloseModal} className="dark_overlay -z-1" />
    </div>
  );
};

export default ChangeGroupInformationModal;
