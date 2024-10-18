import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateClient } from "./utils";
import Cookies from "js-cookie";
import { handleCallback } from "subh-oauth2";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function perform_task() {
      // Parse URL parameters
      try {
        const params = new URLSearchParams(location.search);

        // Extract specific parameters
        const code = params.get("code"); // Example parameter
        const state = params.get("state"); // Example parameter

        const myState = sessionStorage.getItem("myState");
        const codeVerifier = sessionStorage.getItem("codeVerifier");
        const codeChallenge = sessionStorage.getItem("codeChallenge");
        const scope = sessionStorage.getItem("scope");

        const client = generateClient({ myState, codeVerifier, codeChallenge, scope });

        const tokenResponse = await handleCallback(client, { code, state });

        Cookies.set("access_token", tokenResponse.access_token, {
          expires: tokenResponse.expires_in,
          path: "/",
        });

        if (tokenResponse.refresh_token) {
          Cookies.set("refresh_token", tokenResponse.refresh_token, {
            expires: tokenResponse.expires_in,
            path: "/",
          });
        }

        window.location = "/";
      } catch (err) {
        console.log(err);
        navigate("/login");
      } finally {
        sessionStorage.removeItem("myState");
        sessionStorage.removeItem("codeVerifier");
        sessionStorage.removeItem("codeChallenge");
        sessionStorage.removeItem("scope");
      }
    }
    perform_task();
  }, []);

  return (
    <div>
      <h2>Processing Callback...</h2>
      {/* You can show a loading spinner or message here */}
    </div>
  );
};

export default Callback;
