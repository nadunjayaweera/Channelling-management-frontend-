import React, { useState } from "react";
import "../styles/Dashboard.css";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2025-11-20",
      time: "10:00",
      reason: "Checkup",
      status: "Scheduled",
    },
  ]);

  const updateAppointmentStatus = (id, status) => {
    setAppointments(
      appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Doctor Dashboard</h2>
        <p className="doctor-info">
          Welcome, Dr. Smith | Speciality: Cardiology
        </p>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h4>Total Appointments</h4>
          <p className="stat-number">{appointments.length}</p>
        </div>
        <div className="stat-card">
          <h4>Pending</h4>
          <p className="stat-number">
            {appointments.filter((a) => a.status === "Pending").length}
          </p>
        </div>
        <div className="stat-card">
          <h4>Completed</h4>
          <p className="stat-number">
            {appointments.filter((a) => a.status === "Completed").length}
          </p>
        </div>
      </div>

      <div className="appointments-section">
        <h3>Upcoming Appointments</h3>
        {appointments.length === 0 ? (
          <p className="no-appointments">No appointments scheduled.</p>
        ) : (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id}>
                  <td>{apt.patientName}</td>
                  <td>{apt.date}</td>
                  <td>{apt.time}</td>
                  <td>{apt.reason}</td>
                  <td>
                    <span className={`status ${apt.status.toLowerCase()}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={apt.status}
                      onChange={(e) =>
                        updateAppointmentStatus(apt.id, e.target.value)
                      }
                      className="status-select"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
