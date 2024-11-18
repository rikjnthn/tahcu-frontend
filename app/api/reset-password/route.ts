import axios, { isAxiosError } from "axios";

export async function POST(req: Request) {
  const resetPwData = await req.json();

  try {
    const { status, headers } = await axios.post(
      `${process.env.API_URL}/auth/reset-password`,
      resetPwData
    );

    return Response.json(null, { headers: Object.entries(headers), status });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
