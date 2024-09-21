import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import React from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAuth();

  if (auth === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
