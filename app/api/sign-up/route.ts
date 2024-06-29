import axios, { isAxiosError } from "axios";

export async function POST(req: Request) {
  const signUpData = await req.json();

  try {
    const { data, headers, status } = await axios.post(
      `${process.env.API_URL}/auth/sign-up`,
      signUpData
    );

    return Response.json(data, { headers: Object.entries(headers), status });
  } catch (error) {
    if (!isAxiosError(error)) return;

    return Response.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}
