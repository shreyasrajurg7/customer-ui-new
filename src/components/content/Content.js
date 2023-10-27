import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import "./Content.css";
import Home from "../home/Home";
import CallAutomation from "../callautomation/CallAutomation";
import CallHistory from "../callhistory/CallHistory";
import Analytics from "../analytics/Analytics";
import Settings from "../settings/Settings";
import Login from "../login/Login";
import ProtectedRoute from "../../utils/ProtectedRoute";

const Content = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <div className="content-root">
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={Home} // Render the ContentPage component if authenticated
              isAuthenticated={isAuthenticated} // Pass the authentication status
              redirectTo="/" // Redirect to the login page if not authenticated
            />
          }
        />
        <Route
          path="/call-automation"
          element={
            <ProtectedRoute
              element={CallAutomation} // Render the ContentPage component if authenticated
              isAuthenticated={isAuthenticated} // Pass the authentication status
              redirectTo="/" // Redirect to the login page if not authenticated
            />
          }
        />
        <Route
          path="/call-history"
          element={
            <ProtectedRoute
              element={CallHistory} // Render the ContentPage component if authenticated
              isAuthenticated={isAuthenticated} // Pass the authentication status
              redirectTo="/" // Redirect to the login page if not authenticated
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute
              element={Analytics} // Render the ContentPage component if authenticated
              isAuthenticated={isAuthenticated} // Pass the authentication status
              redirectTo="/" // Redirect to the login page if not authenticated
            />
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute
              element={Settings} // Render the ContentPage component if authenticated
              isAuthenticated={isAuthenticated} // Pass the authentication status
              redirectTo="/" // Redirect to the login page if not authenticated
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Content;
