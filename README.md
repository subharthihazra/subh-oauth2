# subh-oauth2
A Simple Oauth Client Library

## Installation
```
npm i subh-oauth2
```

## Specifications
This lib exposes these methods:
```
startAuthFlow(client: OAuthClient): string // Returns the authorization URL
handleCallback(client: OAuthClient, callbackParams: object): Promise<TokenResponse>
refreshToken(client: OAuthClient, refreshToken: string): Promise<TokenResponse>
```

# Client Side Usage
In client-side use, do NOT put `<client-secret>`, using PKCE is recommended.
Sample `OAuthClient` Setup:
```
client = {
    authorizationUrl: "", // Authorization URL
    clientId: "", // Client ID of Oauth provider
    scopes: ["scope1", "scope2", "scope3"], // Scopes
    tokenUrl: "", // URL fot receiving token from 'code'
    redirect_uri: "", // URL of your app where Oauth provider would redirect after login ( remember to put this is Oauth Provider Settings )
    state: "", // Ramdom string to be matched with parameter 'state' of callback URL
    pkce: {
        code_verifier: "", // generated code verifier
        code_challenge: "", // generated code challenge from code verifier
        code_challenge_method: "", // 'S256' or 'plain'
    }
};
```


# Implicit Flow
In client-side use, we can use implicit flow, where access_token is shared directly, but NOT recommended.
Sample `OAuthClient` Setup:
```
client = {
    authorizationUrl: "", // Authorization URL
    clientId: "", // Client ID of Oauth provider
    scopes: ["scope1", "scope2", "scope3"], // Scopes
    tokenUrl: "", // URL fot receiving token from 'code'
    redirect_uri: "", // URL of your app where Oauth provider would redirect after login ( remember to put this is Oauth Provider Settings )
    state: "", // Ramdom string to be matched with parameter 'state' of callback URL
    response_type: "token" // to get access_token directly
};
```


# Server Side Usage
In server-side use, we should put `<client-secret>`, store it properly in `ENV` so that it does NOT get exposed in public.
Sample `OAuthClient` Setup:
```
client = {
    authorizationUrl: "", // Authorization URL
    clientId: "", // Client ID of Oauth provider
    clientSecret: "", // Client Secret of Oauth provider
    scopes: ["scope1", "scope2", "scope3"], // Scopes
    tokenUrl: "", // URL fot receiving token from 'code'
    redirect_uri: "", // URL of your app where Oauth provider would redirect after login ( remember to put this is Oauth Provider Settings )
    state: "", // Ramdom string to be matched with parameter 'state' of callback URL
    pkce: {
        code_verifier: "", // generated code verifier
        code_challenge: "", // generated code challenge from code verifier
        code_challenge_method: "", // 'S256' or 'plain'
    }
};
```

# Lib Support
Workes with Auth0, Kinde Oauth Provider (Tested)

Workes on both Server and Client Side JS (Tested)

