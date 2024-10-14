"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Dashboard = () => {
  const { user, loading, logout } = useAppContext();
  const router = useRouter();

  // Show loading state if still fetching the user
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user, redirect to login
  if (!user) {
    router.push("/login"); // Redirect to login page
    return null; // Return null to avoid rendering anything else
  }

  return (
    <div className=" m-8 border p-8 flex flex-col gap-4">
      <h1 className=" font-bold text-2xl">
        Hi, {user.first_name} {user.last_name}!
      </h1>
      <button
        onClick={logout}
        className=" bg-[#57a] rounded-md text-white w-fit px-3 py-2"
      >
        Logout
      </button>
      <h3 className="text-md">Email: {user.preferred_email}</h3>
      {user.picture && (
        <Image
          src={`${user.picture}`}
          style={{ borderRadius: "100%" }}
          width={80}
          height={80}
          alt="dp"
        />
      )}
    </div>
  );
};

export default Dashboard;
