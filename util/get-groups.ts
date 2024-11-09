import axios from "axios";

import { GroupType } from "@/interface";

export default async function getGroups(): Promise<GroupType[]> {
  const { data } = await axios.get<GroupType[]>("/api/group");
  return data;
}
