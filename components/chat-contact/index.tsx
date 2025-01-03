"use client";
import Link from "next/link";
import clsx from "clsx";

import PhotoProfile from "../photo-profile";
import style from "./chat-contact.module.scss";
import { useURLHash } from "@/context/url-hash-context";

const ChatContact = ({ to, name, message, unread }: ChatContactPropsType) => {
  const { hash, setHash } = useURLHash();

  const isOpen = hash === to;

  return (
    <li
      className={clsx(style.chat_contact, isOpen && style.open_link)}
      title={name}
    >
      <Link onClick={() => setHash(to)} href={{ pathname: "/a", hash: to }}>
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

interface ChatContactPropsType {
  to: string;
  name: string;
  message: string;
  unread: number;
}
