import axios, { isAxiosError } from "axios";

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { data, headers } = await axios.get(
      `${process.env.API_URL}/group/${params.groupId}`,
      { headers: Object.fromEntries(req.headers) }
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

export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const updateData = await req.json();

  try {
    const { data, headers } = await axios.patch(
      `${process.env.API_URL}/group/update-group/${params.groupId}`,
      updateData,
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
  { params }: { params: { groupId: string } }
) {
  try {
    const { data, headers } = await axios.delete(
      `${process.env.API_URL}/group/${params.groupId}`,
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
