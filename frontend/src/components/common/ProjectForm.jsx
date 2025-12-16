import { useState } from "react";
import { X, Upload, Send, AlertCircle, FileText, Image, File } from "lucide-react";
import API from "../../services/api";
import toast from "react-hot-toast";

const ProjectForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    project_type: "",
    budget: "",
    timeline: "",
    description: "",
    technologies: [],
    files: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const technologyOptions = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Cloud Solutions",
    "Cybersecurity",
    "AI & ML Solutions",
    "IT Consulting",
    "Database Solutions",
    "Digital Marketing",
    "E-commerce Solutions",
    "ERP Solutions",
    "CRM Development",
    "IoT Solutions",
    "Blockchain Development",
    "DevOps Services",
  ];

  const budgetOptions = [
    "Less than ₹5 Lakh",
    "₹5 Lakh - ₹10 Lakh",
    "₹10 Lakh - ₹25 Lakh",
    "₹25 Lakh - ₹50 Lakh",
    "₹50 Lakh+",
    "Not sure / Need consultation",
  ];

  const timelineOptions = [
    "Immediately (Within 1 month)",
    "1-3 Months",
    "3-6 Months",
    "6-12 Months",
    "More than 1 Year",
    "Flexible / Need discussion",
  ];

  const projectTypeOptions = [
    "New Software Development",
    "Website Redesign",
    "Mobile App Development",
    "Custom Software Solution",
    "Enterprise Software",
    "API Integration",
    "Legacy System Migration",
    "Maintenance & Support",
    "Consultation Services",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTechToggle = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech],
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
        'image/gif',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} has an unsupported file type.`);
        return false;
      }
      
      return true;
    });
    
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...validFiles],
    }));
    
    if (validFiles.length < files.length) {
      toast.error("Some files were not added due to size or type restrictions.");
    }
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('image')) return <Image size={16} className="text-blue-600" />;
    if (fileType.includes('pdf')) return <FileText size={16} className="text-red-600" />;
    if (fileType.includes('word') || fileType.includes('document')) return <FileText size={16} className="text-blue-700" />;
    if (fileType.includes('excel') || fileType.includes('sheet')) return <FileText size={16} className="text-green-600" />;
    return <File size={16} className="text-gray-600" />;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!API.validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.project_type) newErrors.project_type = "Project type is required";
    if (!formData.description.trim()) newErrors.description = "Project description is required";
    if (formData.description.trim().length < 50) newErrors.description = "Please provide at least 50 characters description";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fix the errors in the form before submitting.");
    return;
  }

  setIsSubmitting(true);
  setUploadProgress(0);

  try {
    const formDataObj = new FormData();
    
    formDataObj.append('full_name', formData.full_name);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('company', formData.company || '');
    formDataObj.append('project_type', formData.project_type);
    formDataObj.append('budget', formData.budget || 'Not specified');
    formDataObj.append('timeline', formData.timeline || 'Not specified');
    formDataObj.append('description', formData.description);
    formDataObj.append('technologies', JSON.stringify(formData.technologies));
    
    formData.files.forEach((file) => {
      formDataObj.append('files', file);  // note: 'files' multiple बार append होगा → backend को array में मिलेगा
    });

    // Real API call - यहाँ से शुरू
    const response = await API.submitProjectRequest(formDataObj);
    // ↑↑↑ यह आपकी API service में पहले से defined है और onUploadProgress भी handle करता है!

    toast.success(
      <div className="text-left">
        <p className="font-bold text-lg">✅ Project Request Submitted!</p>
        <p className="mt-1">Project ID: <span className="font-mono font-bold">{response.project_id || 'Received'}</span></p>
        <p className="text-sm mt-2">Our team will contact you soon.</p>
      </div>,
      { duration: 10000 }
    );

    setIsSubmitted(true);
    
    setTimeout(() => {
      resetForm();
      onClose();
    }, 4000);

  } catch (error) {
    console.error("Error submitting project request:", error);
    
    const errorMessage = error.message || "Failed to submit project request";
    
    toast.error(
      <div className="text-left">
        <p className="font-bold">❌ Submission Failed</p>
        <p className="text-sm mt-1">{errorMessage}</p>
        <p className="text-xs mt-2">Please try again or contact support.</p>
      </div>
    );
  } finally {
    setIsSubmitting(false);
    setUploadProgress(0);
  }
};

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      company: "",
      project_type: "",
      budget: "",
      timeline: "",
      description: "",
      technologies: [],
      files: [],
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Send className="text-green-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Request Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your project request. Our solutions team will analyze your requirements and contact you within 24 hours.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Next Steps:</span>
            </p>
            <ul className="text-left text-sm text-gray-600 mt-2 space-y-1">
              <li>• Requirements analysis by our team</li>
              <li>• Initial consultation call</li>
              <li>• Project proposal with timeline & cost</li>
              <li>• Agreement & kickoff</li>
            </ul>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              🚀 Start Your Project
            </h2>
            <p className="text-gray-600">
              Tell us about your project and we'll prepare a custom solution
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar for Upload */}
        {isSubmitting && uploadProgress > 0 && (
          <div className="px-6 pt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Uploading files... {uploadProgress}%
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.full_name ? "border-red-500" : "border-gray-300"
                  } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  placeholder="John Doe"
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  placeholder="+91 9876543210"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Your Company Pvt. Ltd."
                />
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              Project Details
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Project Type *
              </label>
              <select
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.project_type ? "border-red-500" : "border-gray-300"
                } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
              >
                <option value="">Select project type</option>
                {projectTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.project_type && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.project_type}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Estimated Budget (Optional)
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Project Timeline (Optional)
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Technologies / Services Needed (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {technologyOptions.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => handleTechToggle(tech)}
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.technologies.includes(tech)
                        ? "bg-primary-100 border-primary-500 text-primary-700"
                        : "bg-gray-100 border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              {formData.technologies.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {formData.technologies.join(", ")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Project Description *
                <span className="text-xs text-gray-500 font-normal ml-2">
                  (Minimum 50 characters)
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={6}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
                placeholder="Describe your project in detail. Include: 
• Business objectives
• Target audience
• Key features required
• Existing systems to integrate with
• Any specific technical requirements
• Success metrics..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.description}
                </p>
              )}
              <div className="mt-2 text-sm text-gray-500 flex justify-between">
                <span>{formData.description.length} characters</span>
                <span className={formData.description.length < 50 ? "text-red-500" : "text-green-500"}>
                  {formData.description.length >= 50 ? "✓ Minimum reached" : "Minimum 50 characters required"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Attach Supporting Files (Optional)
                <span className="text-xs text-gray-500 font-normal ml-2">
                  Max 10MB per file, PDF, DOC, DOCX, images, Excel files allowed
                </span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer flex flex-col items-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Upload className="text-gray-400 mb-3" size={40} />
                  <p className="text-gray-700 font-medium mb-1">
                    Drop files here or click to upload
                  </p>
                  <p className="text-gray-500 text-sm">
                    Upload requirements document, wireframes, designs, or any relevant files
                  </p>
                </label>
              </div>

              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Attached Files ({formData.files.length})
                  </p>
                  {formData.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {API.Utils.formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        disabled={isSubmitting}
                        className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-2">What happens next?</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Our team will review your requirements within 24 hours</li>
                <li>• We'll schedule a discovery call to understand your needs</li>
                <li>• You'll receive a detailed proposal with timeline & cost</li>
                <li>• Project kickoff after agreement</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {uploadProgress > 0 ? "Uploading & Submitting..." : "Submitting..."}
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Project Request
                </>
              )}
            </button>
            <p className="text-center text-gray-500 text-sm mt-3">
              By submitting, you agree to our Terms of Service and Privacy Policy.
              We respect your privacy and will not share your information.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;