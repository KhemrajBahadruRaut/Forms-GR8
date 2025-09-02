import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const res = await fetch("http://localhost/gr8-onboardingform/admin_login/check_session.php", {
        const res = await fetch("https://onboarding.khemrajbahadurraut.com.np/gr8-onboardingform/admin_login/check_session.php", {
          method: "GET",
          credentials: "include", 
        });
        const data = await res.json();
        setIsAuth(data.loggedIn);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  return isAuth ? children : <Navigate to="/admin-dashboard" replace />;
};

export default ProtectedRoute;
