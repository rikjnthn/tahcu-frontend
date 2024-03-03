import axios, { isAxiosError } from "axios";

export async function GET(req: Request) {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/group`, {
      headers: Object.fromEntries(req.headers),
    });

    return Response.json(data);
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
  console.log(groupData);
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/group`,
      groupData,
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
