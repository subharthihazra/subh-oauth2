"use client";
import { useAppContext } from "@/context/AppContext";
import { generateClient } from "@/lib/utls";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { startAuthFlow } from "subh-oauth2";

export default function Login() {
  const router = useRouter();

  const { user, loading } = useAppContext();
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [loading, user, router]);

  const handleLogin = async () => {
    try {
      const { data } = await axios.get("/api/getcodes");
      console.log("codes", data);

      const client = generateClient({ ...data, myState: data.state });

      const url = startAuthFlow(client);

      window.location.href = url;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="m-8 border p-8 flex flex-col gap-4">
      <h2>Login</h2>
      {/* Add your login form here */}
      <button
        onClick={handleLogin}
        className=" bg-[#57a] rounded-md text-white w-fit px-3 py-2"
      >
        Login
      </button>
    </div>
  );
}
