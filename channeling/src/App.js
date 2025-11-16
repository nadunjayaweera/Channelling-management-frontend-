import React, { useState } from "react";
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

  const handleLogin = (userType) => {
    setIsLoggedIn(true);
    let roleString = '';
    if (userType === 1) {
      roleString = 'Staff';
    } else if (userType === 2) {
      roleString = 'Doctor';
    } else if (userType === 4) {
      roleString = 'Patient';
    }
    setUserRole(roleString);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
          {/* Login Route */}
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

          {/* Registration Routes */}
          <Route path="/register/doctor" element={<DoctorRegistrationForm />} />
          <Route path="/register/patient" element={<PatientRegistrationForm />} />

          {/* Patient Dashboard */}
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

          {/* Doctor Dashboard */}
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

          {/* Staff Dashboard - Registration Management */}
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

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
