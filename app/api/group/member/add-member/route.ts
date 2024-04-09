import axios, { isAxiosError } from "axios";

export async function PATCH(req: Request) {
  const addMembersData = await req.json();
  try {
    const { data, headers } = await axios.patch(
      `${process.env.API_URL}/group/add-members`,
      addMembersData,
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
