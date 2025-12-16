import { useState, useEffect } from "react";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import toast from "react-hot-toast";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Award,
  Users,
  Zap,
  TrendingUp,
  Heart,
  ChevronRight,
  Filter,
  X,
  Sparkles,
  Target,
  Globe,
  Coffee,
  Gamepad2,
  Monitor,
  BookOpen,
  GraduationCap,
  Shield,
  Brain,
  Palette,
  Code,
  Database,
  Cloud,
  Smartphone,
  Lock,
  MessageSquare,
  BrainCircuit,
  Rocket,
  Leaf,
  Trophy,
  Calendar,
  CheckCircle,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

// Import API service
import API from "../services/api";

const Careers = () => {
  // State for filters and search
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for job selection and application
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for fetched job openings
  const [jobOpenings, setJobOpenings] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Application form data
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    experience: "",
    coverLetter: "",
    resume: null,
  });

  // Fetch job openings and departments on component mount
  useEffect(() => {
    fetchJobData();
  }, []);

  /**
   * Fetch job openings and departments from API
   */
  const fetchJobData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch job openings
      const openings = await API.getJobOpenings();
      setJobOpenings(openings || []);
      
      // Fetch departments
      const depts = await API.getDepartments();
      setDepartments(depts || []);
      
    } catch (error) {
      console.error("Error fetching job data:", error);
      toast.error("Failed to load job openings. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };

  // Job categories - generated dynamically from fetched data
  const categories = [
    { id: "all", label: "All Roles", count: jobOpenings.length, icon: Briefcase },
    { id: "engineering", label: "Engineering", 
      count: jobOpenings.filter(j => j.department === "engineering").length, 
      icon: Code 
    },
    { id: "design", label: "Design", 
      count: jobOpenings.filter(j => j.department === "design").length, 
      icon: Palette 
    },
    { id: "product", label: "Product", 
      count: jobOpenings.filter(j => j.department === "product").length, 
      icon: Target 
    },
    { id: "data", label: "Data Science", 
      count: jobOpenings.filter(j => j.department === "data").length, 
      icon: Brain 
    },
    { id: "marketing", label: "Marketing", 
      count: jobOpenings.filter(j => j.department === "marketing").length, 
      icon: TrendingUp 
    },
  ];

  // Perks & Benefits
  const perks = [
    {
      icon: DollarSign,
      title: "Competitive Salary",
      description: "Industry-leading compensation with equity options",
    },
    {
      icon: Globe,
      title: "Remote First",
      description: "Work from anywhere with flexible hours",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and mental health coverage",
    },
    {
      icon: BookOpen,
      title: "Learning Budget",
      description: "$5,000 annual budget for courses, books, and conferences",
    },
    {
      icon: Calendar,
      title: "Unlimited PTO",
      description: "Take time off when you need it, no questions asked",
    },
    {
      icon: Trophy,
      title: "Career Growth",
      description: "Clear promotion paths and mentorship programs",
    },
    {
      icon: Coffee,
      title: "Wellness Stipend",
      description: "$500 monthly for health, fitness, and home office",
    },
    {
      icon: Gamepad2,
      title: "Fun & Games",
      description: "Team building activities and gaming sessions",
    },
  ];

  // Company values
  const values = [
    {
      icon: Users,
      title: "Collaboration First",
      description: "We believe in working together to solve hard problems",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Zap,
      title: "Move Fast",
      description: "Ship quickly, learn constantly, and iterate often",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      icon: Brain,
      title: "Stay Curious",
      description: "Always ask why and explore new possibilities",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: Shield,
      title: "Own Your Work",
      description: "Take responsibility and pride in what you build",
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  // Team testimonials
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Senior Engineer",
      tenure: "3 years",
      quote:
        "The freedom to work remotely while tackling challenging technical problems has been incredible. The culture of continuous learning keeps me growing every day.",
      avatar: "AC",
    },
    {
      name: "Maria Rodriguez",
      role: "Product Designer",
      tenure: "2 years",
      quote:
        "I've never worked at a company that values design as much as TechVision. My ideas are heard and implemented, and I get to work on products that impact millions.",
      avatar: "MR",
    },
    {
      name: "David Kim",
      role: "Data Scientist",
      tenure: "1 year",
      quote:
        "The mentorship I've received here has accelerated my career growth. The challenging problems we solve make every day exciting and rewarding.",
      avatar: "DK",
    },
    {
      name: "Sarah Johnson",
      role: "Engineering Manager",
      tenure: "4 years",
      quote:
        "Watching our team grow from 10 to 100+ while maintaining our collaborative culture has been amazing. Leadership truly cares about work-life balance.",
      avatar: "SJ",
    },
  ];

  /**
   * Filter jobs based on category and search query
   */
  const filteredJobs = jobOpenings.filter((job) => {
    const matchesCategory =
      activeFilter === "all" || job.department === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.skills && job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ));

    return matchesCategory && matchesSearch;
  });

  /**
   * Handle job application button click
   */
  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  /**
   * Reset application form
   */
  const resetForm = () => {
    setApplicationData({
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      portfolio: "",
      experience: "",
      coverLetter: "",
      resume: null,
    });
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  /**
   * Handle application form submission
   */
  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validation
    if (!API.validateEmail(applicationData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!API.validatePhone(applicationData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (!applicationData.resume) {
      toast.error("Please upload your resume");
      return;
    }

    // Validate resume file
    const fileValidation = API.Utils.validateResumeFile(applicationData.resume, 5);
    if (!fileValidation.valid) {
      toast.error(fileValidation.error);
      return;
    }

    setIsSubmitting(true);
    console.log("🚀 Submitting application...");

    try {
      // Prepare form data
      const formData = API.Utils.createFormData({
        full_name: applicationData.name,
        email: applicationData.email,
        phone: applicationData.phone,
        linkedin_url: applicationData.linkedin || '',
        github_url: applicationData.github || '',
        portfolio_url: applicationData.portfolio || '',
        years_of_experience: applicationData.experience || '',
        cover_letter: applicationData.coverLetter || '',
        job_title: selectedJob?.title || 'General Application',
        job_type: (selectedJob?.type || 'full_time').toLowerCase().replace('-', '_'),
        department: selectedJob?.department || '',
      }, applicationData.resume);

      console.log("📋 FormData fields:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}: ${value instanceof File ? value.name + ` (${value.size} bytes)` : value}`);
      }

      // Submit using API
      const result = await API.submitApplication(formData);
      
      // Success message
      toast.success(
        <div className="text-left">
          <p className="font-bold text-lg">✅ Application Submitted Successfully!</p>
          <p className="mt-1">Application ID: <span className="font-mono font-bold">{result.application_id}</span></p>
          <p className="text-sm mt-2">We've received your application and will contact you soon.</p>
        </div>,
        { duration: 10000 }
      );

      // Reset form
      resetForm();
      
    } catch (error) {
      console.error("❌ Submission error:", error);
      
      // Show detailed error message
      const errorMessage = error.message || 
                          error.detail || 
                          "Failed to submit application. Please try again.";
      
      toast.error(
        <div className="text-left">
          <p className="font-bold">❌ Application Failed</p>
          <p className="text-sm mt-1">{errorMessage}</p>
          <p className="text-xs mt-2">Please check your details and try again.</p>
        </div>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle file selection
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = API.Utils.validateResumeFile(file, 5);
      if (!validation.valid) {
        toast.error(validation.error);
        e.target.value = "";
        return;
      }
      setApplicationData({ ...applicationData, resume: file });
      toast.success(`Resume uploaded: ${file.name}`);
    }
  };

  /**
   * Get department icon based on department name
   */
  const getDepartmentIcon = (department) => {
    const icons = {
      engineering: Code,
      design: Palette,
      product: Target,
      data: Brain,
      marketing: TrendingUp,
    };
    return icons[department] || Briefcase;
  };

  /**
   * Get department display name
   */
  const getDepartmentName = (department) => {
    const names = {
      engineering: "Engineering",
      design: "Design",
      product: "Product",
      data: "Data Science",
      marketing: "Marketing",
    };
    return names[department] || department;
  };

  /**
   * Format date to relative time
   */
  const formatRelativeTime = (dateString) => {
    if (!dateString) return "Recently";
    return API.Utils.timeAgo(dateString);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="text-white" size={16} />
                <span className="text-white font-semibold text-sm">
                  We're Hiring!
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                <span className="block">Build The Future</span>
                <span className="text-pink-200">With Us</span>
              </h1>

              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Join our mission to revolutionize software development. Work
                with brilliant minds, solve challenging problems, and grow your
                career at a company that values innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("open-positions")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="group px-8 py-3.5 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  View Open Positions
                  <ChevronRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </button>
                <button className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  Meet Our Team
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-white/80 text-sm">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {jobOpenings.length}
                  </div>
                  <div className="text-white/80 text-sm">Open Positions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">3+</div>
                  <div className="text-white/80 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">4.8</div>
                  <div className="text-white/80 text-sm">Employee Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Culture & Values
              </h2>
              <p className="text-gray-600">
                These principles guide everything we do, from hiring to product
                development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div
                    className={`h-16 w-16 rounded-2xl ${value.bg} flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110`}
                  >
                    <value.icon className={`${value.color}`} size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perks & Benefits */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perks & Benefits
              </h2>
              <p className="text-gray-600">
                We take care of our team so you can focus on doing your best
                work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {perks.map((perk, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                    <perk.icon className="text-purple-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
                  <p className="text-gray-600 text-sm">{perk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hear From Our Team
              </h2>
              <p className="text-gray-600">
                Don't just take our word for it. Here's what our team members
                have to say.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-start mb-6">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-500 text-xs">
                        • {testimonial.tenure}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 italic mb-4">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section
          id="open-positions"
          className="py-20 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Open Positions
              </h2>
              <p className="text-gray-600">
                Find your perfect role and join our growing team.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search jobs by title, skills, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                        activeFilter === category.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : "bg-white text-gray-700 border border-gray-300 hover:border-purple-300"
                      }`}
                    >
                      <category.icon size={18} />
                      {category.label}
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          activeFilter === category.id
                            ? "bg-white/20"
                            : "bg-gray-100"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  Showing{" "}
                  <span className="font-bold">{filteredJobs.length}</span> of{" "}
                  <span className="font-bold">{jobOpenings.length}</span>{" "}
                  positions
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Remote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span>Urgent Hiring</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-16">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Clock className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Loading Job Openings...
                </h3>
                <p className="text-gray-600">
                  Fetching the latest opportunities for you
                </p>
              </div>
            )}

            {/* Jobs Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => {
                  const DepartmentIcon = getDepartmentIcon(job.department);
                  
                  return (
                    <div
                      key={job.id}
                      className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Urgent Badge */}
                      {job.urgent && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          Urgent
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                          <DepartmentIcon className="text-purple-600" size={24} />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700">
                                {job.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                {job.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {job.salary}
                              </div>
                              <div className="text-gray-500 text-sm">per year</div>
                            </div>
                          </div>

                          {/* Job Details */}
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={16} />
                              <span className="text-sm">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Briefcase size={16} />
                              <span className="text-sm">
                                {getDepartmentName(job.department)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock size={16} />
                              <span className="text-sm">{job.experience}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Award size={16} />
                              <span className="text-sm">
                                Posted {formatRelativeTime(job.posted)}
                              </span>
                            </div>
                          </div>

                          {/* Skills */}
                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {job.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleApply(job)}
                              className="flex-1 group/btn bg-gradient-to-r from-blue-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                              Apply Now
                              <ChevronRight
                                className="group-hover/btn:translate-x-1 transition-transform"
                                size={16}
                              />
                            </button>
                            <button
                              onClick={() => setSelectedJob(job)}
                              className="h-12 w-12 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors"
                            >
                              <ExternalLink size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No positions found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                  className="px-6 py-2.5 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Hiring Process
              </h2>
              <p className="text-gray-600">
                Transparent, respectful, and designed to help you succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Application Review",
                  description: "We review your application within 48 hours",
                  duration: "1-2 days",
                },
                {
                  step: "2",
                  title: "Initial Screening",
                  description: "30-minute call with our recruiting team",
                  duration: "30 mins",
                },
                {
                  step: "3",
                  title: "Technical Interview",
                  description:
                    "Skills assessment with the team you'll work with",
                  duration: "1-2 hours",
                },
                {
                  step: "4",
                  title: "Offer & Onboarding",
                  description: "Welcome to the team!",
                  duration: "1 week",
                },
              ].map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                      <span className="text-2xl font-bold text-purple-600">
                        {step.step}
                      </span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-200 to-pink-200"></div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {step.description}
                  </p>
                  <div className="text-xs text-gray-500">{step.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Don't See Your Dream Role?
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We're always looking for talented people. Send us your resume and
              tell us how you can contribute.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSelectedJob({
                    title: "General Application",
                    department: "general",
                    type: "full_time",
                  });
                  setShowApplicationForm(true);
                }}
                className="group px-8 py-3.5 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Submit General Application
                <ChevronRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </button>

              <a
                href="mailto:careers@techvision.com"
                className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Contact HR
              </a>
            </div>

            <div className="mt-8 text-white/80 text-sm flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>Equal Opportunity Employer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Visa Sponsorship Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Inclusive Workplace</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowApplicationForm(false);
            }
          }}
        >
          <div className="relative bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl z-[10000] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowApplicationForm(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Apply for {selectedJob.title}
              </h3>
              <p className="text-gray-600">
                Fill in your details and upload your resume to apply
              </p>
            </div>

            <form onSubmit={handleApplicationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicationData.name}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={applicationData.email}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicationData.phone}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Linkedin
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="url"
                      value={applicationData.linkedin}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          linkedin: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <Code
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="url"
                      value={applicationData.github}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          github: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="github.com/username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio Website
                  </label>
                  <input
                    type="url"
                    value={applicationData.portfolio}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        portfolio: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="portfolio.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  required
                  value={applicationData.experience}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      experience: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-7">5-7 years</option>
                  <option value="7+">7+ years</option>
                </select>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume / CV *
                </label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors group cursor-pointer">
                  {applicationData.resume ? (
                    <div className="text-left">
                      <div className="flex items-center gap-3">
                        <BookOpen className="text-purple-600" size={24} />
                        <div>
                          <p className="font-medium text-gray-900">
                            {applicationData.resume.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {API.Utils.formatFileSize(applicationData.resume.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const fileInput = document.createElement('input');
                          fileInput.type = 'file';
                          fileInput.accept = '.pdf,.doc,.docx,.txt';
                          fileInput.onchange = (e) => handleFileChange(e);
                          fileInput.click();
                        }}
                        className="mt-3 text-sm text-purple-600 hover:text-purple-700"
                      >
                        Change File
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="text-purple-600" size={24} />
                      </div>
                      <p className="text-gray-600 mb-2">
                        Drop your resume here or click to browse
                      </p>
                      <p className="text-gray-500 text-sm">
                        PDF, DOC, DOCX, TXT up to 5MB
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      coverLetter: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="4"
                  placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                />
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="rounded mt-1"
                />
                <label htmlFor="privacy" className="text-left">
                  I agree to the privacy policy and consent to my data being
                  processed for recruitment purposes.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;