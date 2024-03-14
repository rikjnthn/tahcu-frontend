import axios, { isAxiosError } from "axios";

export async function PATCH(req: Request) {
  const deleteMembersData = await req.json();

  try {
    const { data } = await axios.patch(
      `${process.env.API_URL}/group/delete-members`,
      deleteMembersData,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    return Response.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
