import axios, { isAxiosError } from "axios";

export async function GET(req: Request) {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/users`, {
      headers: Object.fromEntries(req.headers),
    });

    return Response.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error, { status: error.response?.status });
    }
  }
}

export async function PATCH(req: Request) {
  const updateData = await req.json();
  try {
    const { data } = await axios.patch(
      `${process.env.API_URL}/users`,
      updateData,
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
