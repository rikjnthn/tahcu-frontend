"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import style from "./add-new-contact-modal.module.scss";
import CloseButton from "../close-button";
import { SetStateType } from "@/interface";
import Input from "../input";
import SubmitButton from "../submit-button";

const AddNewContactModal = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { mutate, isPending, data } = useMutation({
    mutationKey: ["addContact"],
    mutationFn: (user_id?: string) =>
      axios.post(`api/chat-contact/${user_id}`, null, {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "CSRF_TOKEN",
        xsrfHeaderName: "x-csrf-token",
      }),
    retry: false,
  });

  const onSubmit = ({ user_id }: ContactInformationType) => {
    mutate(user_id, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.refetchQueries({ queryKey: ["contactList"] });
      },
    });
  };

  return (
    <div className={style.modal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <CloseButton
            onClick={() => setIsOpenModal(false)}
            stroke="#000"
            title="Close"
          />
          <span>Add New Contact</span>
        </header>

        <Input
          labelName="Name"
          errorMessage={errors.name?.message?.toString()}
          placeholder="Name"
          {...register("name", {
            required: {
              value: true,
              message: "Please enter contact name",
            },
          })}
        />

        <Input
          labelName="User Id"
          errorMessage={errors.user_id?.message?.toString()}
          placeholder="User id"
          {...register("user_id", {
            required: {
              value: true,
              message: "Please enter contact user id",
            },
            minLength: {
              value: 4,
              message: "User id should contain a minimum of 4 letters",
            },
          })}
        />

        <SubmitButton name="Add" isLoading={isPending} />
      </form>
    </div>
  );
};

export default AddNewContactModal;

interface ContactInformationType {
  name?: string;
  user_id?: string;
}
