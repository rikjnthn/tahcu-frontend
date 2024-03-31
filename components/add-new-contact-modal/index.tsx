"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import style from "./add-new-contact-modal.module.scss";
import CloseButton from "../close-button";
import { ContactType, SetStateType } from "@/interface";
import Input from "../input";
import SubmitButton from "../submit-button";
import { useSocket } from "@/context/socket-connection-context";
import { useHomePageDispatch } from "@/context/home-page-context";
import Modal from "@/components/modal";

const AddNewContactModal = ({
  setIsOpenModal,
}: {
  setIsOpenModal: SetStateType<boolean>;
}) => {
  const { privateChatIo } = useSocket();
  const dispatch = useHomePageDispatch();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { data, mutate, isPending } = useMutation({
    mutationKey: ["addContact"],
    mutationFn: async (user_id?: string) =>
      axios.post<ContactType>(`api/chat-contact/${user_id}`),
    retry: false,
  });

  const onSubmit = ({ user_id }: ContactInformationType) => {
    mutate(user_id, {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ["contactList"] });
        privateChatIo.emit("join-room", { contact_ids: [data?.data.id] });
        setIsOpenModal(false);
        dispatch({ type: "SET_OPEN_CHAT_CONTACT" });
      },
    });
  };

  return (
    <Modal>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <header className={style.header}>
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
    </Modal>
  );
};

export default AddNewContactModal;

interface ContactInformationType {
  name?: string;
  user_id?: string;
}
