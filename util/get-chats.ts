import axios from "axios";

import { ChatType, ContactType, GroupWithMembershipType } from "@/interface";

export default async function getChats(): Promise<ChatType[]> {
  const contactsReq = axios.get<ContactType[]>("/api/chat-contact");
  const groupsReq = axios.get<GroupWithMembershipType[]>("/api/group");

  const data = await Promise.all([contactsReq, groupsReq]);

  const contacts = data[0].data.map((contact) => {
    return {
      ...contact,
      type: "Contact" as const,
    };
  });

  const groups = data[1].data.map((contact) => {
    return {
      ...contact,
      type: "Group" as const,
    };
  });

  return [...contacts, ...groups];
}
