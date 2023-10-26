import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import "./Content.css";
import Home from "../home/Home";
import CallAutomation from "../callautomation/CallAutomation";
import CallHistory from "../callhistory/CallHistory";
import Analytics from "../analytics/Analytics";
import Settings from "../settings/Settings";

const Content = () => {
  return (
    <div className="content-root">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/call-automation" element={<CallAutomation />} />
        <Route path="/call-history" element={<CallHistory />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} /> 
      </Routes>
    </div>
  );
};

export default Content;
