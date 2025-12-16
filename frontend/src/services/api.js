import axios from 'axios';
import React from 'react'; 

// ==================== CONFIGURATION ====================
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance for public APIs (no auth required)
const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create axios instance for admin APIs (auth required)
const adminApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== AUTH INTERCEPTORS ====================
// For admin API, add token to requests
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors for admin API
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ==================== PUBLIC APIs (No Login Required) ====================
const PublicAPI = {
  /**
   * Submit a job application (NO login required)
   * @param {FormData} formData - Application form data
   * @returns {Promise} - API response
   */
  submitApplication: async (formData) => {
    try {
      const response = await publicApi.post('/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit application' };
    }
  },

  /**
   * Get all job openings
   * @returns {Promise} - Array of job openings
   */
  getJobOpenings: async () => {
    try {
      const response = await publicApi.get('/jobs/openings');
      return response.data;
    } catch (error) {
      console.error('Error fetching job openings:', error);
      return [];
    }
  },

  /**
   * Get departments list
   * @returns {Promise} - Array of departments
   */
  getDepartments: async () => {
    try {
      const response = await publicApi.get('/departments');
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      return [];
    }
  },

  /**
   * Check application status by email and ID
   * @param {string} email - Applicant email
   * @param {string} applicationId - Application ID
   * @returns {Promise} - Application status info
   */
  checkApplicationStatus: async (email, applicationId) => {
    try {
      const response = await publicApi.get('/public/applications/status', {
        params: { email, application_id: applicationId }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Application not found' };
    }
  },

  /**
   * Contact form submission
   * @param {Object} contactData - Contact form data
   * @returns {Promise} - API response
   */
  submitContactForm: async (contactData) => {
    try {
      const response = await publicApi.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit contact form' };
    }
  },

  /**
   * Subscribe to newsletter
   * @param {string} email - Email to subscribe
   * @returns {Promise} - API response
   */
  subscribeNewsletter: async (email) => {
    try {
      const response = await publicApi.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Subscription failed' };
    }
  },

  /**
   * Submit a project request
   * @param {FormData} formData - Project request form data
   * @returns {Promise} - API response
   */
  submitProjectRequest: async (formData) => {
    try {
      const response = await publicApi.post('/projects/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.message || 
                          'Failed to submit project request';
      throw new Error(errorMessage);
    }
  },
};

// ==================== ADMIN APIs (Login Required) ====================
const AdminAPI = {
  /**
   * Admin login
   * @param {string} email - Admin email
   * @param {string} password - Admin password
   * @returns {Promise} - Auth response
   */
  login: async (email, password) => {
    try {
      const response = await publicApi.post('/admin/login', { email, password });
      
      if (response.data.access_token) {
        localStorage.setItem('admin_token', response.data.access_token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.user));
        adminApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  /**
   * Admin logout
   */
  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    delete adminApi.defaults.headers.common['Authorization'];
  },

  /**
   * Get current admin user
   * @returns {Object|null} - Admin user data
   */
  getCurrentAdmin: () => {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Check if admin is authenticated
   * @returns {boolean} - Is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  },

  /**
   * Get all applications (admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise} - Applications list
   */
  getApplications: async (params = {}) => {
    try {
      const response = await adminApi.get('/applications', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch applications' };
    }
  },

  /**
   * Get single application by ID (admin only)
   * @param {string} applicationId - Application ID
   * @returns {Promise} - Application details
   */
  getApplicationById: async (applicationId) => {
    try {
      const response = await adminApi.get(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch application' };
    }
  },

  /**
   * Update application status (admin only)
   * @param {string} applicationId - Application ID
   * @param {Object} updateData - Update data
   * @returns {Promise} - Updated application
   */
  updateApplication: async (applicationId, updateData) => {
    try {
      const response = await adminApi.patch(`/applications/${applicationId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update application' };
    }
  },

  /**
   * Get application statistics (admin only)
   * @returns {Promise} - Statistics data
   */
  getApplicationStats: async () => {
    try {
      const response = await adminApi.get('/applications/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch statistics' };
    }
  },

  /**
   * Download resume (admin only)
   * @param {string} applicationId - Application ID
   * @returns {Promise} - File blob
   */
  downloadResume: async (applicationId) => {
    try {
      const response = await adminApi.get(`/download/resume/${applicationId}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to download resume' };
    }
  },

  /**
   * Export applications to CSV (admin only)
   * @param {Object} filters - Export filters
   * @returns {Promise} - CSV file
   */
  exportApplications: async (filters = {}) => {
    try {
      const response = await adminApi.get('/applications/export', {
        params: filters,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to export applications' };
    }
  },

  /**
   * Delete application (admin only)
   * @param {string} applicationId - Application ID
   * @returns {Promise} - Delete result
   */
  deleteApplication: async (applicationId) => {
    try {
      const response = await adminApi.delete(`/applications/${applicationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete application' };
    }
  },

  /**
   * Get admin dashboard data
   * @returns {Promise} - Dashboard data
   */
  getDashboardData: async () => {
    try {
      const response = await adminApi.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard data' };
    }
  },

  /**
   * Get all project requests (admin only)
   * @param {Object} params - Query parameters
   * @returns {Promise} - Project requests list
   */
  getProjectRequests: async (params = {}) => {
    try {
      const response = await adminApi.get('/projects', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch project requests' };
    }
  },

  /**
   * Update project request status (admin only)
   * @param {string} projectId - Project ID
   * @param {Object} updateData - Update data
   * @returns {Promise} - Updated project
   */
  updateProjectRequest: async (projectId, updateData) => {
    try {
      const response = await adminApi.patch(`/projects/${projectId}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update project request' };
    }
  },
};

// ==================== UTILITY FUNCTIONS ====================
const Utils = {
  // ... (sab utils same hi hain, koi change nahi)
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  validatePhone: (phone) => {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone.replace(/\s/g, ''));
  },

  createFormData: (data, resumeFile) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    return formData;
  },

  getJobTypeOptions: () => [
    { value: 'full_time', label: 'Full Time', icon: '🕒' },
    { value: 'part_time', label: 'Part Time', icon: '⏰' },
    { value: 'contract', label: 'Contract', icon: '📝' },
    { value: 'internship', label: 'Internship', icon: '🎓' },
    { value: 'remote', label: 'Remote', icon: '🏠' },
    { value: 'hybrid', label: 'Hybrid', icon: '🏢' },
  ],

  getStatusOptions: () => [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'reviewed', label: 'Reviewed', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'shortlisted', label: 'Shortlisted', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: 'interview_scheduled', label: 'Interview Scheduled', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-200' },
    { value: 'hired', label: 'Hired', color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'withdrawn', label: 'Withdrawn', color: 'bg-gray-100 text-gray-800 border-gray-200' },
  ],

  getStatusColor: (status) => {
    const statusOption = Utils.getStatusOptions().find(s => s.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800 border-gray-200';
  },

  getStatusLabel: (status) => {
    const statusOption = Utils.getStatusOptions().find(s => s.value === status);
    return statusOption ? statusOption.label : 'Unknown';
  },

  formatDate: (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  timeAgo: (date) => {
    if (!date) return '';
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return Utils.formatDate(date);
  },

  downloadFile: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  validateResumeFile: (file, maxSizeMB = 5) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    
    if (!allowedTypes.includes(fileExtension)) {
      return {
        valid: false,
        error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
      };
    }
    
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File too large. Maximum size: ${maxSizeMB}MB`
      };
    }
    
    return { valid: true, error: null };
  },

  generateMockApplication: () => ({
    full_name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (123) 456-7890',
    job_title: 'Senior Developer',
    job_type: 'full_time',
    department: 'Engineering',
    cover_letter: 'Lorem ipsum dolor sit amet...',
    years_of_experience: '5',
    linkedin_url: 'https://linkedin.com/in/johndoe',
    github_url: 'https://github.com/johndoe',
    portfolio_url: 'https://johndoe.dev',
  }),
};

// ==================== HOOKS (For React Components) ====================
const Hooks = {
  useJobOpenings: () => {
    const [openings, setOpenings] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      const fetchOpenings = async () => {
        try {
          setLoading(true);
          const data = await PublicAPI.getJobOpenings();
          setOpenings(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchOpenings();
    }, []);

    return { openings, loading, error, refetch: () => setLoading(true) };
  },

  useApplicationSubmit: () => {
    const [submitting, setSubmitting] = React.useState(false);
    const [result, setResult] = React.useState(null);
    const [error, setError] = React.useState(null);

    const submit = async (formData, resumeFile) => {
      setSubmitting(true);
      setError(null);
      setResult(null);
      
      try {
        const formDataObj = Utils.createFormData(formData, resumeFile);
        const response = await PublicAPI.submitApplication(formDataObj);
        setResult(response);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setSubmitting(false);
      }
    };

    return { submit, submitting, result, error };
  },
};

// ==================== EXPORT ====================
const API = {
  ...PublicAPI,
  ...AdminAPI,
  ...Utils,
  ...Hooks,
  PublicAPI,
  AdminAPI,
  Utils,
  Hooks,
  publicAxios: publicApi,
  adminAxios: adminApi,
  constants: {
    MAX_RESUME_SIZE_MB: 5,
    ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx', '.txt'],
    JOB_TYPES: Utils.getJobTypeOptions(),
    STATUS_OPTIONS: Utils.getStatusOptions(),
  },
};

export default API;

// ==================== USAGE EXAMPLES ====================
/*
// Example 1: Submit job application
const submitJobApplication = async () => {
  const formData = {
    full_name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    job_title: 'Senior Developer',
    job_type: 'full_time',
  };
  
  const resumeFile = document.getElementById('resume').files[0];
  
  try {
    const result = await API.submitApplication(API.Utils.createFormData(formData, resumeFile));
    console.log('Application submitted:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example 2: Admin login and fetch applications
const adminWorkflow = async () => {
  // Login
  try {
    await API.login('admin@example.com', 'password');
    
    // Fetch applications
    const applications = await API.getApplications({ limit: 10 });
    console.log('Applications:', applications);
    
    // Get statistics
    const stats = await API.getApplicationStats();
    console.log('Statistics:', stats);
    
  } catch (error) {
    console.error('Admin error:', error);
  }
};

// Example 3: Check application status
const checkStatus = async () => {
  try {
    const status = await API.checkApplicationStatus('john@example.com', 'APP-20241214-ABC123');
    console.log('Application status:', status);
  } catch (error) {
    console.error('Status check error:', error);
  }
};

// Example 4: Download resume
const downloadResume = async (applicationId) => {
  try {
    const blob = await API.downloadResume(applicationId);
    API.Utils.downloadFile(blob, `resume-${applicationId}.pdf`);
  } catch (error) {
    console.error('Download error:', error);
  }
};
*/