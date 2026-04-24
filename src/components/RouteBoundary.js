import React from "react";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

function RouteBoundary({ children }) {
  const location = useLocation();
  return <ErrorBoundary resetKey={location.pathname}>{children}</ErrorBoundary>;
}

export default RouteBoundary;
