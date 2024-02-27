import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/private-chat`, {
      headers: Object.fromEntries(req.headers),
    });

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
