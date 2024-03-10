import axios, { isAxiosError } from "axios";

export async function PATCH(req: Request) {
  const updateMembers = await req.json();

  try {
    const { data } = await axios.patch(
      `${process.env.API_URL}/`,
      updateMembers,
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
