import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  const access_token = cookieStore.get("access_token");
  const refresh_token = cookieStore.get("refresh_token");

  if (access_token) {
    cookieStore.set("access_token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
  } else {
    return NextResponse.json(
      { message: "access_token not received" },
      { status: 500 }
    );
  }

  if (refresh_token) {
    cookieStore.set("refresh_token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
  }

  return NextResponse.json({ message: "success" }, { status: 200 });
}
