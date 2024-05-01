import axios, { isAxiosError } from "axios";

export async function PATCH(req: Request) {
  const changePasswordData = await req.json();

  try {
    const { data, headers, status } = await axios.patch(
      `${process.env.API_URL}/users/change-password`,
      changePasswordData,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    return Response.json(data, {
      headers: Object.entries(headers),
      status: status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
