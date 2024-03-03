"use client";
import React, { useEffect, useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import style from "./change-group-information-modal.module.scss";
import CloseButton from "../close-button";
import { SetStateType } from "@/interface";
import Input from "../input";
import { useForm } from "react-hook-form";
import SubmitButton from "../submit-button";

const ChangeGroupInformationModal = ({
  name,
  description,
  setIsOpenModal,
}: {
  name: string;
  description: string;
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const descriptionId = useId();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ reValidateMode: "onChange" });

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateGroupInformation"],
    mutationFn: (updateData) =>
      axios.patch("api/group", updateData, {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "CSRF_TOKEN",
        xsrfHeaderName: "x-csrf-token",
      }),
  });

  useEffect(() => {
    const closeModalOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpenModal(false);
    };

    document.addEventListener("keyup", closeModalOnEsc);

    return () => document.removeEventListener("keyup", closeModalOnEsc);
  }, [setIsOpenModal]);

  const queryClient = useQueryClient();

  const handleCloseModal = () => setIsOpenModal(false);

  const onSubmit = (updateData: any) => {
    mutate(updateData, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["groupInformation"] });
        setIsOpenModal(false);
      },
    });
  };
  return (
    <div className={style.modal}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CloseButton onClick={handleCloseModal} stroke="#000" title="Close" />
        <Input
          labelName="Name"
          errorMessage={errors.name?.message?.toString()}
          {...register("name", {
            required: {
              value: true,
              message: "Please enter your group name",
            },
            value: name,
          })}
        />
        <div>
          <textarea
            id={descriptionId}
            autoComplete="off"
            placeholder="No Description"
            rows={8}
            aria-invalid={!errors.description?.message?.toString()}
            {...register("description", {
              maxLength: {
                value: 600,
                message: "Maximum character exceeded (600)",
              },
              value: description,
            })}
          />
          <label htmlFor={descriptionId}>Description</label>
        </div>
        <SubmitButton name="Confirm" isLoading={isPending} />
      </form>
      <div onClick={handleCloseModal} className="dark_overlay -z-1" />
    </div>
  );
};

export default ChangeGroupInformationModal;
