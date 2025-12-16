import { useState, useEffect } from "react";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";
import ProductInquiryForm from "../components/common/ProductInquiryForm";
import FreeTrialForm from "../components/common/FreeTrialForm";
import {
  ShoppingCart, Star, TrendingUp, Users, Zap, Shield, Globe, BarChart,
  CheckCircle, ArrowRight, Download, Sparkles, Rocket, Target, PieChart,
  Server, GitBranch, BookOpen, Clock, Award, ShieldCheck, Cpu, Database,
  Cloud, Bell, TrendingDown, Filter, Heart, Eye, Share2, ChevronRight,
  Play, X, Menu,
} from "lucide-react";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Form visibility states
  const [showProductForm, setShowProductForm] = useState(false);
  const [showTrialForm, setShowTrialForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Form data states
  const [productFormData, setProductFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    message: "",
  });

  const [trialFormData, setTrialFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    interestedIn: "",
    timeline: "",
  });

  // Fixed: Proper handling of Get Started
 const handleGetStarted = (product) => {
  
  setCurrentProduct(product);
  setProductFormData(prev => ({ ...prev, product: product.name }));
  setShowProductForm(true);
};
  const handleStartTrial = () => {
    setShowTrialForm(true);
  };

  const handleProductFormSubmit = (e) => {
    e.preventDefault();
    console.log("Product Inquiry Submitted:", productFormData);
    alert(`Thank you for your interest in ${productFormData.product}! We'll contact you soon.`);
    setShowProductForm(false);
    setProductFormData({
      name: "", email: "", phone: "", company: "", product: "", message: "",
    });
    setCurrentProduct(null);
  };

  const handleTrialFormSubmit = (e) => {
    e.preventDefault();
    console.log("Trial Request Submitted:", trialFormData);
    alert("Thank you for requesting a free trial! We'll contact you within 24 hours.");
    setShowTrialForm(false);
    setTrialFormData({
      name: "", email: "", phone: "", company: "", employees: "", interestedIn: "", timeline: "",
    });
  };

  const categories = [
    { id: "all", label: "All Products", count: 6, icon: Rocket },
    { id: "saas", label: "SaaS Solutions", count: 2, icon: Cloud },
    { id: "enterprise", label: "Enterprise", count: 2, icon: Server },
    { id: "analytics", label: "Analytics", count: 2, icon: PieChart },
    { id: "security", label: "Security", count: 1, icon: ShieldCheck },
  ];

  const products = [
    {
      id: 1,
      name: "CRM Pro",
      category: "saas",
      description:
        "Complete customer relationship management solution with AI-powered insights and automation.",
      price: "$49",
      period: "per month",
      features: [
        "AI-Powered Lead Scoring",
        "Automated Sales Pipeline",
        "Customer Support Suite",
        "Advanced Reporting",
        "Mobile App",
        "API Access",
      ],
      rating: 4.8,
      reviews: 1247,
      users: "500+",
      popular: true,
      trending: true,
      color: "from-blue-500 to-cyan-500",
      icon: Target,
      badge: "Most Popular",
    },
    {
      id: 2,
      name: "Inventory & Production ERP",
      category: "enterprise",
      description:
        "Comprehensive enterprise resource planning for growing businesses with global operations.",
      price: "$299",
      period: "per month",
      features: [
        "Inventory Management",
        "Accounting & Finance",
        "HR & Payroll",
        "Supply Chain",
        "Multi-Currency",
        "Custom Modules",
      ],
      rating: 4.6,
      reviews: 842,
      users: "200+",
      popular: true,
      trending: false,
      color: "from-purple-500 to-pink-500",
      icon: Database,
      badge: "Enterprise Ready",
    },
    {
      id: 3,
      name: "School ERP",
      category: "enterprise",
      description:
        "Comprehensive education management system for educational institutions.",
      price: "$199",
      period: "per year",
      features: [
        "Student Management System",
        "Academic Progress Tracking",
        "HR & Payroll",
        "Custom Modules",
      ],
      rating: 4.7,
      reviews: 900,
      users: "100+",
      popular: true,
      trending: true,
      color: "from-indigo-500 to-purple-500",
      icon: BookOpen,
      badge: "Education Focused",
    },
    {
      id: 4,
      name: "Analytics Dashboard",
      category: "analytics",
      description:
        "Real-time business intelligence with predictive analytics and customizable dashboards.",
      price: "$89",
      period: "per month",
      features: [
        "Real-time Data Visualization",
        "Custom Reports Builder",
        "Predictive Analytics",
        "API Integration",
        "Team Collaboration",
        "Export Any Format",
      ],
      rating: 4.9,
      reviews: 932,
      users: "300+",
      popular: false,
      trending: true,
      color: "from-orange-500 to-red-500",
      icon: BarChart,
      badge: "Editor's Choice",
    },
    {
      id: 5,
      name: "SecureVault",
      category: "security",
      description:
        "Enterprise-grade data protection with end-to-end encryption and compliance management.",
      price: "$129",
      period: "per month",
      features: [
        "End-to-End Encryption",
        "Granular Access Control",
        "Audit Logs & Monitoring",
        "GDPR & HIPAA Compliance",
        "Automated Backups",
        "24/7 Threat Monitoring",
      ],
      rating: 4.7,
      reviews: 567,
      users: "150+",
      popular: true,
      trending: false,
      color: "from-green-500 to-emerald-500",
      icon: Shield,
      badge: "Security First",
    },
    {
      id: 6,
      name: "ProjectFlow",
      category: "saas",
      description:
        "Project management and team collaboration tool with agile workflow automation.",
      price: "$29",
      period: "per month",
      features: [
        "Kanban & Gantt Charts",
        "Time Tracking & Invoicing",
        "Team Chat & Video Calls",
        "File Sharing & Storage",
        "Client Portal",
        "Integration Hub",
      ],
      rating: 4.5,
      reviews: 2314,
      users: "1000+",
      popular: false,
      trending: true,
      color: "from-cyan-500 to-blue-500",
      icon: GitBranch,
      badge: "Fastest Growing",
    },
    {
      id: 7,
      name: "MarketInsight",
      category: "analytics",
      description:
        "Market research and competitor analysis platform with AI-driven insights.",
      price: "$199",
      period: "per month",
      features: [
        "Real-time Market Trends",
        "Competitor Tracking",
        "Consumer Behavior Analysis",
        "AI Forecasting",
        "Custom Dashboards",
        "Export & Share Reports",
      ],
      rating: 4.8,
      reviews: 428,
      users: "1000+",
      popular: true,
      trending: false,
      color: "from-violet-500 to-purple-500",
      icon: TrendingUp,
      badge: "Premium",
    },
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "CTO, TechCorp Inc.",
      text: "CRM Pro transformed our sales process. Our conversion rates increased by 40% in just 3 months! The AI insights are game-changing.",
      rating: 5,
      avatar: "JS",
      product: "CRM Pro",
    },
    {
      name: "Sarah Johnson",
      role: "Operations Director, Global Enterprises",
      text: "The ERP Suite streamlined our operations across 5 countries. Implementation was smooth and the ROI was realized in under 6 months.",
      rating: 5,
      avatar: "SJ",
      product: "ERP Suite",
    },
    {
      name: "Mike Chen",
      role: "Founder, StartUp XYZ",
      text: "Analytics Dashboard gave us insights we never had before. Data-driven decisions have boosted our growth by 200% year-over-year.",
      rating: 4,
      avatar: "MC",
      product: "Analytics Dashboard",
    },
    {
      name: "Dr. Michael Chen",
      role: "Principal, Green Valley Schools",
      text: "School ERP Suite revolutionized our institution's management. Parent engagement increased by 60% and administrative work reduced by half.",
      rating: 5,
      avatar: "MC",
      product: "School ERP",
    },
  ];

  const stats = [
    {
      value: "1,000+",
      label: "Active Customers",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      value: "99.9%",
      label: "Uptime SLA",
      icon: Shield,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      value: "24/7",
      label: "Support",
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      value: "4.8/5",
      label: "Customer Rating",
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
  ];

   const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-cyan-600">
          <div className="relative container mx-auto px-4 py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="text-white" size={16} />
                <span className="text-white font-semibold text-sm">
                  Our Product Suite
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                <span className="block">Software Solutions</span>
                <span className="text-cyan-200">That Scale With You</span>
              </h1>

              <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                Discover our suite of innovative software products designed to
                solve complex business challenges, drive growth, and deliver
                exceptional ROI.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`h-10 w-10 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-3`}
                    >
                      <stat.icon className={stat.color} size={20} />
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-primary-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/90">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                      : "bg-gray-50 text-gray-700 hover:text-primary-600 hover:bg-gray-100 border border-gray-200 hover:border-primary-200"
                  }`}
                >
                  <category.icon size={18} />
                  {category.label}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeCategory === category.id
                        ? "bg-white/20"
                        : "bg-gray-200"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2"
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.popular && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">Popular</span>
                  )}
                  {product.trending && (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">Trending</span>
                  )}
                </div>

                {/* Main Content */}
                <div className="p-6 relative z-0">
                  {/* Icon + Price */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center shadow-lg`}>
                      <product.icon className="text-white" size={28} />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{product.price}</div>
                      <div className="text-gray-500 text-sm">{product.period}</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {product.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="text-primary-600 mr-3" size={16} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Rating + Users */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className="text-yellow-400" />
                        ))}
                        <span className="ml-1 font-semibold">{product.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Users size={16} className="mr-1" />
                        {product.users}
                      </div>
                    </div>
                  </div>

                  {/* Buttons - YEH SABSE SAFE HAI */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleGetStarted(product)}
                      className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <ShoppingCart size={18} />
                      Get Started
                      <ArrowRight size={16} />
                    </button>
                    <button className="w-12 h-12 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 transition">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {/* Hover Effects - Inhe button ke upar mat aane dena */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`pointer-events-none h-1 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-gray-600">
                See what our customers have to say about their experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-center mb-6">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-primary-600 font-semibold">
                      Using: {testimonial.product}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-cyan-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>

            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful businesses already using our
              products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartTrial}
                className="group px-8 py-3.5 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </button>

              <button className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Play size={18} />
                Watch Demo
              </button>
            </div>

            <div className="mt-8 text-primary-100 text-sm flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>30-day money back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Free onboarding support</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Product Inquiry Form */}
      <ProductInquiryForm
        showProductForm={showProductForm}
        setShowProductForm={setShowProductForm}
        currentProduct={currentProduct}
        productFormData={productFormData}
        setProductFormData={setProductFormData}
        handleProductFormSubmit={handleProductFormSubmit}
      />

      {/* Free Trial Form */}
      <FreeTrialForm
        showTrialForm={showTrialForm}
        setShowTrialForm={setShowTrialForm}
        trialFormData={trialFormData}
        setTrialFormData={setTrialFormData}
        handleTrialFormSubmit={handleTrialFormSubmit}
      />
    </div>
  );
};

export default Products;