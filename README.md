# subh-oauth2
A Simple Oauth Client Library

## Installation
```
npm i subh-oauth2
```

## Specifications
This lib exposes these methods:
```js
startAuthFlow(client: OAuthClient): string // Returns the authorization URL
handleCallback(client: OAuthClient, callbackParams: object): Promise<TokenResponse>
refreshToken(client: OAuthClient, refreshToken: string): Promise<TokenResponse>
```

# Client Side Usage
In client-side use, do NOT put `<client-secret>`, using PKCE is recommended ( some provider forces to use ).

Sample `OAuthClient` Setup:
```js
let client = {
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
```js
let client = {
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
In server-side use, we should put `<client-secret>`, store it properly in `ENV` so that it does NOT get exposed in public. PKCE should be used for better security, although it has provision to skip.

Sample `OAuthClient` Setup:
```js
let client = {
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
- [x] Workes with Auth0, Kinde Oauth Provider [Tested]

- [x] Workes on both Server and Client Side JS [Tested]

# Example
For better understanding, go through the `/example`.

- `example1` is a React Client Side Implementation 

  Live Demo: https://subh-oauth2-demo1.vercel.app


- `example2` is a NextJS 14 Server Side Implementation


  Live Demo: https://subh-oauth2-demo2.vercel.app



## Implementation Choices and Challenges

I created an OAuth2 client JavaScript library that works on both server-side and client-side environments. I decided to use the Proof Key for Code Exchange (PKCE) flow to improve security, especially for public clients.

- ### Challenges I Faced:
Documentation Issues: Working with identity providers like Kinde and Auth0 was tough because their docs focus more on SDKs. This made it hard to find the information I needed for API integration, so I spent a lot of time figuring things out.

- ### Client-Side Crypto Problems:
I ran into issues with the crypto library on the client side, which caused problems when trying to generate the code_challenge. I had to look for other libraries to handle this securely.

- ### Tricky OAuth2 API Calls:
Making the OAuth2 API calls was complicated, especially without a clear setup. I got a lot of errors, and the messages were often confusing, making it hard to troubleshoot. Also understanding the oauth flow was tricky.

Overall, these challenges pushed me to dig deeper into the resources and find better ways to implement the OAuth2 client library.








