import axios, { isAxiosError } from "axios";

export async function DELETE(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  try {
    const { data } = await axios.delete(
      `${process.env.API_URL}/group/exit-group/${params.groupId}`,
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
