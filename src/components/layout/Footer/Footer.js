import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--dark-color)',
      color: 'var(--text-light)',
      padding: 'var(--spacing-xl) 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-xl)'
        }}>
          <div>
            <h3>SCAD System</h3>
            <p>Connecting students with valuable internship opportunities.</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                <Link to="/" style={{ color: 'var(--text-light)' }}>Home</Link>
              </li>
              <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                <Link to="/internships" style={{ color: 'var(--text-light)' }}>Internships</Link>
              </li>
              <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                <Link to="/company-register" style={{ color: 'var(--text-light)' }}>Company Registration</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                <Link to="/faq" style={{ color: 'var(--text-light)' }}>FAQ</Link>
              </li>
              <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                <Link to="/guidelines" style={{ color: 'var(--text-light)' }}>Internship Guidelines</Link>
              </li>
              <li style={{ marginBottom: 'var(--spacing-sm)' }}>
                <Link to="/contact" style={{ color: 'var(--text-light)' }}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <p>Email: scad@example.edu</p>
            <p>Phone: +1 (555) 123-4567</p>
            <div style={{ 
              display: 'flex', 
              gap: 'var(--spacing-md)', 
              marginTop: 'var(--spacing-md)' 
            }}>
              <a href="#" style={{ color: 'var(--text-light)' }}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" style={{ color: 'var(--text-light)' }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" style={{ color: 'var(--text-light)' }}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div style={{ 
          borderTop: '1px solid var(--gray-color)', 
          marginTop: 'var(--spacing-xl)', 
          paddingTop: 'var(--spacing-md)', 
          textAlign: 'center' 
        }}>
          <p>&copy; {new Date().getFullYear()} SCAD System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;