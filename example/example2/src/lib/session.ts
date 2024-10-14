// src/lib/session.ts
import { cookies } from "next/headers";
import { sealData, unsealData } from "iron-session";

// Define your session data structure
export interface SessionData {
  codes: {
    state: string;
    codeVerifier: string;
    codeChallenge: string;
  };
}

const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: "example2_session",
  ttl: 60 * 60 * 24 * 7, // 1 week
};

export async function getSession(): Promise<
  SessionData | Record<string, string>
> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(sessionOptions.cookieName);

  if (sessionCookie) {
    try {
      return await unsealData<SessionData>(sessionCookie.value, sessionOptions);
    } catch {
      // If unseal fails, return an empty session
      return {};
    }
  }

  return {};
}

export async function setSession(data: SessionData): Promise<void> {
  const cookieStore = cookies();
  const sealedData = await sealData(data, sessionOptions);

  cookieStore.set(sessionOptions.cookieName, sealedData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: sessionOptions.ttl,
    path: "/",
  });
}
