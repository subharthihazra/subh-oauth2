import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateClientInServer } from "@/lib/utls";
import { refreshToken } from "subh-oauth2";

export async function POST() {
  const cookieStore = cookies();

  const refresh_token: any = cookieStore.get("refresh_token")?.value;
//   console.log("refresh_token", refresh_token);

  const client = generateClientInServer();

  if (!refresh_token) {
    return NextResponse.json(
      { message: "refresh_token not found" },
      { status: 400 }
    );
  }
  const tokenResponse = await refreshToken(client, refresh_token);

  if (tokenResponse.access_token) {
    cookieStore.set("access_token", tokenResponse.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: tokenResponse.expires_in,
      path: "/",
    });
  } else {
    return NextResponse.json(
      { message: "access_token not received" },
      { status: 500 }
    );
  }

  if (refresh_token) {
    cookieStore.set("refresh_token", tokenResponse.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: tokenResponse.expires_in,
      path: "/",
    });
  }

  return NextResponse.json({ message: "success" }, { status: 200 });
}
