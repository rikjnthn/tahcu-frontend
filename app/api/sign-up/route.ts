import axios, { isAxiosError } from "axios";

export async function POST(req: Request) {
  const signUpData = await req.json();

  try {
    const { data, headers } = await axios.post(
      `${process.env.API_URL}/auth/sign-up`,
      {
        ...signUpData,
        is_active: true,
      }
    );

    const response = new Response(data, {
      headers: Object.entries(headers),
    });
    return response;
  } catch (error) {
    if (!isAxiosError(error)) return;

    return Response.json(error.response?.data, {
      status: error.response?.status,
    });
  }
}
