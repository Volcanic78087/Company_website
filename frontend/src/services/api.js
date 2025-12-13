// src/services/api.js
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Helper function to prepare form data for your backend
const prepareApplicationFormData = (job, applicationData, resumeFile) => {
  const formData = new FormData();
  
  // Required fields (must match your backend)
  formData.append('full_name', applicationData.name);
  formData.append('email', applicationData.email);
  formData.append('phone', applicationData.phone);
  formData.append('job_title', job.title);
  
  // Optional fields
  if (applicationData.linkedin) {
    formData.append('linkedin_url', applicationData.linkedin);
  }
  
  if (applicationData.portfolio) {
    formData.append('portfolio_url', applicationData.portfolio);
  }
  
  if (applicationData.experience) {
    formData.append('years_of_experience', applicationData.experience);
  }
  
  if (applicationData.coverLetter) {
    formData.append('cover_letter', applicationData.coverLetter);
  }
  
  // Add GitHub if available (optional)
  if (applicationData.github) {
    formData.append('github_url', applicationData.github);
  }
  
  // Add job type and department
  formData.append('job_type', job.type || 'full_time');
  if (job.department) {
    formData.append('department', job.department);
  }
  
  // Add resume file (MUST be last)
  if (resumeFile) {
    formData.append('resume', resumeFile);
  }
  
  return formData;
};

// File validation helper
export const fileValidator = {
  validateFile: (file) => {
    const validTypes = ['application/pdf', 'application/msword', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Check file size
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    // Check by extension
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      throw new Error('Please upload a PDF, DOC, or DOCX file');
    }

    return true;
  },

  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

// Main API service
const apiService = {
  // Submit job application
  submitApplication: async (job, applicationData, resumeFile) => {
    try {
      console.log('📤 Submitting application to backend...');
      console.log('Job:', job.title);
      console.log('Applicant:', applicationData.name);
      
      // Prepare form data for your specific backend
      const formData = prepareApplicationFormData(job, applicationData, resumeFile);
      
      // Log form data (for debugging)
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? `${value.name} (${value.size} bytes)` : value);
      }
      
      const response = await fetch(`${API_BASE_URL}/apply`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header for FormData - browser sets it automatically
      });

      console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        let errorDetail = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorDetail = errorData.detail || errorDetail;
        } catch (e) {
          // If response is not JSON, get text
          const errorText = await response.text();
          if (errorText) errorDetail = errorText;
        }
        throw new Error(errorDetail);
      }

      const result = await response.json();
      console.log('✅ Application submitted successfully:', result);
      return result;
      
    } catch (error) {
      console.error('❌ Submit error:', error);
      
      // Check for specific error types
      if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Please check if backend is running.');
      }
      
      if (error.message.includes('CORS')) {
        throw new Error('CORS error. Please check backend CORS configuration.');
      }
      
      throw error;
    }
  },

  // Get job openings
  getJobOpenings: async () => {
    try {
      console.log('🔄 Fetching job openings...');
      const response = await fetch(`${API_BASE_URL}/jobs/openings`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('📥 Jobs response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: HTTP ${response.status}`);
      }

      const jobs = await response.json();
      console.log(`✅ Loaded ${jobs.length} jobs from API`);
      return jobs;
      
    } catch (error) {
      console.error('Get jobs error:', error);
      
      // Fallback to sample data
      console.log('Using sample job data as fallback');
      return [
        {
          id: 1,
          title: "Senior Frontend Developer",
          department: "engineering",
          type: "Full-time",
          location: "Remote",
          experience: "5+ years",
          salary: "$120,000 - $160,000",
          description: "Build cutting-edge user interfaces.",
          skills: ["React", "TypeScript", "Next.js"],
          urgent: true,
        },
        {
          id: 2,
          title: "UX/UI Designer",
          department: "design",
          type: "Full-time",
          location: "Remote",
          experience: "3+ years",
          salary: "$90,000 - $130,000",
          description: "Create beautiful user experiences.",
          skills: ["Figma", "UI/UX Design", "Prototyping"],
          urgent: false,
        },
      ];
    }
  },

  // Health check
  checkHealth: async () => {
    try {
      console.log('🔄 Checking API health...');
      const response = await fetch(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`Health check failed: HTTP ${response.status}`);
      }

      return await response.json();
      
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  },

  // Get stats
  getStats: async () => {
    try {
      console.log('🔄 Fetching stats...');
      const response = await fetch(`${API_BASE_URL}/applications/stats`);
      
      console.log('📥 Stats response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: HTTP ${response.status}`);
      }

      const stats = await response.json();
      console.log('✅ Loaded stats from API:', stats);
      return stats;
      
    } catch (error) {
      console.error('Get stats error:', error);
      
      // Return sample stats
      return {
        total: 245,
        pending: 120,
        reviewed: 75,
        shortlisted: 35,
        hired: 15,
        rejected: 0
      };
    }
  },

  // Get applications (for admin)
  getApplications: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      return await response.json();
    } catch (error) {
      console.error('Get applications error:', error);
      return [];
    }
  }
};

export default apiService;