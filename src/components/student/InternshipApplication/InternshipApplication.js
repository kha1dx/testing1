import React, { useState } from 'react';

const InternshipApplication = ({ internship, onClose }) => {
  const [formData, setFormData] = useState({
    coverLetter: '',
    availability: '',
    expectedSalary: internship.paid ? '' : 'N/A',
    questions: '',
  });
  
  const [documents, setDocuments] = useState({
    resume: null,
    coverLetterDoc: null,
    transcripts: null,
    additionalDocs: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (name === 'additionalDocs') {
      setDocuments({
        ...documents,
        [name]: [...documents.additionalDocs, ...files]
      });
    } else {
      setDocuments({
        ...documents,
        [name]: files[0]
      });
    }
  };
  
  const removeAdditionalDoc = (index) => {
    const newAdditionalDocs = [...documents.additionalDocs];
    newAdditionalDocs.splice(index, 1);
    setDocuments({
      ...documents,
      additionalDocs: newAdditionalDocs
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    }
    
    if (!formData.availability.trim()) {
      newErrors.availability = 'Availability information is required';
    }
    
    if (internship.paid && !formData.expectedSalary.trim()) {
      newErrors.expectedSalary = 'Expected salary is required for paid internships';
    }
    
    if (!documents.resume) {
      newErrors.resume = 'Resume/CV is required';
    }
    
    if (!documents.transcripts) {
      newErrors.transcripts = 'Academic transcripts are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        
        // In a real application, you would submit the form data and documents to your backend
        console.log('Form submitted:', { formData, documents });
      }, 1500);
    }
  };
  
  // Format file size
  const formatFileSize = (size) => {
    if (size < 1024) {
      return size + ' bytes';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(1) + ' KB';
    } else {
      return (size / (1024 * 1024)).toFixed(1) + ' MB';
    }
  };
  
  return (
    <div className="internship-application">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Apply for {internship.title}</h2>
        <button 
          onClick={onClose}
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
      
      {submitted ? (
        <div className="card" style={{ backgroundColor: '#f0fff4', textAlign: 'center', padding: '2rem' }}>
          <h3 style={{ color: 'var(--success-color)', marginBottom: '1rem' }}>Application Submitted Successfully!</h3>
          <p>Your application for <strong>{internship.title}</strong> at <strong>{internship.company}</strong> has been submitted.</p>
          <p>You can track the status of your application in the "My Applications" section.</p>
          <button 
            onClick={onClose} 
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>Company & Internship Details</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <img 
                src={internship.companyLogo} 
                alt={`${internship.company} logo`} 
                style={{ width: '60px', height: '60px', borderRadius: '4px' }}
              />
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{internship.company}</h4>
                <p style={{ margin: 0 }}>{internship.location}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <p><strong>Position:</strong> {internship.title}</p>
                <p><strong>Industry:</strong> {internship.industry}</p>
              </div>
              <div>
                <p><strong>Duration:</strong> {internship.duration}</p>
                <p><strong>Compensation:</strong> {internship.paid ? `${internship.salary}` : 'Unpaid'}</p>
              </div>
            </div>
          </div>
          
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>Application Details</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows="6"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Introduce yourself and explain why you're interested in this internship and how your skills align with the requirements..."
                className={errors.coverLetter ? 'error' : ''}
              ></textarea>
              {errors.coverLetter && <span className="error-message">{errors.coverLetter}</span>}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="availability">Availability</label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                placeholder="When can you start? What is your availability during the internship period?"
                className={errors.availability ? 'error' : ''}
              />
              {errors.availability && <span className="error-message">{errors.availability}</span>}
            </div>
            
            {internship.paid && (
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="expectedSalary">Expected Salary/Stipend (optional)</label>
                <input
                  type="text"
                  id="expectedSalary"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  placeholder="What are your salary expectations? (Leave blank if the listed amount is acceptable)"
                  className={errors.expectedSalary ? 'error' : ''}
                />
                {errors.expectedSalary && <span className="error-message">{errors.expectedSalary}</span>}
              </div>
            )}
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="questions">Questions for the Employer (optional)</label>
              <textarea
                id="questions"
                name="questions"
                rows="4"
                value={formData.questions}
                onChange={handleInputChange}
                placeholder="Do you have any questions about the internship, company, or application process?"
              ></textarea>
            </div>
          </div>
          
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3>Documents</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="resume">Resume/CV <span style={{ color: 'var(--danger-color)' }}>*</span></label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className={errors.resume ? 'error' : ''}
              />
              {errors.resume && <span className="error-message">{errors.resume}</span>}
              {documents.resume && (
                <div style={{ 
                  marginTop: '0.5rem', 
                  padding: '0.5rem',
                  backgroundColor: 'var(--light-color)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    {documents.resume.name} ({formatFileSize(documents.resume.size)})
                  </span>
                  <button 
                    type="button"
                    onClick={() => setDocuments({ ...documents, resume: null })}
                    style={{ 
                      backgroundColor: 'transparent',
                      color: 'var(--danger-color)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
              <small>Upload your most recent resume (PDF, DOC, or DOCX).</small>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="coverLetterDoc">Cover Letter Document (optional)</label>
              <input
                type="file"
                id="coverLetterDoc"
                name="coverLetterDoc"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              {documents.coverLetterDoc && (
                <div style={{ 
                  marginTop: '0.5rem', 
                  padding: '0.5rem',
                  backgroundColor: 'var(--light-color)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    {documents.coverLetterDoc.name} ({formatFileSize(documents.coverLetterDoc.size)})
                  </span>
                  <button 
                    type="button"
                    onClick={() => setDocuments({ ...documents, coverLetterDoc: null })}
                    style={{ 
                      backgroundColor: 'transparent',
                      color: 'var(--danger-color)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
              <small>You can upload a formatted cover letter if you prefer (in addition to the text above).</small>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="transcripts">Academic Transcripts <span style={{ color: 'var(--danger-color)' }}>*</span></label>
              <input
                type="file"
                id="transcripts"
                name="transcripts"
                onChange={handleFileChange}
                accept=".pdf"
                className={errors.transcripts ? 'error' : ''}
              />
              {errors.transcripts && <span className="error-message">{errors.transcripts}</span>}
              {documents.transcripts && (
                <div style={{ 
                  marginTop: '0.5rem', 
                  padding: '0.5rem',
                  backgroundColor: 'var(--light-color)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    {documents.transcripts.name} ({formatFileSize(documents.transcripts.size)})
                  </span>
                  <button 
                    type="button"
                    onClick={() => setDocuments({ ...documents, transcripts: null })}
                    style={{ 
                      backgroundColor: 'transparent',
                      color: 'var(--danger-color)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
              <small>Upload your academic transcripts (PDF only).</small>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="additionalDocs">Additional Documents (optional)</label>
              <input
                type="file"
                id="additionalDocs"
                name="additionalDocs"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                multiple
              />
              <small>Upload any additional documents like certificates, work samples, letters of recommendation, etc.</small>
              
              {documents.additionalDocs.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <p style={{ margin: '0.5rem 0' }}><strong>Additional Documents:</strong></p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {documents.additionalDocs.map((doc, index) => (
                      <li 
                        key={index}
                        style={{ 
                          padding: '0.5rem',
                          backgroundColor: 'var(--light-color)',
                          borderRadius: '4px',
                          marginBottom: '0.5rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>
                          {doc.name} ({formatFileSize(doc.size)})
                        </span>
                        <button 
                          type="button"
                          onClick={() => removeAdditionalDoc(index)}
                          style={{ 
                            backgroundColor: 'transparent',
                            color: 'var(--danger-color)',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <button 
              type="button" 
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              style={{ flex: 1 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InternshipApplication;