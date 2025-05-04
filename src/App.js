import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './assets/styles/global.css';
import Layout from './components/layout/Layout/Layout';
import Internships from './pages/Internships/Internships';
import Companies from './pages/Companies/Companies';
import JobPosts from './pages/JobPosts/JobPosts';
import MyApplications from './pages/MyApplications/MyApplications';
import Applications from './pages/Applications/Applications';

// Auth Context (will be moved to contexts folder later)
export const AuthContext = React.createContext();

// Placeholder components for different user types
const Login = () => {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, userType);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '100px auto' }}>
        <h2 className="text-center">Login to SCAD System</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="userType">Login As</label>
            <select 
              id="userType" 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="proStudent">PRO Student</option>
              <option value="company">Company</option>
              <option value="scadOffice">SCAD Office</option>
              <option value="faculty">Faculty Member</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%' }}>Login</button>
        </form>
        <p className="text-center" style={{ marginTop: '1rem' }}>
          Are you a company looking to register? <a href="/company-register">Register here</a>
        </p>
      </div>
    </div>
  );
};

// Placeholder for company registration
const CompanyRegister = () => {
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '700px', margin: '50px auto' }}>
        <h2 className="text-center">Register as a Company</h2>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="companyName">Company Name</label>
            <input type="text" id="companyName" required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="industry">Industry</label>
            <select id="industry" required>
              <option value="">Select an industry</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="companySize">Company Size</label>
            <select id="companySize" required>
              <option value="">Select company size</option>
              <option value="small">Small (50 employees or less)</option>
              <option value="medium">Medium (more than 50, less than or equal to 100 employees)</option>
              <option value="large">Large (more than 100, less than or equal to 500 employees)</option>
              <option value="corporate">Corporate (more than 500 employees)</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email">Official Company Email</label>
            <input type="email" id="email" required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="logo">Company Logo</label>
            <input type="file" id="logo" accept="image/*" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="documents">Tax Documents</label>
            <input type="file" id="documents" multiple accept=".pdf,.doc,.docx" />
            <small style={{ display: 'block', marginTop: '0.25rem' }}>
              Please upload documents proving your company is legitimate (such as tax documents)
            </small>
          </div>
          <button type="submit" style={{ width: '100%' }}>Register</button>
        </form>
        <p className="text-center" style={{ marginTop: '1rem' }}>
          Already registered? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

// Dashboard placeholders for different user types
const StudentDashboard = () => (
  <div className="container">
    <h1>Student Dashboard</h1>
    <div className="card">
      <h2>Welcome to SCAD System</h2>
      <p>Find internships that match your interests and skills.</p>
    </div>
    <div className="card">
      <h3>Suggested Internships</h3>
      <p>Based on your interests and major.</p>
      {/* Placeholder for internship list */}
    </div>
  </div>
);

const ProStudentDashboard = () => (
  <div className="container">
    <h1>PRO Student Dashboard</h1>
    <div className="card">
      <h2>Welcome to SCAD System</h2>
      <p>Enhance your career with additional resources as a PRO Student.</p>
    </div>
    <div className="card">
      <h3>Upcoming Workshops</h3>
      <p>Build skills for your career journey.</p>
      {/* Placeholder for workshops list */}
    </div>
    <div className="card">
      <h3>Career Guidance</h3>
      <p>Schedule appointments with career counselors.</p>
      {/* Placeholder for appointment scheduling */}
    </div>
  </div>
);

const CompanyDashboard = () => (
  <div className="container">
    <h1>Company Dashboard</h1>
    <div className="card">
      <h2>Welcome to SCAD System</h2>
      <p>Manage your internship postings and applications.</p>
    </div>
    <div className="card">
      <h3>Recent Applications</h3>
      <p>View and manage student applications.</p>
      {/* Placeholder for applications list */}
    </div>
    <div className="card">
      <h3>Current Interns</h3>
      <p>View and manage your current interns.</p>
      {/* Placeholder for interns list */}
    </div>
  </div>
);

const ScadOfficeDashboard = () => (
  <div className="container">
    <h1>SCAD Office Dashboard</h1>
    <div className="card">
      <h2>Welcome to SCAD System</h2>
      <p>Manage the SCAD system and monitor activities.</p>
    </div>
    <div className="card">
      <h3>Pending Company Applications</h3>
      <p>Review and approve company registrations.</p>
      {/* Placeholder for company applications list */}
    </div>
    <div className="card">
      <h3>Internship Reports</h3>
      <p>Review student internship reports.</p>
      {/* Placeholder for reports list */}
    </div>
    <div className="card">
      <h3>System Statistics</h3>
      <p>View system statistics and analytics.</p>
      {/* Placeholder for statistics */}
    </div>
  </div>
);

const FacultyDashboard = () => (
  <div className="container">
    <h1>Faculty Dashboard</h1>
    <div className="card">
      <h2>Welcome to SCAD System</h2>
      <p>Review student reports and monitor internship activities.</p>
    </div>
    <div className="card">
      <h3>Student Reports</h3>
      <p>Review and evaluate student internship reports.</p>
      {/* Placeholder for reports list */}
    </div>
    <div className="card">
      <h3>Department Statistics</h3>
      <p>View statistics related to your department.</p>
      {/* Placeholder for statistics */}
    </div>
  </div>
);

// Unauthorized access page
const Unauthorized = () => (
  <div className="container text-center" style={{ marginTop: '100px' }}>
    <h2>Unauthorized Access</h2>
    <p>You don't have permission to access this page.</p>
    <a href="/dashboard">Return to Dashboard</a>
  </div>
);

function App() {
  const [user, setUser] = useState(null);

  const login = (email, role) => {
    // Simulating login without actual backend authentication
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/company-register" element={<CompanyRegister />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  user.role === 'student' ? <StudentDashboard /> :
                  user.role === 'proStudent' ? <ProStudentDashboard /> :
                  user.role === 'company' ? <CompanyDashboard /> :
                  user.role === 'scadOffice' ? <ScadOfficeDashboard /> :
                  user.role === 'faculty' ? <FacultyDashboard /> :
                  <Navigate to="/login" />
                ) : <Navigate to="/login" />
              } 
            />
            
            {/* Internships Route */}
            <Route 
              path="/internships" 
              element={user ? <Internships /> : <Navigate to="/login" />} 
            />
            
            {/* Companies Route - Only accessible by SCAD Office */}
            <Route 
              path="/companies" 
              element={
                user && user.role === 'scadOffice' 
                  ? <Companies /> 
                  : <Navigate to="/unauthorized" />
              } 
            />
            
            {/* Job Posts Route - Only accessible by companies */}
            <Route 
              path="/job-posts" 
              element={
                user && user.role === 'company' 
                  ? <JobPosts /> 
                  : <Navigate to="/unauthorized" />
              } 
            />
            
            {/* My Applications Route - Only accessible by students and pro students */}
            <Route 
              path="/my-applications" 
              element={
                user && (user.role === 'student' || user.role === 'proStudent')
                  ? <MyApplications /> 
                  : <Navigate to="/unauthorized" />
              } 
            />
            
            {/* Applications Management Route - Only accessible by companies */}
            <Route 
              path="/applications" 
              element={
                user && user.role === 'company'
                  ? <Applications /> 
                  : <Navigate to="/unauthorized" />
              } 
            />
            
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
