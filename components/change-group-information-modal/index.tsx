"use client";
import React, { useEffect, useId } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import style from "./change-group-information-modal.module.scss";
import CloseButton from "../close-button";
import { SetStateType } from "@/interface";
import { useForm } from "react-hook-form";
import SubmitButton from "../submit-button";
import { useChatPage } from "@/context/chat-page-context";
import Modal from "@/components/modal";
import Input from "../input";

const ChangeGroupInformationModal = ({
  description,
  setIsOpenModal,
}: {
  description: string;
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const descriptionId = useId();

  const { contact } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateGroupInformation"],
    mutationFn: (updateData) =>
      axios.patch(`/api/group/${contact}`, updateData),
  });

  useEffect(() => {
    const closeModalOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpenModal(false);
    };

    document.addEventListener("keyup", closeModalOnEsc);

    return () => document.removeEventListener("keyup", closeModalOnEsc);
  }, [setIsOpenModal]);

  const { name } = useChatPage();
  const queryClient = useQueryClient();

  const handleCloseModal = () => setIsOpenModal(false);

  const onSubmit = (updateData: any) => {
    mutate(updateData, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["group"] });
        setIsOpenModal(false);
      },
    });
  };

  return (
    <Modal
      onClick={(e) => {
        if (e.currentTarget === e.target) setIsOpenModal(false);
      }}
    >
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <CloseButton onClick={handleCloseModal} stroke="#000" title="Close" />

        <Input
          labelName="Name"
          errorMessage={errors.name?.message?.toString()}
          {...register("name", {
            required: {
              value: true,
              message: "Please enter your group name",
            },
            maxLength: {
              value: 30,
              message: "Group name too long",
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
            aria-invalid={!!errors.description?.message?.toString()}
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
        <SubmitButton
          className={style.submit}
          name="Confirm"
          isLoading={isPending}
          title="Confirm"
        />
      </form>
    </Modal>
  );
};

export default ChangeGroupInformationModal;
