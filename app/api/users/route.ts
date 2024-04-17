import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const { data, status } = await axios.get(`${process.env.API_URL}/users`, {
      headers: Object.fromEntries(req.headers),
    });

    return Response.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error, { status: error.response?.status });
    }
  }
}

export async function PATCH(req: Request) {
  const updateData = await req.json();
  try {
    const { data, headers, status } = await axios.patch(
      `${process.env.API_URL}/users`,
      updateData,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    return Response.json(data, {
      headers: Object.entries(headers),
      status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { data, status } = await axios.delete(
      `${process.env.API_URL}/users`,
      {
        headers: Object.fromEntries(req.headers),
      }
    );

    const cookie = cookies();
    cookie.delete("CSRF_TOKEN");
    cookie.delete("tahcu_auth");

    return Response.json(data, { status });
  } catch (error) {
    if (isAxiosError(error)) {
      return Response.json(error.response?.data, {
        status: error.response?.status,
      });
    }
  }
}
