import { OAuthClient } from "subh-oauth2/dist/types";

export const generateClient = ({ myState, codeChallenge, codeVerifier }) => {
  let client: any = {
    authorizationUrl: process.env.NEXT_PUBLIC_OAUTH_URL,
    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    scopes: ["offline"],
    tokenUrl: process.env.NEXT_PUBLIC_TOKEN_URL,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    state: myState || "",
  };
  if (codeChallenge && codeVerifier) {
    client.pkce = {
      code_challenge: codeChallenge,
      code_verifier: codeVerifier,
    };
  }

  return client;
};

export const generateClientInServer = (
  { myState, codeChallenge, codeVerifier } = {
    myState: null,
    codeChallenge: null,
    codeVerifier: null,
  }
) => {
  let client: any = {
    authorizationUrl: process.env.NEXT_PUBLIC_OAUTH_URL,
    clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    scopes: ["offline"],
    tokenUrl: process.env.NEXT_PUBLIC_TOKEN_URL,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
    state: myState || "",
  };
  if (codeChallenge && codeVerifier) {
    client.pkce = {
      code_challenge: codeChallenge,
      code_verifier: codeVerifier,
    };
  }

  return client;
};
