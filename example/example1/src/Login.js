import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import pkceChallenge from "pkce-challenge";
import { nanoid } from "nanoid";
import { generateClient } from "./utils";
import { startAuthFlow } from "subh-oauth2";

const Login = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  const handleLogin = async () => {
    try {
      const myState = nanoid();

      const challenge = await pkceChallenge(50);

      const codeVerifier = challenge.code_verifier;
      const codeChallenge = challenge.code_challenge;

      sessionStorage.setItem("myState", myState);
      sessionStorage.setItem("codeVerifier", codeVerifier);
      sessionStorage.setItem("codeChallenge", codeChallenge);

      const client = generateClient({ myState, codeVerifier, codeChallenge });

      const url = startAuthFlow(client);

      window.location = url;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Add your login form here */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
