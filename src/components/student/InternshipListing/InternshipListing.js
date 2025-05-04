import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../App';
import InternshipApplication from '../InternshipApplication/InternshipApplication';

const InternshipListing = () => {
  const { user } = useContext(AuthContext);
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    paid: false,
    duration: '',
    search: ''
  });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mocked data for demonstration
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          title: 'Software Engineering Intern',
          company: 'TechCorp',
          companyLogo: 'https://via.placeholder.com/60',
          location: 'Cairo, Egypt',
          industry: 'Technology',
          description: 'Join our dynamic team to develop cutting-edge web applications using React, Node.js, and MongoDB.',
          requirements: [
            'Currently pursuing a degree in Computer Science or related field',
            'Knowledge of JavaScript and modern web frameworks',
            'Strong problem-solving skills',
            'Ability to work in a team environment'
          ],
          duration: '3 months',
          paid: true,
          salary: 'EGP 5,000/month',
          deadline: '2025-06-01',
          postedDate: '2025-04-15'
        },
        {
          id: 2,
          title: 'Data Science Intern',
          company: 'AnalyticsPro',
          companyLogo: 'https://via.placeholder.com/60',
          location: 'Alexandria, Egypt',
          industry: 'Technology',
          description: 'Help us analyze large datasets and build predictive models to derive business insights.',
          requirements: [
            'Currently pursuing a degree in Data Science, Statistics, or Computer Science',
            'Experience with Python, R, or similar data analysis tools',
            'Knowledge of statistical methods and machine learning algorithms',
            'Strong analytical and critical thinking skills'
          ],
          duration: '4 months',
          paid: true,
          salary: 'EGP 6,000/month',
          deadline: '2025-05-15',
          postedDate: '2025-04-10'
        },
        {
          id: 3,
          title: 'Marketing Intern',
          company: 'BrandWave',
          companyLogo: 'https://via.placeholder.com/60',
          location: 'Cairo, Egypt',
          industry: 'Marketing',
          description: 'Assist in developing and implementing marketing strategies for various clients.',
          requirements: [
            'Currently pursuing a degree in Marketing, Business, or Communications',
            'Creative mindset and excellent communication skills',
            'Knowledge of social media platforms and digital marketing trends',
            'Ability to work under pressure and meet deadlines'
          ],
          duration: '2 months',
          paid: false,
          deadline: '2025-05-20',
          postedDate: '2025-04-05'
        },
        {
          id: 4,
          title: 'Finance Intern',
          company: 'EcoFinance',
          companyLogo: 'https://via.placeholder.com/60',
          location: 'Giza, Egypt',
          industry: 'Finance',
          description: 'Gain practical experience in financial analysis, reporting, and budgeting.',
          requirements: [
            'Currently pursuing a degree in Finance, Accounting, or Business Administration',
            'Strong analytical skills and attention to detail',
            'Proficiency in Excel and financial software',
            'Knowledge of basic accounting principles'
          ],
          duration: '6 months',
          paid: true,
          salary: 'EGP 4,500/month',
          deadline: '2025-06-10',
          postedDate: '2025-04-20'
        },
        {
          id: 5,
          title: 'Graphic Design Intern',
          company: 'VisualWorks',
          companyLogo: 'https://via.placeholder.com/60',
          location: 'Cairo, Egypt',
          industry: 'Design',
          description: 'Create engaging visual content for digital and print media.',
          requirements: [
            'Currently pursuing a degree in Graphic Design, Visual Arts, or related field',
            'Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
            'Strong portfolio showcasing design skills',
            'Eye for detail and creativity'
          ],
          duration: '3 months',
          paid: true,
          salary: 'EGP 4,000/month',
          deadline: '2025-05-30',
          postedDate: '2025-04-12'
        }
      ];
      
      setInternships(mockData);
      setFilteredInternships(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter internships based on user selection
  useEffect(() => {
    let filteredResults = internships;
    
    if (filters.industry) {
      filteredResults = filteredResults.filter(internship => internship.industry === filters.industry);
    }
    
    if (filters.location) {
      filteredResults = filteredResults.filter(internship => internship.location.includes(filters.location));
    }
    
    if (filters.paid) {
      filteredResults = filteredResults.filter(internship => internship.paid);
    }
    
    if (filters.duration) {
      // Convert duration to months for comparison
      const durationInMonths = parseInt(filters.duration);
      filteredResults = filteredResults.filter(internship => {
        const internshipDuration = parseInt(internship.duration.split(' ')[0]);
        if (durationInMonths <= 3) {
          return internshipDuration <= 3;
        } else if (durationInMonths <= 6) {
          return internshipDuration > 3 && internshipDuration <= 6;
        } else {
          return internshipDuration > 6;
        }
      });
    }
    
    if (filters.search) {
      const searchQuery = filters.search.toLowerCase();
      filteredResults = filteredResults.filter(internship => 
        internship.title.toLowerCase().includes(searchQuery) ||
        internship.company.toLowerCase().includes(searchQuery) ||
        internship.description.toLowerCase().includes(searchQuery)
      );
    }
    
    setFilteredInternships(filteredResults);
  }, [filters, internships]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      industry: '',
      location: '',
      paid: false,
      duration: '',
      search: ''
    });
  };

  // Open application modal
  const openApplicationModal = (internship) => {
    setSelectedInternship(internship);
    setShowModal(true);
  };

  // Close application modal
  const closeApplicationModal = () => {
    setShowModal(false);
  };

  // Get unique industries from internships data
  const uniqueIndustries = [...new Set(internships.map(internship => internship.industry))];
  
  // Get unique locations from internships data
  const uniqueLocations = [...new Set(internships.map(internship => internship.location.split(',')[0].trim()))];

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until deadline
  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 0) {
      return 'Expired';
    } else if (daysDiff === 0) {
      return 'Last day to apply!';
    } else {
      return `${daysDiff} days remaining`;
    }
  };

  return (
    <div className="internship-listing">
      <div className="filters card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <h3>Filter Internships</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label htmlFor="industry">Industry</label>
            <select 
              id="industry" 
              name="industry" 
              value={filters.industry} 
              onChange={handleFilterChange}
            >
              <option value="">All Industries</option>
              {uniqueIndustries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="location">Location</label>
            <select 
              id="location" 
              name="location" 
              value={filters.location} 
              onChange={handleFilterChange}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="duration">Duration</label>
            <select 
              id="duration" 
              name="duration" 
              value={filters.duration} 
              onChange={handleFilterChange}
            >
              <option value="">Any Duration</option>
              <option value="3">Up to 3 months</option>
              <option value="6">3-6 months</option>
              <option value="7">More than 6 months</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              id="paid" 
              name="paid" 
              checked={filters.paid} 
              onChange={handleFilterChange}
              style={{ marginRight: '0.5rem' }}
            />
            <label htmlFor="paid">Paid Only</label>
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="search">Search</label>
          <input 
            type="text" 
            id="search" 
            name="search" 
            value={filters.search} 
            onChange={handleFilterChange} 
            placeholder="Search by title, company, or keywords"
          />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={clearFilters}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      <div className="results">
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Available Internships ({filteredInternships.length})</h3>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading internships...</p>
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No internships match your search criteria.</p>
            <button 
              onClick={clearFilters}
              className="btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredInternships.map(internship => (
            <div 
              key={internship.id} 
              className="card"
              style={{ 
                marginBottom: '1.5rem', 
                padding: '1.5rem',
                borderLeft: internship.paid ? '4px solid var(--success-color)' : '4px solid var(--primary-color)'
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flexShrink: 0 }}>
                  <img 
                    src={internship.companyLogo} 
                    alt={`${internship.company} logo`} 
                    style={{ width: '60px', height: '60px', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.25rem 0' }}>{internship.title}</h3>
                  <p style={{ margin: '0 0 0.25rem 0' }}><strong>{internship.company}</strong> • {internship.location}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ 
                      backgroundColor: 'var(--light-color)', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {internship.industry}
                    </span>
                    <span style={{ 
                      backgroundColor: 'var(--light-color)', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {internship.duration}
                    </span>
                    <span style={{ 
                      backgroundColor: internship.paid ? 'var(--success-bg-color)' : 'var(--light-color)', 
                      color: internship.paid ? 'var(--success-color)' : 'inherit',
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px',
                      fontSize: '0.875rem'
                    }}>
                      {internship.paid ? internship.salary : 'Unpaid'}
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ 
                    textAlign: 'right',
                    color: new Date(internship.deadline) < new Date() ? 'var(--danger-color)' : 'inherit'
                  }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>
                      <strong>Deadline:</strong> {formatDate(internship.deadline)}
                    </p>
                    <p style={{ 
                      margin: 0,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      color: new Date(internship.deadline) < new Date() ? 'var(--danger-color)' : 
                             calculateDaysRemaining(internship.deadline) === 'Last day to apply!' ? 'var(--warning-color)' : 
                             'inherit'
                    }}>
                      {calculateDaysRemaining(internship.deadline)}
                    </p>
                  </div>
                  <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => openApplicationModal(internship)}
                      className="btn-primary"
                      disabled={new Date(internship.deadline) < new Date()}
                    >
                      {new Date(internship.deadline) < new Date() ? 'Expired' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <h4>Description</h4>
                <p>{internship.description}</p>
              </div>
              
              <div>
                <h4>Requirements</h4>
                <ul>
                  {internship.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <p>Posted on {formatDate(internship.postedDate)}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {showModal && selectedInternship && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <InternshipApplication 
              internship={selectedInternship} 
              onClose={closeApplicationModal} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipListing;