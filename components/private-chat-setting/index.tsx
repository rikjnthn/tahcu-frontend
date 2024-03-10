import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import style from "./private-chat-setting.module.scss";
import { SetStateType } from "@/interface";
import { useParams } from "next/navigation";

const PrivateChatSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const param = useParams<{ contact: string }>();

  const { mutate } = useMutation({
    mutationKey: ["deleteContact", param.contact],
    mutationFn: async (contactId: string) =>
      axios.delete(`/api/chat-contact/${contactId}`, {
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "CSRF_TOKEN",
        xsrfHeaderName: "x-csrf-token",
      }),
  });

  const deleteChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate(param.contact);
    setIsOpenSetting(false);
  };
  return (
    <div className={style.setting}>
      <button onClick={deleteChat}>Delete</button>
    </div>
  );
};

export default PrivateChatSetting;
