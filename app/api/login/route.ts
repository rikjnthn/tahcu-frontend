import axios, { isAxiosError } from "axios";

export async function POST(req: Request) {
  const loginData = await req.json();
  try {
    const { data, headers } = await axios.post(
      `${process.env.API_URL}/auth/login`,
      loginData
    );

    return Response.json(data, {
      headers: Object.entries(headers),
    });
  } catch (error) {
    if (!isAxiosError(error)) return;

    return Response.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}
