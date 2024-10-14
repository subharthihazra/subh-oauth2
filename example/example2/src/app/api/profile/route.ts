import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST() {
  const cookieStore = cookies();

  const access_token = cookieStore.get("access_token")?.value;

  if (!access_token) {
    return NextResponse.json(
      { message: "access_token not received" },
      { status: 400 }
    );
  }
  try {
    const response = await axios.get(process.env.PROFILE_INFO_URL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}
