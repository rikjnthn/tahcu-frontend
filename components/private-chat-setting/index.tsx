import React from "react";
import { useParams, useRouter } from "next/navigation";
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
  const param = useParams<{ contact: string }>();

  const { privateChatIo } = useSocket();

  const { mutate } = useMutation({
    mutationKey: ["deleteContact", param.contact],
    mutationFn: async (contactId: string) =>
      axios.delete(`/api/chat-contact/${contactId}`),
  });

  const deleteChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    privateChatIo.emit("remove-room", { contact_id: param.contact });

    mutate(param.contact);
    setIsOpenSetting(false);
    router.push("/a");
  };
  return (
    <div className={style.setting}>
      <button onClick={deleteChat}>Delete</button>
    </div>
  );
};

export default PrivateChatSetting;
