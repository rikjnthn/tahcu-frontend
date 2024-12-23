import axios, { isAxiosError } from "axios";

export async function POST(req: Request) {
  const sendOtpData = await req.json();

  try {
    const { status } = await axios.post(
      `${process.env.API_URL}/auth/send-otp`,
      sendOtpData
    );

    return Response.json(null, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
