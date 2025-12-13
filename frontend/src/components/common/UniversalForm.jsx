import { useState, useEffect } from "react";
import {
  Send,
  Loader,
  CheckCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  Building,
  Calendar,
  Globe,
  FileText,
  Cpu,
  Code,
  Database,
  Smartphone,
  Cloud,
  Shield,
  GraduationCap,
  Package,
  TrendingUp,
  Plus,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const UniversalForm = ({
  type = "general",
  productName = "",
  buttonText = "Submit",
  onSubmitSuccess = () => {},
  compact = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [showOtherService, setShowOtherService] = useState(false);
  const [showOtherTech, setShowOtherTech] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [otherTechInput, setOtherTechInput] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    product: productName,
    date: "",
    time: "",
    budget: "",
    service: "",
    otherService: "",
    timeline: "",
    teamSize: "",
    existingStack: "",
    otherTechnologies: "",
  });

  const formTypes = {
    product: {
      title: "Get Started",
      description: "Start using this product today",
      fields: ["name", "email", "phone", "company", "message"],
      required: ["name", "email"],
      showTech: false,
    },
    project: {
      title: "Start Your Project",
      description: "Tell us about your project requirements in detail",
      fields: [
        "name",
        "email",
        "phone",
        "company",
        "service",
        "budget",
        "timeline",
        "teamSize",
        "existingStack",
        "technologies",
        "message",
      ],
      required: ["name", "email", "service"],
      showTech: true,
    },
    contact: {
      title: "Contact Us",
      description: "Get in touch with our team",
      fields: ["name", "email", "phone", "company", "message"],
      required: ["name", "email"],
      showTech: false,
    },
    demo: {
      title: "Schedule a Demo",
      description: "Book a personalized product demo",
      fields: ["name", "email", "phone", "company", "date", "time", "message"],
      required: ["name", "email", "date", "time"],
      showTech: false,
    },
    quote: {
      title: "Get a Quote",
      description: "Request a custom quote for your needs",
      fields: [
        "name",
        "email",
        "phone",
        "company",
        "service",
        "budget",
        "technologies",
        "message",
      ],
      required: ["name", "email", "service"],
      showTech: true,
    },
    general: {
      title: "Get in Touch",
      description: "We'll get back to you soon",
      fields: ["name", "email", "phone", "message"],
      required: ["name", "email"],
      showTech: false,
    },
  };

  const services = [
    "Web Development",
    "Mobile App Development",
    "Cloud Solutions",
    "Cybersecurity Services",
    "AI & ML Solutions",
    "School ERP System",
    "Inventory & Production ERP",
    "Enterprise Software",
    "Digital Marketing",
    "Other",
  ];

  const technologies = [
    { name: "React", icon: Code, category: "Frontend" },
    { name: "Node.js", icon: Code, category: "Backend" },
    { name: "Python", icon: Cpu, category: "Backend" },
    { name: "Java", icon: Code, category: "Backend" },
    { name: "React Native", icon: Smartphone, category: "Mobile" },
    { name: "Flutter", icon: Smartphone, category: "Mobile" },
    { name: "AWS", icon: Cloud, category: "Cloud" },
    { name: "Azure", icon: Cloud, category: "Cloud" },
    { name: "MongoDB", icon: Database, category: "Database" },
    { name: "PostgreSQL", icon: Database, category: "Database" },
    { name: "Docker", icon: Package, category: "DevOps" },
    { name: "Kubernetes", icon: Package, category: "DevOps" },
  ];

  const budgets = [
    "Less than $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "More than $250,000",
    "Not sure / Need quote",
  ];

  const timelines = [
    "Immediate (1-2 weeks)",
    "Short-term (1 month)",
    "Medium-term (1-3 months)",
    "Long-term (3-6 months)",
    "Not sure / Flexible",
  ];

  const teamSizes = [
    "Just me",
    "2-5 people",
    "6-10 people",
    "11-20 people",
    "20+ people",
    "Enterprise team",
  ];

  const currentForm = formTypes[type] || formTypes.general;

  useEffect(() => {
    if (formData.service === "Other") {
      setShowOtherService(true);
    } else {
      setShowOtherService(false);
      setFormData((prev) => ({ ...prev, otherService: "" }));
    }
  }, [formData.service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechToggle = (techName) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techName)
        ? prev.filter((t) => t !== techName)
        : [...prev, techName]
    );
  };

  const handleAddOtherTech = () => {
    if (otherTechInput.trim()) {
      setSelectedTechnologies((prev) => [...prev, otherTechInput.trim()]);
      setOtherTechInput("");
      setShowOtherTech(false);
    }
  };

  const handleRemoveTech = (techName) => {
    setSelectedTechnologies((prev) => prev.filter((t) => t !== techName));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Add selected technologies to form data
    const finalFormData = {
      ...formData,
      technologies: selectedTechnologies.join(", "),
    };

    // Validate required fields
    const missingFields = currentForm.required.filter(
      (field) => !finalFormData[field]?.trim()
    );
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }

    // Log form data (for demo)
    console.log("Form submitted:", finalFormData);

    // Simulate API call
    setTimeout(() => {
      toast.success(
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-500" size={24} />
          <div>
            <div className="font-bold">Form submitted successfully!</div>
            <div className="text-sm">
              Our team will contact you within 24 hours.
            </div>
          </div>
        </div>
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        product: productName,
        date: "",
        time: "",
        budget: "",
        service: "",
        otherService: "",
        timeline: "",
        teamSize: "",
        existingStack: "",
        otherTechnologies: "",
      });
      setSelectedTechnologies([]);
      setOtherTechInput("");
      setShowOtherTech(false);
      setShowOtherService(false);

      setLoading(false);
      onSubmitSuccess();
    }, 1500);
  };

  const renderField = (field) => {
    const commonClasses =
      "w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition bg-white";

    switch (field) {
      case "name":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`${commonClasses} pl-10`}
                placeholder="John Doe"
              />
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`${commonClasses} pl-10`}
                placeholder="john@example.com"
              />
            </div>
          </div>
        );

      case "phone":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${commonClasses} pl-10`}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        );

      case "company":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Company / Organization
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`${commonClasses} pl-10`}
                placeholder="Your company name"
              />
            </div>
          </div>
        );

      case "message":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              {type === "project" ? "Project Details *" : "Message *"}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required={currentForm.required.includes("message")}
                rows="4"
                className={`${commonClasses} pl-10 resize-none`}
                placeholder={
                  type === "project"
                    ? "Tell us about your project requirements, goals, challenges, and expected outcomes..."
                    : "How can we help you?"
                }
              />
            </div>
          </div>
        );

      case "service":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Service Needed *
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className={`${commonClasses} pl-10 appearance-none`}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Other Service Input */}
            {showOtherService && (
              <div className="mt-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Please specify your service *
                </label>
                <input
                  type="text"
                  name="otherService"
                  value={formData.otherService}
                  onChange={handleChange}
                  required
                  className={commonClasses}
                  placeholder="Describe the service you need..."
                />
              </div>
            )}
          </div>
        );

      case "budget":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Estimated Budget
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`${commonClasses} pl-10 appearance-none`}
              >
                <option value="">Select budget range</option>
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case "timeline":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Project Timeline
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={commonClasses}
            >
              <option value="">Select timeline</option>
              {timelines.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </select>
          </div>
        );

      case "teamSize":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Team Size</label>
            <select
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className={commonClasses}
            >
              <option value="">Select team size</option>
              {teamSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        );

      case "existingStack":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Existing Technology Stack
            </label>
            <textarea
              name="existingStack"
              value={formData.existingStack}
              onChange={handleChange}
              rows="3"
              className={`${commonClasses} resize-none`}
              placeholder="What technologies are you currently using?"
            />
          </div>
        );

      case "technologies":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Preferred Technologies (Select all that apply)
            </label>

            {/* Technology Chips */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {selectedTechnologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="text-primary-500 hover:text-primary-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {technologies.map((tech) => (
                <button
                  type="button"
                  key={tech.name}
                  onClick={() => handleTechToggle(tech.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    selectedTechnologies.includes(tech.name)
                      ? "bg-primary-50 border-primary-300 text-primary-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tech.icon size={16} />
                  <span className="text-sm">{tech.name}</span>
                </button>
              ))}
            </div>

            {/* Other Technologies Input */}
            {showOtherTech ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otherTechInput}
                  onChange={(e) => setOtherTechInput(e.target.value)}
                  className={`${commonClasses} flex-1`}
                  placeholder="Enter technology name..."
                  onKeyPress={(e) => e.key === "Enter" && handleAddOtherTech()}
                />
                <button
                  type="button"
                  onClick={handleAddOtherTech}
                  className="px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowOtherTech(false)}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowOtherTech(true)}
                className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-primary-300 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Other Technology
              </button>
            )}
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Preferred Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className={`${commonClasses} pl-10`}
              />
            </div>
          </div>
        );

      case "time":
        return (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Preferred Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className={commonClasses}
            >
              <option value="">Select time slot</option>
              <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
              <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
              <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
              <option value="13:00-14:00">1:00 PM - 2:00 PM</option>
              <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
              <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
              <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  if (compact) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {currentForm.title}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentForm.fields.slice(0, 3).map((field) => (
            <div key={field}>{renderField(field)}</div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                {buttonText}
                <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {currentForm.title}
        </h3>
        <p className="text-gray-600">{currentForm.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentForm.fields.map((field) => (
            <div
              key={field}
              className={
                [
                  "message",
                  "service",
                  "budget",
                  "technologies",
                  "existingStack",
                ].includes(field)
                  ? "md:col-span-2"
                  : ""
              }
            >
              {renderField(field)}
            </div>
          ))}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Submitting...
              </>
            ) : (
              <>
                {buttonText}
                <Send
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </>
            )}
          </button>

          <p className="text-gray-500 text-sm mt-4 text-center">
            By submitting, you agree to our Privacy Policy. We'll never share
            your information with third parties.
          </p>
        </div>
      </form>
    </div>
  );
};

export default UniversalForm;
