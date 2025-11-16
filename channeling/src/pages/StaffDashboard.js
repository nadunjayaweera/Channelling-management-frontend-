import React, { useState, useEffect } from "react";
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

  const [loadingPatients, setLoadingPatients] = useState(false);
  const [errorPatients, setErrorPatients] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [errorDoctors, setErrorDoctors] = useState(null);
  const [specialities, setSpecialities] = useState([]);

  // Doctor form data
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    speciality: "",
    password: "",
  });

  // Patient form data
  const [patientForm, setPatientForm] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
  });

  // Appointment form
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    amount: "",
    status: "Pending",
  });

  // Lab Appointment form
  const [labAppointmentForm, setLabAppointmentForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "Pending",
  });

  /* ============================================================
     API CALLS
  ============================================================ */

  const fetchPatients = async () => {
    setLoadingPatients(true);
    setErrorPatients(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch("http://localhost:5000/api/patient/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

      const result = await response.json();

      // FIX → handle deep nested array
      setPatients(result?.data?.data || []);
    } catch (err) {
      setErrorPatients(err.message);
    } finally {
      setLoadingPatients(false);
    }
  };

  const fetchSpecialities = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/home/formdata", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      setSpecialities(result?.data?.speciality || []);
    } catch (error) {
      console.error("Error loading specialities", error);
    }
  };

  const fetchDoctors = async () => {
    setLoadingDoctors(true);
    setErrorDoctors(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch("http://localhost:5000/api/doctor/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);

      const data = await response.json();

      // FIX APPLIED HERE
      setDoctors(data.data || []);
    } catch (err) {
      setErrorDoctors(err.message);
    } finally {
      setLoadingDoctors(false);
    }
  };

  useEffect(() => {
    if (activeTab === "patients") fetchPatients();
    if (activeTab === "doctors") fetchDoctors();
  }, [activeTab]);

  useEffect(() => {
    fetchSpecialities();
  }, []);
  /* ============================================================
     FORM HANDLERS
  ============================================================ */

  const handleDoctorChange = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const handlePatientChange = (e) => {
    setPatientForm({ ...patientForm, [e.target.name]: e.target.value });
  };

  const handleAppointmentChange = (e) => {
    setAppointmentForm({ ...appointmentForm, [e.target.name]: e.target.value });
  };

  const handleLabAppointmentChange = (e) => {
    setLabAppointmentForm({
      ...labAppointmentForm,
      [e.target.name]: e.target.value,
    });
  };

  /* ============================================================
     ADD / DELETE / UPDATE LOGIC
  ============================================================ */

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/doctor/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: doctorForm.name,
          email: doctorForm.email,
          password: doctorForm.password,
          speciality: Number(doctorForm.speciality), // <-- IMPORTANT FIX
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchDoctors();
        setDoctorForm({ name: "", email: "", speciality: "", password: "" });
        setShowDoctorForm(false);
        alert("Doctor registered successfully!");
      } else {
        alert(data.message || JSON.stringify(data.errors));
      }
    } catch (error) {
      alert("Error registering doctor. Try again.");
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: patientForm.name,
          email: patientForm.email,
          mobileNo: patientForm.mobileNo,
          password: patientForm.password,
          userType: 4,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        fetchPatients();
        setPatientForm({ name: "", email: "", mobileNo: "", password: "" });
        setShowPatientForm(false);
        alert("Patient registered successfully!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Error registering patient.");
    }
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();

    const newAppointment = {
      ...appointmentForm,
      id: Date.now(),
      appointmentNumber: `APT-${Date.now()}`.substring(0, 15),
      receiptNumber: `RCP-${Date.now()}`.substring(0, 15),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      patientName:
        patients.find((p) => p.id == appointmentForm.patientId)?.name || "N/A",
      doctorName:
        doctors.find((d) => d.id == appointmentForm.doctorId)?.name || "N/A",
    };

    setAppointments((prev) => [...prev, newAppointment]);

    setAppointmentForm({
      patientId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
      amount: "",
      status: "Pending",
    });

    setShowAppointmentForm(false);
  };

  const handleAddLabAppointment = (e) => {
    e.preventDefault();

    const newLabAppointment = {
      ...labAppointmentForm,
      id: Date.now(),
      appointmentNumber: Math.floor(Math.random() * 1000000),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      patientName:
        patients.find((p) => p.id == labAppointmentForm.patientId)?.name ||
        "N/A",
      doctorName:
        doctors.find((d) => d.id == labAppointmentForm.doctorId)?.name || "N/A",
    };

    setLabAppointments((prev) => [...prev, newLabAppointment]);

    setLabAppointmentForm({
      patientId: "",
      doctorId: "",
      appointmentDate: "",
      appointmentTime: "",
      status: "Pending",
    });

    setShowLabAppointmentForm(false);
  };

  const deleteDoctor = (id) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const deleteLabAppointment = (id) => {
    setLabAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: newStatus, updatedAt: new Date() } : a
      )
    );
  };

  const updateLabAppointmentStatus = (id, newStatus) => {
    setLabAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: newStatus, updatedAt: new Date() } : a
      )
    );
  };

  /* ============================================================
     UI RENDER
  ============================================================ */

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Staff Dashboard</h2>
        <p>Manage Doctors, Patients, Appointments and Lab Appointments</p>
      </div>

      {/* TABS */}
      <div className="staff-tabs">
        <button
          className={activeTab === "doctors" ? "active" : ""}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors ({doctors.length})
        </button>

        <button
          className={activeTab === "patients" ? "active" : ""}
          onClick={() => setActiveTab("patients")}
        >
          Patients ({patients.length})
        </button>

        <button
          className={activeTab === "appointments" ? "active" : ""}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments ({appointments.length})
        </button>

        <button
          className={activeTab === "lab-appointments" ? "active" : ""}
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
            <button onClick={() => setShowDoctorForm(!showDoctorForm)}>
              {showDoctorForm ? "Cancel" : "+ Add Doctor"}
            </button>
          </div>

          {/* SHOW FORM */}
          {showDoctorForm && (
            <div className="form-card modern-form">
              <h4>Register New Doctor</h4>
              <form onSubmit={handleAddDoctor} className="styled-form">
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter full name"
                    value={doctorForm.name}
                    onChange={handleDoctorChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter doctor email"
                    value={doctorForm.email}
                    onChange={handleDoctorChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Speciality</label>
                  <select
                    name="speciality"
                    value={doctorForm.speciality}
                    onChange={handleDoctorChange}
                    required
                  >
                    <option value="">-- Select Speciality --</option>
                    {specialities.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={doctorForm.password}
                    onChange={handleDoctorChange}
                    required
                  />
                </div>

                <button type="submit" className="btn-save">
                  Register Doctor
                </button>
              </form>
            </div>
          )}

          {/* DOCTOR LIST */}
          <div className="records-section">
            {loadingDoctors && <p>Loading...</p>}
            {errorDoctors && <p>Error: {errorDoctors}</p>}

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
                  <tr key={doc.email}>
                    <td>{doc.name}</td>
                    <td>{doc.email}</td>
                    <td>{doc.speciality?.name || doc.speciality}</td>
                    <td>
                      <button onClick={() => deleteDoctor(doc.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PATIENTS TAB */}
      {activeTab === "patients" && (
        <div className="tab-content">
          <div className="tab-header">
            <h3>Patient Management</h3>
            <button onClick={() => setShowPatientForm(!showPatientForm)}>
              {showPatientForm ? "Cancel" : "+ Add Patient"}
            </button>
          </div>

          {showPatientForm && (
            <div className="form-card modern-form">
              <h4>Register New Patient</h4>
              <form onSubmit={handleAddPatient} className="styled-form">
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter patient full name"
                    value={patientForm.name}
                    onChange={handlePatientChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter patient email"
                    value={patientForm.email}
                    onChange={handlePatientChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Mobile Number</label>
                  <input
                    name="mobileNo"
                    type="tel"
                    placeholder="Ex: 0711234567"
                    maxLength="10"
                    value={patientForm.mobileNo}
                    onChange={handlePatientChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={patientForm.password}
                    onChange={handlePatientChange}
                    required
                  />
                </div>

                <button type="submit" className="btn-save">
                  Register Patient
                </button>
              </form>
            </div>
          )}

          <table className="records-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((pat) => (
                <tr key={pat.email}>
                  <td>{pat.name}</td>
                  <td>{pat.email}</td>
                  <td>{pat.mobileNo}</td>
                  <td>
                    <button onClick={() => deletePatient(pat.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* APPOINTMENTS TAB */}
      {activeTab === "appointments" && (
        <div className="tab-content">
          <div className="tab-header">
            <h3>Appointment Management</h3>
            <button
              onClick={() => setShowAppointmentForm(!showAppointmentForm)}
            >
              {showAppointmentForm ? "Cancel" : "+ Create Appointment"}
            </button>
          </div>

          {showAppointmentForm && (
            <div className="form-card">
              <h4>Create Appointment</h4>
              <form onSubmit={handleAddAppointment}>
                <select
                  name="patientId"
                  value={appointmentForm.patientId}
                  onChange={handleAppointmentChange}
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map((pat) => (
                    <option key={pat.id} value={pat.id}>
                      {pat.name}
                    </option>
                  ))}
                </select>

                <select
                  name="doctorId"
                  value={appointmentForm.doctorId}
                  onChange={handleAppointmentChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  name="appointmentDate"
                  value={appointmentForm.appointmentDate}
                  onChange={handleAppointmentChange}
                  required
                />

                <input
                  type="time"
                  name="appointmentTime"
                  value={appointmentForm.appointmentTime}
                  onChange={handleAppointmentChange}
                  required
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={appointmentForm.amount}
                  onChange={handleAppointmentChange}
                  required
                />

                <button type="submit">Create Appointment</button>
              </form>
            </div>
          )}

          <table className="records-table">
            <thead>
              <tr>
                <th>Apt #</th>
                <th>Receipt #</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date/Time</th>
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
                    {apt.appointmentDate} - {apt.appointmentTime}
                  </td>
                  <td>
                    <select
                      value={apt.status}
                      onChange={(e) =>
                        updateAppointmentStatus(apt.id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => deleteAppointment(apt.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* LAB APPOINTMENTS TAB */}
      {activeTab === "lab-appointments" && (
        <div className="tab-content">
          <div className="tab-header">
            <h3>Lab Appointment Management</h3>
            <button
              onClick={() => setShowLabAppointmentForm(!showLabAppointmentForm)}
            >
              {showLabAppointmentForm ? "Cancel" : "+ Create Lab Appointment"}
            </button>
          </div>

          {showLabAppointmentForm && (
            <div className="form-card">
              <h4>Create Lab Appointment</h4>
              <form onSubmit={handleAddLabAppointment}>
                <select
                  name="patientId"
                  value={labAppointmentForm.patientId}
                  onChange={handleLabAppointmentChange}
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map((pat) => (
                    <option key={pat.id} value={pat.id}>
                      {pat.name}
                    </option>
                  ))}
                </select>

                <select
                  name="doctorId"
                  value={labAppointmentForm.doctorId}
                  onChange={handleLabAppointmentChange}
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  name="appointmentDate"
                  value={labAppointmentForm.appointmentDate}
                  onChange={handleLabAppointmentChange}
                  required
                />

                <input
                  type="time"
                  name="appointmentTime"
                  value={labAppointmentForm.appointmentTime}
                  onChange={handleLabAppointmentChange}
                  required
                />

                <select
                  name="status"
                  value={labAppointmentForm.status}
                  onChange={handleLabAppointmentChange}
                >
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>

                <button type="submit">Create Lab Appointment</button>
              </form>
            </div>
          )}

          <table className="records-table">
            <thead>
              <tr>
                <th>Apt #</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date/Time</th>
                <th>Status</th>
                <th>Created</th>
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
                    {apt.appointmentDate} - {apt.appointmentTime}
                  </td>
                  <td>
                    <select
                      value={apt.status}
                      onChange={(e) =>
                        updateLabAppointmentStatus(apt.id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td>{new Date(apt.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => deleteLabAppointment(apt.id)}>
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
  );
};

export default StaffDashboard;
