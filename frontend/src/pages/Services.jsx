import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import ProjectForm from "../components/common/ProjectForm";

import {
  Code,
  Palette,
  Smartphone,
  Cloud,
  Shield,
  TrendingUp,
  Database,
  Cpu,
  Globe,
  Zap,
  Server,
  BarChart3,
  Users,
  Lock,
  MessageSquare,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Rocket,
  Terminal,
  Layers,
  GitBranch,
  Workflow,
} from "lucide-react";

const Services = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  const techItems = [
    { name: "React", color: "text-blue-600", bg: "bg-blue-100" },
    {
      name: "Node.js",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "Laravel",
      color: "text-blue-600",
      bg: "bg-green-100",
    },
    {
      name: "Python",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    { name: "AWS", color: "text-orange-600", bg: "bg-orange-100" },
    {
      name: "MongoDB",
      color: "text-green-700",
      bg: "bg-green-100",
    },
    { name: "Docker", color: "text-blue-700", bg: "bg-blue-100" },
    {
      name: "Kubernetes",
      color: "text-blue-800",
      bg: "bg-blue-100",
    },
    {
      name: "Redis",
      color: "text-purple-800",
      bg: "bg-blue-100",
    },
    {
      name: "Artificial Intelligence",
      color: "text-black-700",
      bg: "bg-orange-100",
    },
    {
      name: "Machine learning",
      color: "text-orange-700",
      bg: "bg-orange-100",
    },
    {
      name: "Deep Learning",
      color: "text-gray-700",
      bg: "bg-orange-100",
    },
    {
      name: "NLP",
      color: "text-orange-700",
      bg: "bg-orange-100",
    },
    {
      name: "Computer Vision",
      color: "text-pink-700",
      bg: "bg-orange-100",
    },
    {
      name: "GenAI",
      color: "text-orange-700",
      bg: "bg-orange-100",
    },
  ];

  const services = [
    {
      id: "web",
      icon: Code,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks like React, Next.js, and Node.js for superior performance and scalability.",
      features: [
        "React/Next.js Development",
        "Node.js Backend",
        "API Integration",
        "Progressive Web Apps",
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      category: "development",
      popular: true,
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      features: [
        "iOS Swift Development",
        "Android Kotlin",
        "React Native",
        "Flutter Apps",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      category: "development",
      popular: true,
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "User-centered design solutions that create engaging, intuitive, and visually stunning digital experiences.",
      features: [
        "User Research & Testing",
        "Wireframing & Prototyping",
        "Design Systems",
        "Interaction Design",
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      category: "design",
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure, migration, and optimization services across all major cloud platforms.",
      features: [
        "AWS Cloud Services",
        "Azure Solutions",
        "Google Cloud Platform",
        "DevOps & CI/CD",
      ],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      category: "infrastructure",
      popular: true,
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Comprehensive cybersecurity protection including DDoS mitigation, SQL injection prevention, and MITM attack defense for your digital assets",
      features: [
        "Security Audits",
        "Penetration Testing",
        "Compliance & GDPR",
        "Threat Monitoring",
        "DDoS Attack Protection",
        "SQL Injection Prevention",
        "MITM Attack Defense",
      ],
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      category: "security",
    },
    {
      icon: TrendingUp,
      title: "IT Consulting",
      description:
        "Strategic technology consulting to optimize operations, drive digital transformation, and maximize ROI.",
      features: [
        "Digital Strategy",
        "Technology Audit",
        "Process Optimization",
        "Digital Transformation",
      ],
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      category: "consulting",
    },
    {
      icon: Database,
      title: "Database Solutions",
      description:
        "Custom database design, optimization, and management for high-performance data operations.",
      features: [
        "PostgreSQL/MySQL",
        "MongoDB/NoSQL",
        "Database Optimization",
        "Data Migration",
      ],
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      category: "development",
    },
    {
      icon: Cpu,
      title: "AI & ML Solutions",
      description:
        "Artificial intelligence and machine learning solutions to automate processes and gain insights from data.",
      features: [
        "Machine Learning Models",
        "Natural Language Processing",
        "Computer Vision",
        "Predictive Analytics",
      ],
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      category: "ai",
      popular: true,
    },
    {
      icon: Globe,
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies to increase online visibility and drive business growth.",
      features: [
        "SEO Optimization",
        "Social Media Marketing",
        "Content Strategy",
        "Performance Analytics",
      ],
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      category: "marketing",
    },
  ];

  const categories = [
    { id: "all", label: "All Services", count: services.length },
    {
      id: "development",
      label: "Development",
      count: services.filter((s) => s.category === "development").length,
    },
    {
      id: "design",
      label: "Design",
      count: services.filter((s) => s.category === "design").length,
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      count: services.filter((s) => s.category === "infrastructure").length,
    },
    {
      id: "security",
      label: "Security",
      count: services.filter((s) => s.category === "security").length,
    },
    {
      id: "consulting",
      label: "Consulting",
      count: services.filter((s) => s.category === "consulting").length,
    },
  ];

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((service) => service.category === activeTab);

  const stats = [
    { icon: Zap, value: "65+", label: "Projects Completed" },
    { icon: Users, value: "125+", label: "Happy Clients" },
    { icon: Globe, value: "3+", label: "Countries Served" },
    { icon: Rocket, value: "99%", label: "Client Satisfaction" },
  ];

  return (
    <div>
      <Header />
      <ProjectForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-primary-500/10 to-primary-600/10 blur-3xl"></div>
          <div className="absolute bottom-40 -left-40 h-60 w-60 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 backdrop-blur-sm mb-6">
              <Sparkles className="text-primary-600" size={16} />
              <span className="text-primary-700 font-semibold text-sm">
                Our Expertise
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent">
                Technology Services
              </span>
              <br />
              <span className="text-gray-800">That Drive Innovation</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              We deliver cutting-edge technology solutions that transform
              businesses, enhance efficiency, and create sustainable competitive
              advantages in the digital landscape.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        index === 0
                          ? "bg-blue-100 text-blue-600"
                          : index === 1
                          ? "bg-green-100 text-green-600"
                          : index === 2
                          ? "bg-purple-100 text-purple-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      <stat.icon size={20} />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === category.id
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                    : "bg-white text-gray-700 hover:text-primary-600 hover:bg-gray-50 border border-gray-200 hover:border-primary-200"
                }`}
              >
                {category.label}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === category.id ? "bg-white/20" : "bg-gray-100"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-primary-300 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                      Popular
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  {/* Icon */}
                  <div
                    className={`mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="text-white" size={28} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                      <CheckCircle className="text-primary-600" size={16} />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-gray-700 text-sm"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                {/* Bottom Gradient Border */}
                <div
                  className={`h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-cyan-600"></div>

            <div className="relative z-10 p-8 md:p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-primary-100 mb-8 text-lg">
                  Let's discuss how our technology solutions can drive your
                  digital transformation journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="group px-8 py-3.5 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Start Your Project
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={18}
                    />
                  </button>

                  <button
                    onClick={() => navigate("/contact")}
                    className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    Book a Consultation
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-6 text-primary-100 text-sm">
                  <div className="flex items-center gap-2">
                    <Terminal size={16} />
                    <span>No upfront costs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers size={16} />
                    <span>Flexible engagement models</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch size={16} />
                    <span>Agile development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Workflow size={16} />
                    <span>Dedicated support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Technologies We Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {techItems.map((tech, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className={`font-semibold ${tech.color}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
