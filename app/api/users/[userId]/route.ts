import axios, { isAxiosError } from "axios";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { data, status } = await axios.get(
      `${process.env.API_URL}/users/${params.userId}`,
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
