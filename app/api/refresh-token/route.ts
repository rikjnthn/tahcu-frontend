import axios, { isAxiosError } from "axios";

export async function POST(req: Request) {
  try {
    const { headers, status } = await axios.post(
      `${process.env.API_URL}/auth/refresh-token`,
      {
        headers: Object.fromEntries(req.headers),
      }
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
