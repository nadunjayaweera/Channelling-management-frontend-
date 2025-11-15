import React, { useState } from "react";
import "../styles/Dashboard.css";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showBookForm, setShowBookForm] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: "",
    speciality: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (
      formData.doctorName &&
      formData.appointmentDate &&
      formData.appointmentTime
    ) {
      setAppointments([
        ...appointments,
        { ...formData, id: Date.now(), status: "Pending" },
      ]);
      setFormData({
        doctorName: "",
        speciality: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
      });
      setShowBookForm(false);
      alert("Appointment booked successfully!");
    }
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Patient Dashboard</h2>
        <button
          className="btn-book-appointment"
          onClick={() => setShowBookForm(!showBookForm)}
        >
          {showBookForm ? "Cancel" : "Book Appointment"}
        </button>
      </div>

      {showBookForm && (
        <div className="booking-form-card">
          <h3>Book New Appointment</h3>
          <form onSubmit={handleBookAppointment} className="booking-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="doctorName">Doctor Name:</label>
                <input
                  id="doctorName"
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  placeholder="Enter doctor name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="speciality">Speciality:</label>
                <select
                  id="speciality"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                >
                  <option value="">Select Speciality</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="appointmentDate">Date:</label>
                <input
                  id="appointmentDate"
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="appointmentTime">Time:</label>
                <input
                  id="appointmentTime"
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Visit:</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Describe your reason for visit"
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Book Appointment
            </button>
          </form>
        </div>
      )}

      <div className="appointments-section">
        <h3>My Appointments</h3>
        {appointments.length === 0 ? (
          <p className="no-appointments">No appointments booked yet.</p>
        ) : (
          <div className="appointments-grid">
            {appointments.map((apt) => (
              <div key={apt.id} className="appointment-card">
                <div className="appointment-header">
                  <h4>{apt.doctorName}</h4>
                  <span className={`status ${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </div>
                <div className="appointment-details">
                  <p>
                    <strong>Speciality:</strong> {apt.speciality}
                  </p>
                  <p>
                    <strong>Date:</strong> {apt.appointmentDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {apt.appointmentTime}
                  </p>
                  <p>
                    <strong>Reason:</strong> {apt.reason}
                  </p>
                </div>
                <button
                  className="btn-cancel"
                  onClick={() => cancelAppointment(apt.id)}
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
