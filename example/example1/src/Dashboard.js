import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading, logout } = useContext(AuthContext);

  // Show loading state if still fetching the user
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>
        Welcome, {user.first_name} {user.last_name}!
      </h1>
      <button onClick={logout}>Logout</button>
      <h3>Email: {user.preferred_email}</h3>
      {user.picture && (
        <img
          src={`${user.picture}`}
          style={{ borderRadius: "100%", width: "80px", height: "80px" }}
          alt="dp"
        />
      )}
    </div>
  );
};

export default Dashboard;
