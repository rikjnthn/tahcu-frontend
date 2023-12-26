import ChatContact from "../chat-contact";
import style from "./chat-contact.module.scss";

const ChatContactList = () => {
  return (
    <ul className={style.chat_contact_list}>
      <ChatContact to="t" message="lorem" name="John" unread={1} />
    </ul>
  );
};

export default ChatContactList;
