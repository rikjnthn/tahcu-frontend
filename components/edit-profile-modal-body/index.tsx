"use client";

import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";

import style from "./edit-profile-modal-body.module.scss";
import Input from "../input";
import SubmitButton from "../submit-button";
import { SetStateType, UserDataType } from "@/interface";

const EditProfileModalBody = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    clearErrors,
  } = useForm<UpdateUserDataType>();

  const { isPending, isError, mutate } = useMutation({
    mutationKey: ["updateUserData"],
    mutationFn: (newData: UpdateUserDataType) =>
      axios.patch<any, AxiosResponse<UpdateUserDataType>>(
        "api/users",
        newData,
        {
          withCredentials: true,
          withXSRFToken: true,
          xsrfCookieName: "CSRF_TOKEN",
          xsrfHeaderName: "x-csrf-token",
        }
      ),
    retry: false,
  });

  const userData = queryClient.getQueryData<unknown, string[], UserDataType>([
    "userData",
  ]);

  useEffect(() => {
    setValue("username", userData?.username);
    setValue("user_id", userData?.user_id);
    setValue("email", userData?.email);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isError) {
      clearErrors();
      return;
    }

    setError("username", { message: "username error" });
    setError("user_id", { message: "user id error" });
    setError("email", { message: "email error" });
  }, [isError, setError, clearErrors]);

  const onSubmit = (data: UpdateUserDataType) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["userData"] });
        setIsOpenModal(false);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.body}>
      <Input
        errorMessage={errors.username?.message?.toString()}
        labelName="Username"
        {...register("username", {
          required: true,
          minLength: 4,
        })}
      />
      <Input
        errorMessage={errors.user_id?.message?.toString()}
        labelName="User Id"
        {...register("user_id", {
          required: true,
        })}
      />
      <Input
        errorMessage={errors.email?.message?.toString()}
        labelName="Email"
        {...register("email", {
          required: true,
          validate: {
            isEmail: (v?: string) => {
              const domain = v?.split("@")[1];
              return domain === "gmail.com";
            },
          },
        })}
      />

      <SubmitButton name="Confirm" isLoading={isPending} />
    </form>
  );
};

export default EditProfileModalBody;

interface UpdateUserDataType {
  username?: string;
  user_id?: string;
  email?: string;
}
