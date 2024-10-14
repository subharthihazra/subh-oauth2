import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthProvider, { AuthContext } from "./AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Callback from "./Callback";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  return loading ? (
    <div>Loading...</div>
  ) : user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
