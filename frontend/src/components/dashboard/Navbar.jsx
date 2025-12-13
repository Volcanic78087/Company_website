import { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  X,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const helpRef = useRef(null);
  const userMenuRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "New message",
      description: "You have a new message from John",
      time: "5 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Project Update",
      description: 'Project "Website Redesign" is 75% complete',
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "System Alert",
      description: "Scheduled maintenance tonight at 2 AM",
      time: "3 hours ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelp(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleProfileClick = () => {
    window.location.href = "/dashboard/settings";
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

  const getUserRoleColor = () => {
    if (!user) return "bg-gray-100 text-gray-800";

    switch (user.role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "developer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-gray-900">
                {getGreeting()}, {user?.full_name?.split(" ")[0] || "User"}!
              </h1>
              <p className="text-sm text-gray-600">
                {user?.department || "Department"} Dashboard
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search projects, reports, or users..."
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Help Button */}
            <div className="relative" ref={helpRef}>
              <button
                onClick={() => {
                  setShowHelp(!showHelp);
                  setShowNotifications(false);
                  setShowUserMenu(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition relative group"
                aria-label="Help"
              >
                <HelpCircle size={20} className="text-gray-600" />
                <div className="absolute -bottom-10 right-0 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Help Center
                </div>
              </button>

              {showHelp && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b bg-gray-50">
                    <h4 className="font-bold text-gray-900">Need help?</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      We're here to assist you
                    </p>
                  </div>

                  <div className="p-2">
                    <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition flex items-center">
                      <HelpCircle size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">
                          View Documentation
                        </div>
                        <div className="text-xs text-gray-500">
                          Browse our guides
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition flex items-center">
                      <User size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Contact Support
                        </div>
                        <div className="text-xs text-gray-500">
                          Get live assistance
                        </div>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition flex items-center">
                      <Bell size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Watch Tutorials
                        </div>
                        <div className="text-xs text-gray-500">
                          Learn with videos
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="p-3 border-t bg-gray-50">
                    <button className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm">
                      View All Help Resources
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowHelp(false);
                  setShowUserMenu(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition relative group"
                aria-label="Notifications"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                    <div className="absolute -bottom-10 right-0 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {unreadCount} unread notifications
                    </div>
                  </>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900">Notifications</h4>
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                        {unreadCount} New
                      </span>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition ${
                          !notification.read ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                              notification.read
                                ? "bg-gray-100"
                                : "bg-primary-100"
                            }`}
                          >
                            <Bell
                              size={14}
                              className={
                                notification.read
                                  ? "text-gray-500"
                                  : "text-primary-600"
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-gray-900">
                                {notification.title}
                              </div>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-primary-600"></div>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {notification.description}
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t bg-gray-50">
                    <button className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowHelp(false);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-3 p-1.5 hover:bg-gray-100 rounded-xl transition group"
                aria-label="User menu"
              >
                <div className="text-right hidden md:block">
                  <div className="font-medium text-gray-900 text-sm">
                    {user?.full_name || "User"}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {user?.role || "Role"}
                  </div>
                </div>

                <div className="relative">
                  <div className="h-9 w-9 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
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
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  {/* User Info */}
                  <div className="p-4 border-b bg-gradient-to-r from-primary-50 to-primary-100/50">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
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
                        <div className="font-bold text-gray-900">
                          {user?.full_name || "User"}
                        </div>
                        <div className="flex items-center mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${getUserRoleColor()} font-medium capitalize`}
                          >
                            {user?.role || "User"}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {user?.department || "Department"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition flex items-center"
                    >
                      <User size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">
                          My Profile
                        </div>
                        <div className="text-xs text-gray-500">
                          View and edit profile
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition flex items-center"
                    >
                      <Settings size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">
                          Account Settings
                        </div>
                        <div className="text-xs text-gray-500">
                          Privacy & preferences
                        </div>
                      </div>
                    </button>

                    <div className="border-t my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left p-3 hover:bg-red-50 rounded-lg transition flex items-center text-red-600"
                    >
                      <LogOut size={18} className="mr-3" />
                      <div>
                        <div className="font-medium">Logout</div>
                        <div className="text-xs text-red-500">
                          Sign out from account
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 pb-2">
            {/* User Info Mobile */}
            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
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
                  <div className="font-bold text-gray-900">
                    {user?.full_name || "User"}
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {user?.role || "Role"} • {user?.department || "Department"}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition"
              >
                <div className="font-medium text-gray-900">Dashboard</div>
                <div className="text-sm text-gray-600">Overview</div>
              </button>
              <button
                onClick={() => (window.location.href = "/dashboard/reports")}
                className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition"
              >
                <div className="font-medium text-gray-900">Reports</div>
                <div className="text-sm text-gray-600">Generate</div>
              </button>
              <button
                onClick={() => (window.location.href = "/dashboard/settings")}
                className="p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition"
              >
                <div className="font-medium text-gray-900">Settings</div>
                <div className="text-sm text-gray-600">Configure</div>
              </button>
              <button
                onClick={handleLogout}
                className="p-3 bg-red-50 rounded-lg text-left hover:bg-red-100 transition"
              >
                <div className="font-medium text-red-900">Logout</div>
                <div className="text-sm text-red-600">Sign out</div>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600 text-center">
                Logged in as: {user?.email || "user@example.com"}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
