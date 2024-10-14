"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Callback() {
  const router = useRouter();

  async function perform_task() {
    // Parse URL parameters
    try {
      const params = new URLSearchParams(location.search);

      // Extract specific parameters
      const code = params.get("code"); // Example parameter
      const state = params.get("state"); // Example parameter

      console.log("code,state", code, state);

      const { data } = await axios.post(
        "/api/login",
        {
          code,
          state,
        },
        {
          withCredentials: true,
        }
      );

      console.log("login", data);

      window.location.href = "/";
    } catch (err) {
      console.log(err);
      router.push("/login");
    } finally {
    }
  }
  perform_task();

  return <div>Processing Callback...</div>;
}
