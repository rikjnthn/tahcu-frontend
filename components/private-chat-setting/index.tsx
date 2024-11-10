import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import style from "./private-chat-setting.module.scss";
import { ContactType, SetStateType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import { useURLHash } from "@/context/url-hash-context";

const PrivateChatSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const router = useRouter();
  const { hash: chatId, setHash } = useURLHash();
  const messageIo = useSocket();

  const queryClient = useQueryClient();

  const { mutate } = useMutation<AxiosResponse, AxiosError, string>({
    mutationKey: ["deleteContact", chatId],
    mutationFn: async (contactId) =>
      axios.delete(`/api/chat-contact/${contactId}`),
    onSuccess() {
      queryClient.setQueryData<ContactType[]>(["contacts"], (prevContacts) => {
        if (!prevContacts) return [];

        return prevContacts.filter((contact) => contact.id !== chatId);
      });

      setHash("");
      router.push("/a");
    },
  });

  const deleteChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    messageIo.emit("remove-room", { id: chatId });

    if (chatId) mutate(chatId);

    setIsOpenSetting(false);
  };
  return (
    <div className={style.setting}>
      <button onClick={deleteChat} title="Delete chat">
        Delete
      </button>
    </div>
  );
};

export default PrivateChatSetting;
