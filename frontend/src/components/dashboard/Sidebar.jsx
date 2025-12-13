import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  Calendar,
  Settings as SettingsIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Clock,
  Shield,
  FileText,
  MessageSquare,
  HelpCircle,
  DollarSign,
  Target,
  Database,
  Server,
  Zap,
  Download,
  Bell,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed.toString());

    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("sidebarToggle", {
        detail: { collapsed },
      })
    );
  }, [collapsed]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: DollarSign, label: "Sales", path: "/dashboard/sales" },
    { icon: Target, label: "Quality", path: "/dashboard/quality" },
    { icon: Clock, label: "Time Tracker", path: "/dashboard/timetracker" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Calendar, label: "Calendar", path: "/dashboard/calendar" },
    { icon: FileText, label: "Reports", path: "/dashboard/reports" },
  ];

  const adminNavItems = [
    { icon: Shield, label: "Admin", path: "/dashboard/admin" },
    { icon: Users, label: "Users", path: "/dashboard/admin/users" },
  ];

  const supportNavItems = [
    { icon: MessageSquare, label: "Support", path: "/dashboard/support" },
    { icon: SettingsIcon, label: "Settings", path: "/dashboard/settings" },
    { icon: HelpCircle, label: "Help", path: "/dashboard/help" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <aside
      className={`
      fixed left-0 top-0 h-screen bg-white border-r border-gray-200
      transition-all duration-300 z-40
      ${collapsed ? "w-20" : "w-64"}
    `}
    >
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary-600"></div>
              <span className="text-lg font-bold text-gray-900">VETPL MIS</span>
            </div>
          )}

          {collapsed && (
            <div className="h-8 w-8 rounded-lg bg-primary-600 mx-auto"></div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
            <Users className="text-primary-600" size={16} />
          </div>

          {!collapsed && (
            <div className="flex-1 truncate">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user?.full_name || "John Doe"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email || "admin@company.com"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-2 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
        {/* Main Navigation */}
        <div className={collapsed ? "" : "mb-4"}>
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              Main
            </div>
          )}

          {mainNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-2 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <item.icon size={18} />
              {!collapsed && <span className="ml-2">{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Admin Navigation */}
        {user?.is_admin && (
          <div className={collapsed ? "" : "mb-4"}>
            {!collapsed && (
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Administration
              </div>
            )}

            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-2 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <item.icon size={18} />
                {!collapsed && <span className="ml-2">{item.label}</span>}
              </NavLink>
            ))}
          </div>
        )}

        {/* Support Navigation */}
        <div>
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
              Support
            </div>
          )}

          {supportNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-2 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <item.icon size={18} />
              {!collapsed && <span className="ml-2">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
        <button
          onClick={handleHomeClick}
          className={`
            flex items-center w-full px-2 py-2 rounded-lg text-sm font-medium
            text-gray-700 hover:bg-gray-50 hover:text-gray-900
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <Home size={18} />
          {!collapsed && <span className="ml-2">Back to Website</span>}
        </button>

        <button
          onClick={handleLogout}
          className={`
            flex items-center w-full px-2 py-2 rounded-lg text-sm font-medium
            text-red-600 hover:bg-red-50 mt-1
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <LogOut size={18} />
          {!collapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
