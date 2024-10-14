import {
  OAuthClient,
  OAuthClientSchema,
  TokenResponse,
  TokenResponseSchema,
} from "./types";

export function validateOAuthClient(config: OAuthClient): OAuthClient {
  const parsed = OAuthClientSchema.safeParse(config);
  if (!parsed.success) {
    throw new Error(
      `Invalid OAuthClient configuration: ${parsed.error.message}`
    );
  }
  return parsed.data;
}

export function validateTokenResponse(response: any): TokenResponse {
  const parsed = TokenResponseSchema.safeParse(response);
  if (!parsed.success) {
    throw new Error(`Invalid TokenResponse: ${parsed.error.message}`);
  }
  return parsed.data;
}

export function buildUrl(base: string, params: Record<string, string>): string {
  const url = new URL(base);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}
