/**
 * @file        App.jsx
 * @description Defines the app's route structure and layout wrapper.
 *
 * @notes       Handles client-side routing with React Router and wraps all routes with shared layout components.
 */


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import UserProvider from "./context/userContext";


const App = () => {
  return (
    <UserProvider>
        <div>
          {/* App Routes */}
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
            </Routes>
          </Router>
          
          <Toaster toastOptions={{className: "", style: {fontSize: "13px",},}}/>
        </div>
      </UserProvider>
  );
}

export default App;