import React, { useState } from "react";
import "../styles/Dashboard.css";

const StaffDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("doctors");
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    speciality: "",
    password: "",
  });
  const [patientForm, setPatientForm] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (
      doctorForm.name &&
      doctorForm.email &&
      doctorForm.speciality &&
      doctorForm.password
    ) {
      setDoctors([...doctors, { ...doctorForm, id: Date.now() }]);
      setDoctorForm({ name: "", email: "", speciality: "", password: "" });
      setShowDoctorForm(false);
      alert("Doctor registered successfully!");
    }
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (patientForm.name && patientForm.email && patientForm.mobileNo) {
      setPatients([...patients, { ...patientForm, id: Date.now() }]);
      setPatientForm({ name: "", email: "", mobileNo: "" });
      setShowPatientForm(false);
      alert("Patient registered successfully!");
    }
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((pat) => pat.id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Staff Dashboard</h2>
        <p className="staff-info">Manage Doctors and Patients</p>
      </div>

      <div className="staff-tabs">
        <button
          className={`tab-button ${activeTab === "doctors" ? "active" : ""}`}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors ({doctors.length})
        </button>
        <button
          className={`tab-button ${activeTab === "patients" ? "active" : ""}`}
          onClick={() => setActiveTab("patients")}
        >
          Patients ({patients.length})
        </button>
      </div>

      {activeTab === "doctors" && (
        <div className="tab-content">
          <div className="tab-header">
            <h3>Doctor Management</h3>
            <button
              className="btn-add"
              onClick={() => setShowDoctorForm(!showDoctorForm)}
            >
              {showDoctorForm ? "Cancel" : "+ Add Doctor"}
            </button>
          </div>

          {showDoctorForm && (
            <div className="form-card">
              <h4>Register New Doctor</h4>
              <form onSubmit={handleAddDoctor} className="staff-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="doctor-name">Full Name:</label>
                    <input
                      id="doctor-name"
                      type="text"
                      name="name"
                      value={doctorForm.name}
                      onChange={handleDoctorChange}
                      placeholder="Enter doctor name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="doctor-email">Email:</label>
                    <input
                      id="doctor-email"
                      type="email"
                      name="email"
                      value={doctorForm.email}
                      onChange={handleDoctorChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="doctor-speciality">Speciality:</label>
                    <select
                      id="doctor-speciality"
                      name="speciality"
                      value={doctorForm.speciality}
                      onChange={handleDoctorChange}
                      required
                    >
                      <option value="">Select Speciality</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="General Practice">General Practice</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="doctor-password">Password:</label>
                    <input
                      id="doctor-password"
                      type="password"
                      name="password"
                      value={doctorForm.password}
                      onChange={handleDoctorChange}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-submit">
                  Register Doctor
                </button>
              </form>
            </div>
          )}

          <div className="records-section">
            {doctors.length === 0 ? (
              <p className="no-records">No doctors registered yet.</p>
            ) : (
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Speciality</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.name}</td>
                      <td>{doc.email}</td>
                      <td>{doc.speciality}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => deleteDoctor(doc.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === "patients" && (
        <div className="tab-content">
          <div className="tab-header">
            <h3>Patient Management</h3>
            <button
              className="btn-add"
              onClick={() => setShowPatientForm(!showPatientForm)}
            >
              {showPatientForm ? "Cancel" : "+ Add Patient"}
            </button>
          </div>

          {showPatientForm && (
            <div className="form-card">
              <h4>Register New Patient</h4>
              <form onSubmit={handleAddPatient} className="staff-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="patient-name">Full Name:</label>
                    <input
                      id="patient-name"
                      type="text"
                      name="name"
                      value={patientForm.name}
                      onChange={handlePatientChange}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="patient-email">Email:</label>
                    <input
                      id="patient-email"
                      type="email"
                      name="email"
                      value={patientForm.email}
                      onChange={handlePatientChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="patient-mobile">Mobile Number:</label>
                  <input
                    id="patient-mobile"
                    type="tel"
                    name="mobileNo"
                    value={patientForm.mobileNo}
                    onChange={handlePatientChange}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    required
                  />
                </div>

                <button type="submit" className="btn-submit">
                  Register Patient
                </button>
              </form>
            </div>
          )}

          <div className="records-section">
            {patients.length === 0 ? (
              <p className="no-records">No patients registered yet.</p>
            ) : (
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((pat) => (
                    <tr key={pat.id}>
                      <td>{pat.name}</td>
                      <td>{pat.email}</td>
                      <td>{pat.mobileNo}</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => deletePatient(pat.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
