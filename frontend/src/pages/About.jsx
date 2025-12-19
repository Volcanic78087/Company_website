import { useState } from "react";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import ProjectForm from "../components/common/ProjectForm";
import {
  Users,
  Target,
  Award,
  Globe,
  Sparkles,
  Rocket,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  GitBranch,
  Code,
  Palette,
  Cloud,
  Smartphone,
  Star,
  Linkedin,
  Twitter,
  Mail,
  ChevronRight,
  Quote,
  Trophy,
  Clock,
  CheckCircle,
  Cpu,
  Building,
  ArrowRight,
} from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [hoveredMember, setHoveredMember] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const tabs = [
    { id: "mission", label: "Our Mission", icon: Target },
    { id: "vision", label: "Our Vision", icon: Rocket },
    { id: "values", label: "Core Values", icon: Heart },
  ];

  const stats = [
    {
      icon: Users,
      value: "25+",
      label: "Team Members",
      description: "Global experts",
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
    },
    {
      icon: Trophy,
      value: "65+",
      label: "Projects",
      description: "Successfully delivered",
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
    },
    {
      icon: Award,
      value: "5+",
      label: "Awards",
      description: "Industry recognition",
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
    },
    {
      icon: Globe,
      value: "3+",
      label: "Countries",
      description: "Global presence",
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50",
    },
  ];

  const coreValues = [
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly push boundaries with cutting-edge solutions",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Building trust through transparency and ethical practices",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "Committed to delivering superior quality in everything",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: GitBranch,
      title: "Collaboration",
      description: "Working together to achieve extraordinary results",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const expertise = [
    {
      name: "Web Development",
      icon: Code,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      name: "Cloud Solutions",
      icon: Cloud,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      name: "Mobile Apps",
      icon: Smartphone,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "AI Solutions",
      icon: Cpu,
      color: "text-yellow-600",
      bg: "bg-green-100",
    },
    {
      name: "ERP Softwares",
      icon: Building,
      color: "text-blue-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <Header />
      <ProjectForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-primary-500/10 to-primary-600/10 blur-3xl"></div>
          <div className="absolute bottom-40 -left-40 h-60 w-60 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"></div>
        </div>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-cyan-600">
          <div className="relative container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="text-white" size={16} />
                <span className="text-white font-semibold text-sm">
                  Our Story
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                <span className="block">Building the Future,</span>
                <span className="text-cyan-200">One Line at a Time</span>
              </h1>

              <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                We're a passionate team of innovators, creators, and
                problem-solvers dedicated to transforming businesses through
                technology.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative -mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div
                    className={`h-14 w-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <stat.icon className="text-white" size={24} />
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>

                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>

                  <div className="text-sm text-gray-500">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission/Vision/Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                        : "bg-white text-gray-700 hover:text-primary-600 hover:bg-gray-50 border border-gray-200 hover:border-primary-200"
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                {activeTab === "mission" && (
                  <div className="max-w-3xl mx-auto text-center">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Target className="text-white" size={32} />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Our Mission
                    </h2>

                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      To empower businesses of all sizes with innovative
                      technology solutions that simplify complex processes,
                      enhance productivity, and drive sustainable growth in an
                      ever-evolving digital landscape.
                    </p>

                    <p className="text-gray-600 leading-relaxed">
                      We believe in creating software that not only meets
                      current needs but also anticipates future challenges,
                      ensuring our clients stay ahead of the competition and
                      achieve their boldest ambitions.
                    </p>
                  </div>
                )}

                {activeTab === "vision" && (
                  <div className="max-w-3xl mx-auto text-center">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Rocket className="text-white" size={32} />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Our Vision
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      To be the global leader in delivering transformative
                      digital solutions that redefine industry standards, create
                      lasting value for our clients, and shape a future where
                      technology empowers human potential to its fullest.
                    </p>

                    <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-cyan-50 rounded-2xl border border-primary-100">
                      <p className="text-primary-700 font-semibold">
                        "We don't just build software, we build possibilities."
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "values" && (
                  <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                      Our Core Values
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {coreValues.map((value, index) => (
                        <div
                          key={index}
                          className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`h-14 w-14 rounded-xl ${value.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                            >
                              <value.icon className={value.color} size={24} />
                            </div>

                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {value.title}
                              </h3>
                              <p className="text-gray-600">
                                {value.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Expertise
              </h2>
              <p className="text-gray-600">
                Specialized skills that drive digital transformation
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {expertise.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`h-12 w-12 rounded-xl ${skill.bg} flex items-center justify-center mx-auto mb-4`}
                  >
                    <skill.icon className={skill.color} size={24} />
                  </div>

                  <h3 className="font-bold text-gray-900">{skill.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-cyan-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>

            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses who have transformed their operations
              with our technology solutions.
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

              <button className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105">
                View Case Studies
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    
    </div>
  );
};

export default About;
