import axios, { isAxiosError } from "axios";

export async function GET(req: Request) {
  try {
    const { data, status } = await axios.get(`${process.env.API_URL}/group`, {
      headers: Object.fromEntries(req.headers),
    });

    return Response.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}

export async function POST(req: Request) {
  const groupData = await req.json();
  try {
    const { data, headers, status } = await axios.post(
      `${process.env.API_URL}/group`,
      groupData,
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
