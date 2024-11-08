"use client";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";

import style from "./change-group-information-modal.module.scss";
import CloseButton from "../close-button";
import { SetStateType, UpdateGroupDataType } from "@/interface";
import SubmitButton from "../submit-button";
import { useChatPage } from "@/context/chat-page-context";
import Modal from "@/components/modal";
import Input from "../input";
import { useDarkMode } from "@/context/dark-mode-context";
import { useURLHash } from "@/context/url-hash-context";

const ChangeGroupInformationModal = ({
  description,
  setIsOpenModal,
}: {
  description: string;
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateGroupDataType>();

  const { hash: chatId } = useURLHash();

  const { mutate, isPending } = useMutation<
    AxiosResponse,
    AxiosError,
    UpdateGroupDataType
  >({
    mutationKey: ["updateGroupInformation"],
    mutationFn: (updateData) => axios.patch(`/api/group/${chatId}`, updateData),
  });

  const { isDark } = useDarkMode();
  const { name } = useChatPage();
  const queryClient = useQueryClient();

  const handleCloseModal = () => setIsOpenModal(false);

  const onSubmit = (data: UpdateGroupDataType) => {
    const isDataSame = data.description === description && data.name === name;

    if (isDataSame) {
      setIsOpenModal(false);
      return;
    }

    mutate(data, {
      async onSuccess() {
        await queryClient.refetchQueries({ queryKey: ["group", chatId] });
        setIsOpenModal(false);
      },
    });
  };

  return (
    <Modal
      setIsOpenModal={setIsOpenModal}
      onClick={(e) => {
        if (e.currentTarget === e.target) setIsOpenModal(false);
      }}
    >
      <form
        className={style.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <CloseButton
          onClick={handleCloseModal}
          stroke={isDark ? "#ffffff" : "#000000"}
          title="Close"
        />

        <Input
          labelName="Name"
          error={errors.name?.message?.toString()}
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
            id={"description"}
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
          <label htmlFor={"description"}>Description</label>
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
