import axios, { isAxiosError } from "axios";

export async function POST(
  req: Request,
  { params }: { params: { contactId: string } }
) {
  try {
    const { data, headers } = await axios.post(
      `${process.env.API_URL}/private-chat/${params.contactId}`,
      null,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    return Response.json(data, { headers: Object.entries(headers) });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { contactId: string } }
) {
  try {
    const { data, headers } = await axios.delete(
      `${process.env.API_URL}/private-chat/${params.contactId}`,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    return Response.json(data, { headers: Object.entries(headers) });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
