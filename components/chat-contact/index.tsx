import Link from "next/link";

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
  return (
    <li className={style.chat_contact}>
      <Link href={`a/chat/${to}`}>
        <PhotoProfile name={name} size="md" />

        <div className={style.name_message}>
          <span>{name}</span>
          <p>{message}</p>
        </div>

        {unread > 0 && <span>{unread}</span>}
      </Link>
    </li>
  );
};

export default ChatContact;
