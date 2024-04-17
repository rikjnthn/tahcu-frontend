import axios, { isAxiosError } from "axios";

export async function PATCH(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  const exitGroupData = await req.json();

  try {
    const { data, headers, status } = await axios.patch(
      `${process.env.API_URL}/group/exit-group/${params.groupId}`,
      exitGroupData,
      {
        headers: Object.fromEntries(req.headers),
      }
    );
    return Response.json(data, { headers: Object.entries(headers), status });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
