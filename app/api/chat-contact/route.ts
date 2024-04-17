import axios, { isAxiosError } from "axios";

export async function GET(req: Request) {
  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/private-chat`,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    return Response.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
