import axios, { isAxiosError } from "axios";

export async function POST(req: Request) {
  const sendResetPwOtpData = await req.json();

  try {
    const { status } = await axios.post(
      `${process.env.API_URL}/auth/send-reset-password-otp`,
      sendResetPwOtpData
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
