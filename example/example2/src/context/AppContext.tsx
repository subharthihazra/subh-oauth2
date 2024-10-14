"use client";
import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback, // Import useCallback
} from "react";

// Define the context type
interface AppContextType {
  user: Record<string, any> | null;
  setUser: any;
  loading: boolean;
  setLoading: any;
  logout: () => void; // Expose logout function
}

// Create context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const checkAuth = useCallback(async () => {
    for (let i = 0; i < 1; i++) {
      try {
        const { data } = await axios.post(
          "/api/profile",
          {},
          {
            withCredentials: true,
          }
        );

        setUser(data);
        console.log(data);
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
  }, [user]); // Add user to dependencies

  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // Add checkAuth to the dependency array

  const logout = async () => {
    await axios.post(
      "/api/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

async function handleRefreshToken() {
  try {
    await axios.post(
      "/api/refresh",
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
