import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import style from "./private-chat-setting.module.scss";
import { SetStateType } from "@/interface";
import { useSocket } from "@/context/socket-connection-context";

const PrivateChatSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { privateChatIo } = useSocket();

  const chatId = searchParams.get("chatId");

  const { mutate } = useMutation({
    mutationKey: ["deleteContact", chatId],
    mutationFn: async (contactId: string) =>
      axios.delete(`/api/chat-contact/${contactId}`),
  });

  const deleteChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    privateChatIo.emit("remove-room", { contact_id: chatId });

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
