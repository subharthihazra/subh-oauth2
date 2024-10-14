import axios from "axios";
import { OAuthClient, TokenResponse } from "./types";
import { validateOAuthClient, validateTokenResponse } from "./utils";

export async function handleCallback(
  client: OAuthClient,
  callbackParams: Record<string, string>
): Promise<TokenResponse> {
  const { code, state } = callbackParams;

  if (!code) {
    throw new Error("Missing code in callback parameters.");
  }

  if (!state) {
    throw new Error("Missing state in callback parameters.");
  }

  const validatedClient = validateOAuthClient(client);

  if (state !== validatedClient.state) {
    throw new Error("state did not match.");
  }

  let payload: Record<string, string> = {
    grant_type: validatedClient.grant_type,
    redirect_uri: validatedClient.redirect_uri,
    code,
  };
  if (validatedClient.authorizationMethod === "body") {
    payload.client_id = validatedClient.clientId;
    if (validatedClient.clientSecret) {
      payload.client_secret = validatedClient.clientSecret;
    }
  }
  if (validatedClient.additionalParams?.code_verifier) {
    payload.code_verifier = validatedClient.additionalParams?.code_verifier;
  }
  if (validatedClient.pkce) {
    payload.code_verifier = validatedClient.pkce.code_verifier;
  }
  console.log("uu-", payload);

  let reqHeaders: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (
    validatedClient.authorizationMethod === "header" &&
    validatedClient.clientId &&
    validatedClient.clientSecret
  ) {
    reqHeaders.Authorization = `Basic ${Buffer.from(
      `${validatedClient.clientId}:${validatedClient.clientSecret}`
    ).toString("base64")}`;
  }

  const tokenResponse = await axios.post(
    validatedClient.tokenUrl,
    new URLSearchParams(payload).toString(),
    {
      headers: reqHeaders,
    }
  );

  const validatedToken = validateTokenResponse(tokenResponse.data);
  return validatedToken;
}
