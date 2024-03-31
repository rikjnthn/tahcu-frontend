import React from "react";

import style from "./chat-setting.module.scss";
import { SetStateType } from "@/interface";
import PrivateChatSetting from "../private-chat-setting";
import GroupSetting from "../group-setting";
import { useChatPage } from "@/context/chat-page-context";

const ChatSetting = ({
  setIsOpenSetting,
}: {
  setIsOpenSetting: SetStateType<boolean>;
}) => {
  const { isGroup } = useChatPage();

  const closeChatSetting = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpenSetting(false);
  };

  return (
    <div>
      {isGroup ? (
        <GroupSetting setIsOpenSetting={setIsOpenSetting} />
      ) : (
        <PrivateChatSetting setIsOpenSetting={setIsOpenSetting} />
      )}

      <div onClick={closeChatSetting} className={style.overlay}></div>
    </div>
  );
};

export default ChatSetting;
