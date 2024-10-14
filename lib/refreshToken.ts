import axios from "axios";
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

  const tokenResponse = await axios.post(
    validatedClient.tokenUrl,
    new URLSearchParams(payload).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const validatedToken = validateTokenResponse(tokenResponse.data);
  return validatedToken;
}
