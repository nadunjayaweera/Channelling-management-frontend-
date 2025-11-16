import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import DoctorRegistrationForm from "./components/DoctorRegistrationForm";
import PatientRegistrationForm from "./components/PatientRegistrationForm";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  //  AUTO LOGIN ON REFRESH
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);

      if (parsedUser.userType === 1) setUserRole("Staff");
      if (parsedUser.userType === 2) setUserRole("Doctor");
      if (parsedUser.userType === 4) setUserRole("Patient");
    }
  }, []);

  const handleLogin = (userType) => {
    setIsLoggedIn(true);

    if (userType === 1) setUserRole("Staff");
    if (userType === 2) setUserRole("Doctor");
    if (userType === 4) setUserRole("Patient");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="app">
        {isLoggedIn && (
          <nav className="navbar">
            <div className="navbar-brand">Hospital Channeling System</div>
            <div className="navbar-menu">
              <span className="user-role">{userRole}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </nav>
        )}

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to={`/${userRole.toLowerCase()}-dashboard`} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />

          <Route path="/register/doctor" element={<DoctorRegistrationForm />} />
          <Route
            path="/register/patient"
            element={<PatientRegistrationForm />}
          />

          <Route
            path="/patient-dashboard"
            element={
              isLoggedIn && userRole === "Patient" ? (
                <PatientDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/doctor-dashboard"
            element={
              isLoggedIn && userRole === "Doctor" ? (
                <DoctorDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/staff-dashboard"
            element={
              isLoggedIn && userRole === "Staff" ? (
                <StaffDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
