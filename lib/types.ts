import { z } from "zod";

export const OAuthClientSchema = z
  .object({
    clientId: z.string(),
    clientSecret: z.string().optional(),
    authorizationUrl: z.string().url(),
    tokenUrl: z.string(),
    redirect_uri: z.string(),
    scopes: z.array(z.string()),
    state: z.string(),
    response_type: z.enum(["code", "token"]).default("code"),
    grant_type: z.string().default("authorization_code"),
    pkce: z
      .object({
        code_challenge: z.string(),
        code_challenge_method: z.enum(["S256", "plain"]).default("S256"),
        code_verifier: z.string(),
      })
      .optional(),
    authorizationMethod: z.enum(["header", "body"]).default("body"),
    additionalParams: z.record(z.string()).optional(),
  })
  .transform((data) => ({
    ...data,
    response_type: data.response_type || "code",
    grant_type: data.grant_type || "authorization_code",
    authorizationMethod: data.authorizationMethod || "body",
    pkce: data.pkce
      ? {
          ...data.pkce,
          code_challenge_method: data.pkce?.code_challenge_method || "S256",
        }
      : null,
  }));

export type OAuthClient = z.infer<typeof OAuthClientSchema>;

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number().optional(),
  refresh_token: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
});

export type TokenResponse = z.infer<typeof TokenResponseSchema>;
