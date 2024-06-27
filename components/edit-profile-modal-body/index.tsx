"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";

import style from "./edit-profile-modal-body.module.scss";
import Input from "../input";
import SubmitButton from "../submit-button";
import { SetStateType, UserDataType, ErrorResponseType } from "@/interface";

const EditProfileModalBody = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const [editProfileErrorMessage, setEditProfileErrorMessage] =
    useState<string>("");

  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<UpdateUserDataType>();

  const { isPending, mutate } = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponseType>,
    UpdateUserDataType
  >({
    mutationKey: ["updateUserData"],
    mutationFn: (updateData) => axios.patch("api/users", updateData),
    retry: false,
  });

  const userData = queryClient.getQueryData<UserDataType>(["userData"]);

  const onSubmit = (data: UpdateUserDataType) => {
    const isDataSame =
      data.user_id === userData?.user_id &&
      data.username === userData?.username;

    setEditProfileErrorMessage("");

    if (isDataSame) {
      setIsOpenModal(false);
      return;
    }

    mutate(data, {
      onError(error) {
        const errorResponse = error.response?.data.error;
        if (errorResponse?.code === "DUPLICATE_VALUE") {
          setError("user_id", { message: errorResponse?.message.user_id });
          return;
        }

        if (errorResponse?.code === "VALIDATION_ERROR") {
          setError("user_id", { message: errorResponse?.message.user_id });
          setError("username", { message: errorResponse?.message.username });
          return;
        }

        setEditProfileErrorMessage("Failed to update profile");
      },
      async onSuccess() {
        await queryClient.refetchQueries({ queryKey: ["userData"] });
        setIsOpenModal(false);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.body}>
      <Input
        labelName="Username"
        errorMessage={errors.username?.message?.toString()}
        {...register("username", {
          required: {
            value: true,
            message: "Please enter the username",
          },
          minLength: {
            value: 4,
            message: "Username should contain a minimum of 4 letters",
          },
          value: userData?.username,
        })}
      />
      <Input
        labelName="User Id"
        errorMessage={errors.user_id?.message?.toString()}
        {...register("user_id", {
          required: {
            value: true,
            message: "Please enter the user id",
          },
          minLength: {
            value: 4,
            message: "User id should contain a minimum of 4 letters",
          },
          value: userData?.user_id,
        })}
      />

      {editProfileErrorMessage.length > 0 && (
        <em className={style.error_message}>{editProfileErrorMessage}</em>
      )}

      <SubmitButton name="Confirm" isLoading={isPending} />
    </form>
  );
};

export default EditProfileModalBody;

interface UpdateUserDataType {
  username?: string;
  user_id?: string;
}
