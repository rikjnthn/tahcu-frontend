import axios from "axios";

import { ContactType } from "@/interface";

export default async function getContacts(): Promise<ContactType[]> {
  const { data } = await axios.get<ContactType[]>("/api/chat-contact");

  return data;
}
