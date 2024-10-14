import { OAuthClient, TokenResponse } from "./types";
import { validateOAuthClient, validateTokenResponse } from "./utils";

export async function refreshToken(
  client: OAuthClient,
  refreshToken: string
): Promise<TokenResponse> {
  const validatedClient = validateOAuthClient(client);

  let payload: Record<string, string> = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: validatedClient.clientId,
  };

  if (validatedClient.clientSecret) {
    payload.client_secret = validatedClient.clientSecret;
  }

  const response = await fetch(validatedClient.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(payload).toString(),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const tokenResponse = await response.json();

  const validatedToken = validateTokenResponse(tokenResponse);
  return validatedToken;
}
