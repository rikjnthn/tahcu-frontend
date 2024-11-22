import axios from "axios";

import { UserDataType } from "@/interface";

export default async function getUserData(): Promise<UserDataType> {
  if (typeof localStorage !== "undefined") {
    const cacheUser = localStorage.getItem("user");

    if (cacheUser) return JSON.parse(cacheUser);
  }

  const { data } = await axios.get<UserDataType>("/api/users");

  if (typeof localStorage !== "undefined") {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
}
