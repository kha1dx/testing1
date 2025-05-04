import React, { useState } from 'react';

// Mock data for company job posts
const mockJobPosts = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    duration: "3 months",
    paid: true,
    salary: "$1200/month",
    location: "New York, NY",
    skills: ["JavaScript", "React", "HTML", "CSS"],
    description: "Join our development team to create responsive web applications using modern JavaScript frameworks.",
    applications: 12,
    status: "active",
    createdAt: "2025-04-01"
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    duration: "4 months",
    paid: true,
    salary: "$1300/month",
    location: "San Francisco, CA",
    skills: ["Node.js", "Express", "MongoDB", "API Development"],
    description: "Work with our backend team to develop and maintain APIs and server-side applications.",
    applications: 8,
    status: "active",
    createdAt: "2025-04-05"
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    duration: "6 months",
    paid: true,
    salary: "$1100/month",
    location: "Remote",
    skills: ["Figma", "Adobe XD", "UI Design", "User Research"],
    description: "Help design intuitive user interfaces and experiences for our products.",
    applications: 15,
    status: "active",
    createdAt: "2025-04-10"
  }
];

const JobPostManagement = () => {
  const [jobPosts, setJobPosts] = useState(mockJobPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState('');
  const [showJobPostForm, setShowJobPostForm] = useState(false);
  const [selectedJobPost, setSelectedJobPost] = useState(null);
  
  // Form state for creating/editing job posts
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    paid: true,
    salary: '',
    location: '',
    skills: '',
    description: ''
  });

  // Handle search and filters
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter job posts
  const filteredJobPosts = jobPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDuration = 
      durationFilter === '' || 
      (durationFilter === '3 months or less' && parseInt(post.duration) <= 3) ||
      (durationFilter === '3-6 months' && parseInt(post.duration) > 3 && parseInt(post.duration) <= 6) ||
      (durationFilter === 'Over 6 months' && parseInt(post.duration) > 6);
    
    const matchesPaid = 
      paidFilter === '' || 
      (paidFilter === 'Paid' && post.paid) ||
      (paidFilter === 'Unpaid' && !post.paid);
    
    return matchesSearch && matchesDuration && matchesPaid;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Open job post form for creating a new post
  const handleCreateJobPost = () => {
    setFormData({
      title: '',
      duration: '',
      paid: true,
      salary: '',
      location: '',
      skills: '',
      description: ''
    });
    setSelectedJobPost(null);
    setShowJobPostForm(true);
  };

  // Open job post form for editing an existing post
  const handleEditJobPost = (post) => {
    setFormData({
      title: post.title,
      duration: post.duration.split(' ')[0], // Extract the number from "3 months"
      paid: post.paid,
      salary: post.salary || '',
      location: post.location,
      skills: post.skills.join(', '),
      description: post.description
    });
    setSelectedJobPost(post);
    setShowJobPostForm(true);
  };

  // Submit job post form (create or update)
  const handleSubmitJobPost = (e) => {
    e.preventDefault();
    
    const skillsArray = formData.skills.split(',').map(skill => skill.trim());
    
    if (selectedJobPost) {
      // Update existing job post
      setJobPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === selectedJobPost.id
            ? {
                ...post,
                title: formData.title,
                duration: `${formData.duration} months`,
                paid: formData.paid,
                salary: formData.paid ? formData.salary : null,
                location: formData.location,
                skills: skillsArray,
                description: formData.description
              }
            : post
        )
      );
    } else {
      // Create new job post
      const newJobPost = {
        id: Date.now(),
        title: formData.title,
        duration: `${formData.duration} months`,
        paid: formData.paid,
        salary: formData.paid ? formData.salary : null,
        location: formData.location,
        skills: skillsArray,
        description: formData.description,
        applications: 0,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setJobPosts(prevPosts => [...prevPosts, newJobPost]);
    }
    
    // Close the form
    setShowJobPostForm(false);
  };

  // Delete a job post
  const handleDeleteJobPost = (postId) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      setJobPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Manage Job Posts</h1>
        <button onClick={handleCreateJobPost} className="btn-primary">Create New Job Post</button>
      </div>
      
      {/* Search and Filter Section */}
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="search">Search by job title</label>
            <input 
              type="text" 
              id="search" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div>
            <label htmlFor="duration">Filter by Duration</label>
            <select 
              id="duration" 
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
            >
              <option value="">All Durations</option>
              <option value="3 months or less">3 months or less</option>
              <option value="3-6 months">3-6 months</option>
              <option value="Over 6 months">Over 6 months</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="paid">Filter by Compensation</label>
            <select 
              id="paid" 
              value={paidFilter}
              onChange={(e) => setPaidFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>
        
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button onClick={() => {
            setSearchTerm('');
            setDurationFilter('');
            setPaidFilter('');
          }}>
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Job Posts List */}
      <div style={{ marginTop: '2rem' }}>
        {filteredJobPosts.length === 0 ? (
          <div className="card text-center">
            <p>No job posts match your search criteria.</p>
          </div>
        ) : (
          filteredJobPosts.map(post => (
            <div key={post.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{post.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span><strong>Duration:</strong> {post.duration}</span>
                    <span><strong>Compensation:</strong> {post.paid ? 'Paid' : 'Unpaid'}</span>
                    {post.paid && <span><strong>Salary:</strong> {post.salary}</span>}
                    <span><strong>Location:</strong> {post.location}</span>
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Skills:</strong>{' '}
                    {post.skills.map((skill, index) => (
                      <span 
                        key={index}
                        style={{
                          backgroundColor: 'var(--light-color)',
                          padding: '0.1rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.875rem',
                          marginRight: '0.25rem'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <p><strong>Description:</strong> {post.description}</p>
                  </div>
                  <div>
                    <span><strong>Applications:</strong> {post.applications}</span>
                    <span style={{ marginLeft: '1rem' }}><strong>Posted On:</strong> {post.createdAt}</span>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleEditJobPost(post)}
                      style={{ 
                        backgroundColor: 'var(--info-color)', 
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteJobPost(post.id)}
                      style={{ 
                        backgroundColor: 'var(--danger-color)', 
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <a 
                    href={`/applications?job=${post.id}`} 
                    style={{ 
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      color: 'var(--primary-color)',
                      textDecoration: 'underline'
                    }}
                  >
                    View Applications ({post.applications})
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Job Post Form Modal */}
      {showJobPostForm && (
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
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>{selectedJobPost ? 'Edit Job Post' : 'Create New Job Post'}</h2>
              <button 
                onClick={() => setShowJobPostForm(false)}
                style={{ 
                  backgroundColor: 'transparent', 
                  color: 'var(--text-primary)',
                  fontSize: '1.5rem',
                  padding: '0.25rem 0.5rem'
                }}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmitJobPost}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="title">Job Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="duration">Duration (months)</label>
                <input 
                  type="number" 
                  id="duration" 
                  name="duration" 
                  min="1" 
                  max="12" 
                  value={formData.duration} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input 
                    type="checkbox" 
                    name="paid" 
                    checked={formData.paid} 
                    onChange={handleInputChange} 
                    style={{ width: 'auto' }}
                  />
                  Paid Internship
                </label>
              </div>
              
              {formData.paid && (
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="salary">Salary</label>
                  <input 
                    type="text" 
                    id="salary" 
                    name="salary" 
                    placeholder="e.g. $1200/month" 
                    value={formData.salary} 
                    onChange={handleInputChange} 
                    required={formData.paid} 
                  />
                </div>
              )}
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  placeholder="e.g. New York, NY or Remote" 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="skills">Required Skills (comma separated)</label>
                <input 
                  type="text" 
                  id="skills" 
                  name="skills" 
                  placeholder="e.g. JavaScript, React, HTML, CSS" 
                  value={formData.skills} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="description">Job Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows="5" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button type="submit" className="btn-primary">
                  {selectedJobPost ? 'Update Job Post' : 'Create Job Post'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setShowJobPostForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostManagement;