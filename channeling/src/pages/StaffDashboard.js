import React, { useState } from "react";
import "../styles/Dashboard.css";

const StaffDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [labAppointments, setLabAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("doctors");
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showLabAppointmentForm, setShowLabAppointmentForm] = useState(false);

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

  const [appointmentForm, setAppointmentForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    amount: "",
    status: "Pending",
  });

  const [labAppointmentForm, setLabAppointmentForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "Pending",
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

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLabAppointmentChange = (e) => {
    const { name, value } = e.target;
    setLabAppointmentForm((prev) => ({
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

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (
      appointmentForm.patientId &&
      appointmentForm.doctorId &&
      appointmentForm.appointmentDate &&
      appointmentForm.amount
    ) {
      const appointmentNumber = `APT-${Date.now()}`.substring(0, 15);
      const receiptNumber = `RCP-${Date.now()}`.substring(0, 15);

      const newAppointment = {
        ...appointmentForm,
        id: Date.now(),
        appointmentNumber,
        receiptNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        patientName:
          patients.find((p) => p.id == appointmentForm.patientId)?.name ||
          "N/A",
        doctorName:
          doctors.find((d) => d.id == appointmentForm.doctorId)?.name || "N/A",
      };

      setAppointments([...appointments, newAppointment]);
      setAppointmentForm({
        patientId: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        amount: "",
        status: "Pending",
      });
      setShowAppointmentForm(false);
      alert("Appointment created successfully!");
    }
  };

  const handleAddLabAppointment = (e) => {
    e.preventDefault();
    if (
      labAppointmentForm.patientId &&
      labAppointmentForm.doctorId &&
      labAppointmentForm.appointmentDate &&
      labAppointmentForm.appointmentTime
    ) {
      const appointmentNumber = Math.floor(Math.random() * 1000000);
      const newLabAppointment = {
        ...labAppointmentForm,
        id: Date.now(),
        appointmentNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        patientName:
          patients.find((p) => p.id == labAppointmentForm.patientId)?.name ||
          "N/A",
        doctorName:
          doctors.find((d) => d.id == labAppointmentForm.doctorId)?.name ||
          "N/A",
      };

      setLabAppointments([...labAppointments, newLabAppointment]);
      setLabAppointmentForm({
        patientId: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "Pending",
      });
      setShowLabAppointmentForm(false);
      alert("Lab Appointment created successfully!");
    }
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((doc) => doc.id !== id));
  };

  const deletePatient = (id) => {
    setPatients(patients.filter((pat) => pat.id !== id));
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const deleteLabAppointment = (id) => {
    setLabAppointments(labAppointments.filter((apt) => apt.id !== id));
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id
          ? { ...apt, status: newStatus, updatedAt: new Date().toISOString() }
          : apt
      )
    );
  };

  const updateLabAppointmentStatus = (id, newStatus) => {
    setLabAppointments(
      labAppointments.map((apt) =>
        apt.id === id
          ? { ...apt, status: newStatus, updatedAt: new Date().toISOString() }
          : apt
      )
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Staff Dashboard</h2>
        <p className="staff-info">
          Manage Doctors, Patients, Appointments and Lab Appointments
        </p>
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
        <button
          className={`tab-button ${
            activeTab === "appointments" ? "active" : ""
          }`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments ({appointments.length})
        </button>
        <button
          className={`tab-button ${
            activeTab === "lab-appointments" ? "active" : ""
          }`}
          onClick={() => setActiveTab("lab-appointments")}
        >
          Lab Appointments ({labAppointments.length})
        </button>
      </div>

      {/* DOCTORS TAB */}
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

      {/* PATIENTS TAB */}
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

      {/* APPOINTMENTS TAB */}
      {activeTab === "appointments" && (
        <div className="tab-content">
          <div className="tab-header">
            <h3>Appointment Management</h3>
            <button
              className="btn-add"
              onClick={() => setShowAppointmentForm(!showAppointmentForm)}
            >
              {showAppointmentForm ? "Cancel" : "+ Create Appointment"}
            </button>
          </div>

          {showAppointmentForm && (
            <div className="form-card">
              <h4>Create New Appointment</h4>
              <form onSubmit={handleAddAppointment} className="staff-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="apt-patient">Select Patient:</label>
                    <select
                      id="apt-patient"
                      name="patientId"
                      value={appointmentForm.patientId}
                      onChange={handleAppointmentChange}
                      required
                    >
                      <option value="">-- Select Patient --</option>
                      {patients.map((pat) => (
                        <option key={pat.id} value={pat.id}>
                          {pat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="apt-doctor">Select Doctor:</label>
                    <select
                      id="apt-doctor"
                      name="doctorId"
                      value={appointmentForm.doctorId}
                      onChange={handleAppointmentChange}
                      required
                    >
                      <option value="">-- Select Doctor --</option>
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.speciality})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="apt-date">Appointment Date:</label>
                    <input
                      id="apt-date"
                      type="date"
                      name="appointmentDate"
                      value={appointmentForm.appointmentDate}
                      onChange={handleAppointmentChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apt-time">Appointment Time:</label>
                    <input
                      id="apt-time"
                      type="time"
                      name="appointmentTime"
                      value={appointmentForm.appointmentTime}
                      onChange={handleAppointmentChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="apt-amount">Amount (LKR):</label>
                    <input
                      id="apt-amount"
                      type="number"
                      step="0.01"
                      name="amount"
                      value={appointmentForm.amount}
                      onChange={handleAppointmentChange}
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="apt-status">Status:</label>
                    <select
                      id="apt-status"
                      name="status"
                      value={appointmentForm.status}
                      onChange={handleAppointmentChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-submit">
                  Create Appointment
                </button>
              </form>
            </div>
          )}

          <div className="records-section">
            {appointments.length === 0 ? (
              <p className="no-records">No appointments created yet.</p>
            ) : (
              <div className="appointments-overflow">
                <table className="records-table">
                  <thead>
                    <tr>
                      <th>Appointment #</th>
                      <th>Receipt #</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Date & Time</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>{apt.appointmentNumber}</td>
                        <td>{apt.receiptNumber}</td>
                        <td>{apt.patientName}</td>
                        <td>{apt.doctorName}</td>
                        <td>
                          {apt.appointmentDate} {apt.appointmentTime}
                        </td>
                        <td>LKR {parseFloat(apt.amount).toFixed(2)}</td>
                        <td>
                          <select
                            value={apt.status}
                            onChange={(e) =>
                              updateAppointmentStatus(apt.id, e.target.value)
                            }
                            className="status-select"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={() => deleteAppointment(apt.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LAB APPOINTMENTS TAB */}
      {activeTab === "lab-appointments" && (
        <div className="tab-content">
          <div className="tab-header">
            <h3>Lab Appointment Management</h3>
            <button
              className="btn-add"
              onClick={() => setShowLabAppointmentForm(!showLabAppointmentForm)}
            >
              {showLabAppointmentForm ? "Cancel" : "+ Create Lab Appointment"}
            </button>
          </div>

          {showLabAppointmentForm && (
            <div className="form-card">
              <h4>Create New Lab Appointment</h4>
              <form onSubmit={handleAddLabAppointment} className="staff-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="lab-apt-patient">Select Patient:</label>
                    <select
                      id="lab-apt-patient"
                      name="patientId"
                      value={labAppointmentForm.patientId}
                      onChange={handleLabAppointmentChange}
                      required
                    >
                      <option value="">-- Select Patient --</option>
                      {patients.map((pat) => (
                        <option key={pat.id} value={pat.id}>
                          {pat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lab-apt-doctor">Referred By Doctor:</label>
                    <select
                      id="lab-apt-doctor"
                      name="doctorId"
                      value={labAppointmentForm.doctorId}
                      onChange={handleLabAppointmentChange}
                      required
                    >
                      <option value="">-- Select Doctor --</option>
                      {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.speciality})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="lab-apt-date">Appointment Date:</label>
                    <input
                      id="lab-apt-date"
                      type="date"
                      name="appointmentDate"
                      value={labAppointmentForm.appointmentDate}
                      onChange={handleLabAppointmentChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lab-apt-time">Appointment Time:</label>
                    <input
                      id="lab-apt-time"
                      type="time"
                      name="appointmentTime"
                      value={labAppointmentForm.appointmentTime}
                      onChange={handleLabAppointmentChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="lab-apt-status">Status:</label>
                  <select
                    id="lab-apt-status"
                    name="status"
                    value={labAppointmentForm.status}
                    onChange={handleLabAppointmentChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <button type="submit" className="btn-submit">
                  Create Lab Appointment
                </button>
              </form>
            </div>
          )}

          <div className="records-section">
            {labAppointments.length === 0 ? (
              <p className="no-records">No lab appointments created yet.</p>
            ) : (
              <div className="appointments-overflow">
                <table className="records-table">
                  <thead>
                    <tr>
                      <th>Appointment #</th>
                      <th>Patient</th>
                      <th>Referred By</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>{apt.appointmentNumber}</td>
                        <td>{apt.patientName}</td>
                        <td>{apt.doctorName}</td>
                        <td>
                          {apt.appointmentDate} {apt.appointmentTime}
                        </td>
                        <td>
                          <select
                            value={apt.status}
                            onChange={(e) =>
                              updateLabAppointmentStatus(apt.id, e.target.value)
                            }
                            className="status-select"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>{new Date(apt.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={() => deleteLabAppointment(apt.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
