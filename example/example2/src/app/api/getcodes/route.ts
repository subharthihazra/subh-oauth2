import { NextResponse } from "next/server";
import { setSession } from "@/lib/session";
import pkceChallenge from "pkce-challenge";
import { nanoid } from "nanoid";

export async function GET() {
  const myState = nanoid();

  const challenge = await pkceChallenge(50);

  const codes = {
    state: myState,
    codeVerifier: challenge.code_verifier,
    codeChallenge: challenge.code_challenge,
  };
  await setSession({ codes });

  return NextResponse.json(codes, { status: 200 });
}
