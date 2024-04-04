"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import PhotoProfile from "../photo-profile";
import style from "./chat-contact.module.scss";

const ChatContact = ({
  to,
  name,
  message,
  unread,
}: {
  to: string;
  name: string;
  message: string;
  unread: number;
}) => {
  const path = usePathname();

  const contactId = path.split("/")[3];

  const isOpen = contactId === to;

  return (
    <li
      className={`${style.chat_contact} ${isOpen ? style.open_link : ""}`}
      title={name}
    >
      <Link href={`/a/chat/${to}`}>
        <PhotoProfile name={name} size="md" />

        <div className={style.name_message}>
          <span className={style.contact_name}>{name}</span>
          <p className={style.message_snippet}>{message}</p>
        </div>

        {unread > 0 && <span>{unread}</span>}
      </Link>
    </li>
  );
};

export default ChatContact;
