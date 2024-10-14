export const generateClient = ({ myState, codeChallenge, codeVerifier }) => {
  let client = {
    authorizationUrl: process.env.REACT_APP_OAUTH_URL,
    clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
    scopes: ["offline"],
    tokenUrl: process.env.REACT_APP_TOKEN_URL,
    redirect_uri: process.env.REACT_APP_REDIRECT_URL,
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
