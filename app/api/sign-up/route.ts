import axios, { isAxiosError } from "axios";

export async function POST(req: Request) {
  const signUpData = await req.json();

  try {
    const { data, headers } = await axios.post(
      "http://localhost:3001/auth/sign-up",
      {
        ...signUpData,
        is_active: true,
      }
    );

    const newHeader = headers as HeadersInit;

    const response = new Response(JSON.stringify(data), {
      headers: newHeader,
    });
    return response;
  } catch (error) {
    if (!isAxiosError(error)) return;

    return Response.json(error.response?.data, { status: 400 });
  }
}
