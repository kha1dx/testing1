import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../App';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // First log the user out
    logout();
    // Then navigate to login page with a slight delay to ensure state update completes
    setTimeout(() => {
      navigate('/login');
    }, 10);
  };

  return (
    <header style={{
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>SCAD System</h1>
          </Link>
        </div>

        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '1.5rem'
          }}>
            {user ? (
              <>
                <li>
                  <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                </li>

                <li>
                  <Link to="/internships" style={{ color: 'white', textDecoration: 'none' }}>Internships</Link>
                </li>

                {/* Student & Pro Student specific links */}
                {(user.role === 'student' || user.role === 'proStudent') && (
                  <li>
                    <Link to="/my-applications" style={{ color: 'white', textDecoration: 'none' }}>My Applications</Link>
                  </li>
                )}

                {/* Pro Student specific links */}
                {user.role === 'proStudent' && (
                  <li>
                    <Link to="/workshops" style={{ color: 'white', textDecoration: 'none' }}>Workshops</Link>
                  </li>
                )}

                {/* Company specific links */}
                {user.role === 'company' && (
                  <>
                    <li>
                      <Link to="/job-posts" style={{ color: 'white', textDecoration: 'none' }}>Job Posts</Link>
                    </li>
                    <li>
                      <Link to="/applications" style={{ color: 'white', textDecoration: 'none' }}>Applications</Link>
                    </li>
                  </>
                )}

                {/* SCAD Office specific links */}
                {user.role === 'scadOffice' && (
                  <>
                    <li>
                      <Link to="/companies" style={{ color: 'white', textDecoration: 'none' }}>Companies</Link>
                    </li>
                    <li>
                      <Link to="/reports" style={{ color: 'white', textDecoration: 'none' }}>Reports</Link>
                    </li>
                  </>
                )}

                {/* Faculty specific links */}
                {user.role === 'faculty' && (
                  <li>
                    <Link to="/student-reports" style={{ color: 'white', textDecoration: 'none' }}>Student Reports</Link>
                  </li>
                )}

                <li>
                  <button 
                    onClick={handleLogout}
                    style={{
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: '1px solid white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                </li>
                <li>
                  <Link to="/company-register" style={{ color: 'white', textDecoration: 'none' }}>Company Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;