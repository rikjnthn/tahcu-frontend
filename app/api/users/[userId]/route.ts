import axios, { isAxiosError } from "axios";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/users/${params.userId}`,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    return Response.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }

    return Response.json("");
  }
}
