import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Home,
  Info,
  Briefcase,
  ShoppingBag,
  Images,
  Phone,
  Zap,
  Code,
  Cloud,
  Lock,
  Cpu,
  Sparkles,
  Globe,
  MessageSquare,
  Bell,
  Shield,
  ExternalLink,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const servicesRef = useRef(null);
  const userMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home size={18} />,
    },
    {
      label: "About",
      path: "/about",
      icon: <Info size={18} />,
    },
    {
      label: "Services",
      path: "/services",
      icon: <Briefcase size={18} />,
      hasDropdown: true,
    },
    {
      label: "Products",
      path: "/products",
      icon: <ShoppingBag size={18} />,
    },
    {
      label: "Gallery",
      path: "/gallery",
      icon: <Images size={18} />,
    },
    {
      label: "Careers",
      path: "/careers",
      icon: <Images size={18} />,
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <Phone size={18} />,
    },
  ];

  const serviceItems = [
    {
      label: "Web Development",
      path: "/services#web",
      icon: <Code size={16} />,
      description: "Modern web applications",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Mobile Apps",
      path: "/services#mobile",
      icon: <Phone size={16} />,
      description: "iOS & Android apps",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Cloud Solutions",
      path: "/services#cloud",
      icon: <Cloud size={16} />,
      description: "Scalable cloud infrastructure",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "UI/UX Design",
      path: "/services#design",
      icon: <Sparkles size={16} />,
      description: "User-centric design",
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "IT Consulting",
      path: "/services#consulting",
      icon: <Cpu size={16} />,
      description: "Technology advisory",
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Cybersecurity",
      path: "/services#security",
      icon: <Lock size={16} />,
      description: "Enterprise security",
      color: "from-red-500 to-orange-500",
    },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Desktop: Click services to navigate, hover for dropdown
  const handleServicesClick = (e) => {
    e.preventDefault();
    navigate("/services");
  };

  const handleServicesItemClick = (path) => {
    navigate(path);
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  // Mobile: Toggle dropdown on click
  const handleMobileServicesClick = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg py-3 border-b border-gray-200/50"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-3 group"
          >
            <img
              src={logo}
              alt="VETPL Logo"
              className="
        h-14 w-14
        sm:h-15 sm:w-25 
        object-contain 
        drop-shadow-2xl 
        transition-all duration-500 ease-out
        group-hover:scale-110 
        group-hover:drop-shadow-3xl
        select-none
      "
              draggable="false"
              loading="eager"
            />
            {/* Floating glow */}
            <div className="absolute inset-0 scale-150 blur-3xl bg-gradient-to-r from-primary-600/40 to-cyan-600/40 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10"></div>

            {/* Company Name – Only on larger screens */}
            <div className="hidden md:block">
              <h1 className="text-2xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-blue-900 via-gray-800 to-primary-700 bg-clip-text text-transparent">
                VETPL
              </h1>
              <p className="text-[12px] font-extrabold text-blue-500 tracking-widest uppercase mt-0.5 opacity-90">
                VOLCANIC EDUCATION & TECHNOLOGY Pvt Ltd
              </p>
            </div>
            <div className="md:hidden font-black text-2xl bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">
              VETPL
            </div>
          </Link>
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative" ref={servicesRef}>
                {item.hasDropdown ? (
                  <div className="relative">
                    {/* Services Button - Click goes to /services, hover shows dropdown */}
                    <Link
                      to="/services"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        location.pathname.startsWith(item.path)
                          ? "text-primary-600 bg-primary-50"
                          : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-1">{item.icon}</span>
                      {item.label}
                      <ChevronDown
                        className={`ml-1 transition-transform duration-200 ${
                          isServicesOpen ? "rotate-180" : ""
                        }`}
                        size={14}
                      />
                    </Link>

                    {/* Services Dropdown - Only on hover */}
                    {isServicesOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <div className="p-4 bg-gradient-to-r from-primary-50 to-cyan-50 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center">
                              <Briefcase className="text-white" size={16} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm">
                                Our Services
                              </h3>
                              <p className="text-xs text-gray-600">
                                Digital solutions for your business
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          {serviceItems.map((service) => (
                            <Link
                              key={service.path}
                              to={service.path}
                              className="flex items-start space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <div
                                className={`h-8 w-8 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                              >
                                <div className="text-white">{service.icon}</div>
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900 text-sm group-hover:text-primary-600">
                                  {service.label}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {service.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="p-3 border-t border-gray-200 bg-gray-50">
                          <Link
                            to="/services"
                            className="inline-flex items-center text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            View all services
                            <ExternalLink className="ml-1" size={14} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                      location.pathname === item.path
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Compact */}
          <div className="flex items-center space-x-2">
            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2" ref={userMenuRef}>
                  {/* Notifications */}
                  <button className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors group">
                    <Bell
                      size={18}
                      className="text-gray-600 group-hover:text-primary-600"
                    />
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                      3
                    </span>
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <div className="text-right">
                        <div className="font-medium text-gray-900 text-xs">
                          {user?.full_name?.split(" ")[0] || "User"}
                        </div>
                        <div className="text-[10px] text-gray-500 capitalize">
                          {user?.role || "Member"}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="h-8 w-8 rounded-lg border border-white shadow-sm overflow-hidden bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.full_name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            getInitials(user?.full_name || "U")
                          )}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 border border-white"></div>
                      </div>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                        {/* User Info */}
                        <div className="p-3 bg-gradient-to-r from-primary-50 to-cyan-50">
                          <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-lg border border-white shadow-sm overflow-hidden bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                              {user?.avatar ? (
                                <img
                                  src={user.avatar}
                                  alt={user.full_name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                getInitials(user?.full_name || "U")
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 text-sm truncate">
                                {user?.full_name || "User"}
                              </div>
                              <div className="text-xs text-gray-600 truncate">
                                {user?.email || "user@example.com"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-1">
                          <button
                            onClick={() => {
                              navigate("/dashboard");
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center group"
                          >
                            <Shield className="text-gray-500 mr-2" size={16} />
                            <span className="text-sm text-gray-700">
                              Dashboard
                            </span>
                          </button>

                          <button
                            onClick={() => {
                              navigate("/dashboard/settings");
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center group"
                          >
                            <User className="text-gray-500 mr-2" size={16} />
                            <span className="text-sm text-gray-700">
                              Profile
                            </span>
                          </button>

                          <div className="border-t border-gray-200 my-1"></div>

                          <button
                            onClick={handleLogout}
                            className="w-full text-left p-2 hover:bg-red-50 rounded-lg transition-colors flex items-center group text-red-600"
                          >
                            <LogOut className="mr-2" size={16} />
                            <span className="text-sm font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/contact")}
                    className="px-3 py-1.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200 text-sm hover:shadow-md"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-gray-700" size={22} />
              ) : (
                <Menu className="text-gray-700" size={22} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t border-gray-100">
            {/* Mobile Navigation Items */}
            <div className="py-2 space-y-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  {item.hasDropdown ? (
                    <div className="space-y-1">
                      {/* Mobile Services - Click to navigate */}
                      <Link
                        to="/services"
                        className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-primary-600">
                            {item.icon}
                          </span>
                          {item.label}
                        </div>
                        <ChevronDown
                          className={`transition-transform duration-200 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                          size={16}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleMobileServicesClick();
                          }}
                        />
                      </Link>

                      {/* Services Dropdown for Mobile */}
                      {isServicesOpen && (
                        <div className="ml-6 space-y-1 bg-gray-50 rounded-lg p-2">
                          {serviceItems.map((service) => (
                            <Link
                              key={service.path}
                              to={service.path}
                              className="flex items-center w-full px-3 py-2 rounded text-gray-600 hover:text-primary-600 hover:bg-white transition-colors"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsServicesOpen(false);
                              }}
                            >
                              <div
                                className={`h-6 w-6 rounded-md bg-gradient-to-br ${service.color} flex items-center justify-center mr-2`}
                              >
                                {service.icon}
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-sm">
                                  {service.label}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {service.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2 text-primary-600">{item.icon}</span>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-3 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center px-3 py-2.5 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 rounded-lg border border-white shadow-sm overflow-hidden bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-bold mr-3">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.full_name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials(user?.full_name || "U")
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user?.full_name || "User"}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user?.role || "Member"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all text-sm"
                    >
                      <Shield className="mr-1" size={14} />
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center px-3 py-2 border border-red-500 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-all text-sm"
                    >
                      <LogOut className="mr-1" size={14} />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-2 border border-primary-500 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-all text-sm"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate("/contact");
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-medium hover:from-primary-700 hover:to-primary-800 transition-all text-sm"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>

            {/* Contact Info - Mobile */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="px-3">
                <div className="mb-2 font-medium text-gray-700">Contact Us</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone size={14} className="mr-2 text-primary-600" />
                    <span>+91 9876543210</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MessageSquare
                      size={14}
                      className="mr-2 text-primary-600"
                    />
                    <span>support@vetpl.com</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <Globe size={14} className="mr-2 text-primary-600 mt-0.5" />
                    <span>123 Tech Street, Ranchi, Jharkhand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
