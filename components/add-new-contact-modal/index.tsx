"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import style from "./add-new-contact-modal.module.scss";
import CloseButton from "../close-button";
import { ContactType, ErrorResponseType, SetStateType } from "@/interface";
import Input from "../input";
import SubmitButton from "../submit-button";
import { useSocket } from "@/context/socket-connection-context";
import { useHomePageDispatch } from "@/context/home-page-context";
import Modal from "@/components/modal";
import { useDarkMode } from "@/context/dark-mode-context";

const AddNewContactModal = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const [addContactErrorMessage, setAddContactErrorMessage] =
    useState<string>("");

  const { isDark } = useDarkMode();
  const messageIo = useSocket();
  const dispatch = useHomePageDispatch();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ContactInformationType>();

  const { data, mutate, isPending } = useMutation<
    AxiosResponse<ContactType>,
    AxiosError<ErrorResponseType>,
    string
  >({
    mutationKey: ["addContact"],
    mutationFn: async (user_id?: string) =>
      axios.post(`api/chat-contact/${user_id}`),
    retry: false,
  });

  const contacts = queryClient.getQueryData<ContactType[]>(["contactList"]);

  const onSubmit = ({ user_id }: ContactInformationType) => {
    const contactFound = contacts?.find((val) => {
      return val.friends_id === user_id || val.user_id === user_id;
    });

    if (contactFound) {
      setError("user_id", { message: "Contact has already exists" });

      return;
    }

    if (!user_id) return;

    mutate(user_id, {
      onError(error) {
        if (error.response?.data.error.code === "VALIDATION_ERROR") {
          setError("user_id", {
            message: error.response.data.error.message.user_id,
          });
          return;
        }
        if (error.response?.data.error.code === "DUPLICATE_VALUE") {
          setError("user_id", { message: "Contact has already exists" });
          return;
        }
        if (error.response?.data.error.code === "NOT_FOUND") {
          setError("user_id", { message: "User id not found" });
          return;
        }

        setAddContactErrorMessage("Failed to add contact");
      },

      async onSuccess() {
        await queryClient.refetchQueries({ queryKey: ["contactList"] });

        messageIo.emit("join-room", { ids: [data?.data.id] });

        setIsOpenModal(false);
        dispatch({ type: "SET_OPEN_CHAT_CONTACT" });
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
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <header className={style.header}>
          <CloseButton
            onClick={() => setIsOpenModal(false)}
            stroke={isDark ? "#ffffff" : "#000000"}
            title="Close"
          />
          <span>Add New Contact</span>
        </header>

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

        {addContactErrorMessage.length > 0 && (
          <em className={style.error_message}>{addContactErrorMessage}</em>
        )}

        <SubmitButton name="Add" isLoading={isPending} title="Add contact" />
      </form>
    </Modal>
  );
};

export default AddNewContactModal;

interface ContactInformationType {
  user_id?: string;
}
