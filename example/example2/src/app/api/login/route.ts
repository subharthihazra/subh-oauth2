import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { handleCallback } from "subh-oauth2";
import { generateClientInServer } from "@/lib/utls";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();

  const { code, state } = await request.json();

  if (!code || !state) {
    return NextResponse.json(
      { message: "Code or State not found" },
      { status: 400 }
    );
  }

  const session = await getSession();
  console.log(session.codes);

  if (!session.codes) {
    return NextResponse.json({ message: "Session not found" }, { status: 404 });
  }

  const { state: myState, codeVerifier, codeChallenge }: any = session.codes;

  const client = generateClientInServer({
    myState,
    codeVerifier,
    codeChallenge,
  });

  const tokenResponse = await handleCallback(client, { state, code });

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

  if (tokenResponse.refresh_token) {
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
