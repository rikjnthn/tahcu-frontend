"use client";

import { useEffect, useRef } from "react";

import style from "./send-message-place.module.scss";
import TextTyping from "../text-typing";
import { SetStateType } from "@/interface";
import CloseButton from "../close-button";

const SendMessagePlace = ({
  isEditMessage,
  setIsEditMessage,
  setMessageObject,
  messageObject,
}: {
  isEditMessage: boolean;
  setIsEditMessage: SetStateType<boolean>;
  setMessageObject: SetStateType<any>;
  messageObject: any;
}) => {
  const sendMassagePlaceRef = useRef<HTMLDivElement>(null);
  const textTypingRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textTypingRef.current && sendMassagePlaceRef.current) {
      textTypingRef.current.style.height = "0";
      sendMassagePlaceRef.current.style.height = "0";

      const { scrollHeight } = textTypingRef.current;

      textTypingRef.current.style.height = `${scrollHeight}px`;
      sendMassagePlaceRef.current.style.height = `${28 + scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (isEditMessage) textTypingRef.current?.focus();
  }, [isEditMessage]);

  return (
    <div>
      {isEditMessage && (
        <div className={style.message_to_edit}>
          <div>
            <span>Editting</span>
            <span>{messageObject.message}</span>
          </div>
          <div>
            <CloseButton
              onClick={() => setIsEditMessage(false)}
              stroke="#000"
            />
          </div>
        </div>
      )}
      <div ref={sendMassagePlaceRef} className={style.send_message_place}>
        <TextTyping
          messageObject={messageObject}
          setMessageObject={setMessageObject}
          isEditMessage={isEditMessage}
          setIsEditMessage={setIsEditMessage}
          onInput={handleInput}
          ref={textTypingRef}
        />
      </div>
    </div>
  );
};

export default SendMessagePlace;
