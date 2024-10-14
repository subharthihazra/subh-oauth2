import { OAuthClient } from "./types";
import { validateOAuthClient, buildUrl } from "./utils";

export function startAuthFlow(client: OAuthClient): string {
  const validatedClient = validateOAuthClient(client);
  let params: Record<string, string> = {
    client_id: validatedClient.clientId,
    redirect_uri: validatedClient.redirect_uri,
    scope: validatedClient.scopes.join(" "),
    state: validatedClient.state,
    response_type: validatedClient.response_type,
    ...validatedClient.additionalParams,
  };
  if (validatedClient.clientSecret) {
    params.client_secret = validatedClient.clientSecret;
  }
  if (validatedClient.pkce) {
    params.code_challenge = validatedClient.pkce.code_challenge;
    params.code_challenge_method = validatedClient.pkce.code_challenge_method;
  }
  return buildUrl(client.authorizationUrl, params);
}
