import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { generateClient } from "./utils";
import { refreshToken } from "subh-oauth2";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    for (let i = 0; i < 1; i++) {
      try {
        const access_token = Cookies.get("access_token");

        if (!access_token) {
          throw new Error("No access token");
        }

        const response = await axios.get(
          process.env.REACT_APP_PROFILE_INFO_URL,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        await handleRefreshToken();
      } finally {
        if (user) {
          break;
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    setUser(null);

    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

async function handleRefreshToken() {
  try {
    const refresh_token = Cookies.get("refresh_token");

    if (!refresh_token) {
      throw new Error("No refresh token");
    }

    const client = generateClient();

    const tokenResponse = await refreshToken(client, refresh_token);

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
  } catch (error) {
    console.log(error);
  }
}

export default AuthProvider;
