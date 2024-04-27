import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import style from "./private-chat-setting.module.scss";
import { SetStateType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";
import { useURLHash } from "@/context/url-hash-context";

const PrivateChatSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const router = useRouter();
  const { hash: chatId } = useURLHash();
  const messageIo = useSocket();

  const { mutate } = useMutation({
    mutationKey: ["deleteContact", chatId],
    mutationFn: async (contactId: string) =>
      axios.delete(`/api/chat-contact/${contactId}`),
  });

  const deleteChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    messageIo.emit("remove-room", { id: chatId });

    mutate(chatId ?? "");
    setIsOpenSetting(false);
    router.push("/a");
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
