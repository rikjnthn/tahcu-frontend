import axios, { isAxiosError } from "axios";

export async function POST(
  req: Request,
  { params }: { params: { contactId: string } }
) {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/private-chat/${params.contactId}`,
      null,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    return Response.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
