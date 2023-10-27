// Import necessary modules from the React and react-router-dom libraries.
import React from "react";
import { Route, Navigate } from "react-router-dom";

// Define a functional component named ProtectedRoute.
// This component is used to protect routes that require authentication.
const ProtectedRoute = ({ element: Element, isAuthenticated, redirectTo, props }) => {
  // Check if the user is authenticated.
  if (isAuthenticated) {
    // If authenticated, render the provided component.
    return <Element {...props} />;
  } else {
    // If not authenticated, redirect the user to the specified route.
    return <Navigate to={redirectTo} />;
  }
};

// Export the ProtectedRoute component as the default export.
export default ProtectedRoute;
