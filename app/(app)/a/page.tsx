import { redirect } from "next/navigation";

import { isTahcuTokenVerified } from "@/action/auth";

export default async function Page() {
  const isValid = await isTahcuTokenVerified();
  if (!isValid) redirect("/login");

  return null;
}
