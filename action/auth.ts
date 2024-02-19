"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function isTahcuTokenVerified(): Promise<boolean> {
  const tahcuAuth = cookies().get("tahcu_auth")?.value;

  if (!tahcuAuth) return false;

  try {
    const { data: isValid } = await axios.get(
      `${process.env.API_URL}/auth/verify-tahcu-token/${tahcuAuth}`
    );

    return isValid;
  } catch {
    return false;
  }
}
