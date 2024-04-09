import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return children;
};

export default PrivateRoutes;
