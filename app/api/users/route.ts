import axios, { isAxiosError } from "axios";

export async function GET(req: Request) {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/users`, {
      headers: Object.fromEntries(req.headers),
    });

    return Response.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error, { status: error.response?.status });
    }
  }
}
