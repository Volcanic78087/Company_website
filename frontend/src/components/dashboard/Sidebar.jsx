import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
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
  Briefcase,
  Building,
  Mail,
  Phone,
  MapPin,
  Award,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Edit,
  Trash2,
  Filter,
  Search,
  UserPlus,
  Bell,
  Star,
  TrendingUp,
  Database,
  Server,
  Cpu,
  Cloud,
  Smartphone,
  Globe,
  Lock,
  Zap,
  Package,
  Truck,
  ShoppingCart,
  CreditCard,
  Headphones,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef(null);
  const { logout, user } = useAuth();
  const location = useLocation();

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
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

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolled(scrollContainerRef.current.scrollTop > 10);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Ensure content doesn't overflow behind buttons
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const updatePadding = () => {
        const bottomActions = document.querySelector('.bottom-actions');
        if (bottomActions) {
          const height = bottomActions.offsetHeight;
          container.style.paddingBottom = `${height + 20}px`;
        }
      };

      updatePadding();
      window.addEventListener('resize', updatePadding);
      return () => window.removeEventListener('resize', updatePadding);
    }
  }, [collapsed]);

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: DollarSign, label: "Sales", path: "/dashboard/sales" },
    { icon: Target, label: "Quality Project", path: "/dashboard/quality" },
    { icon: Clock, label: "Time Tracker", path: "/dashboard/timetracker" },
    { icon: Calendar, label: "Calendar", path: "/dashboard/calendar" },
    { icon: FileText, label: "Reports", path: "/dashboard/reports" },
    { icon: Package, label: "Inventory", path: "/dashboard/inventory" },
    { icon: Truck, label: "Logistics", path: "/dashboard/logistics" },
    { icon: ShoppingCart, label: "E-Commerce", path: "/dashboard/ecommerce" },
    { icon: CreditCard, label: "Billing", path: "/dashboard/billing" },
    { icon: Headphones, label: "Support Tickets", path: "/dashboard/support-tickets" },
  ];

  const adminNavItems = [
    { icon: Shield, label: "Admin", path: "/dashboard/admin" },
    { icon: Users, label: "Users", path: "/dashboard/admin/users" },
    { icon: Briefcase, label: "Job Applications", path: "/dashboard/job_app" },
    { icon: Building, label: "Departments", path: "/dashboard/admin/departments" },
    { icon: Target, label: "Job Openings", path: "/dashboard/admin/jobs" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/admin/analytics" },
    { icon: Bell, label: "Notifications", path: "/dashboard/admin/notifications" },
    { icon: SettingsIcon, label: "System Settings", path: "/dashboard/admin/settings" },
  ];

  const techNavItems = [
    { icon: Server, label: "Server Management", path: "/dashboard/tech/servers" },
    { icon: Database, label: "Database", path: "/dashboard/tech/database" },
    { icon: Cpu, label: "Infrastructure", path: "/dashboard/tech/infra" },
    { icon: Cloud, label: "Cloud Services", path: "/dashboard/tech/cloud" },
    { icon: Smartphone, label: "Mobile Apps", path: "/dashboard/tech/mobile" },
    { icon: Globe, label: "Web Services", path: "/dashboard/tech/web" },
    { icon: Lock, label: "Security", path: "/dashboard/tech/security" },
    { icon: Zap, label: "Performance", path: "/dashboard/tech/performance" },
  ];

  const supportNavItems = [
    { icon: MessageSquare, label: "Live Support", path: "/dashboard/support" },
    { icon: HelpCircle, label: "Knowledge Base", path: "/dashboard/knowledge" },
    { icon: Star, label: "Feedback", path: "/dashboard/feedback" },
    { icon: TrendingUp, label: "Improvements", path: "/dashboard/improvements" },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  const NavSection = ({ title, items, collapsed }) => (
    <div className={collapsed ? "" : "mb-4"}>
      {!collapsed && title && (
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
          {title}
        </div>
      )}
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex items-center px-2 py-2 rounded-lg text-sm font-medium transition-colors mb-1
            ${isActive
              ? "bg-primary-50 text-primary-600 border-l-4 border-primary-500"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }
            ${collapsed ? "justify-center" : ""}
          `}
          title={collapsed ? item.label : undefined}
        >
          <item.icon size={18} className="flex-shrink-0" />
          {!collapsed && <span className="ml-2 truncate">{item.label}</span>}
        </NavLink>
      ))}
    </div>
  );

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200
        transition-all duration-300 z-40 flex flex-col
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Logo Header */}
      <div className={`
        p-4 border-b border-gray-200 flex-shrink-0
        ${isScrolled ? "shadow-sm" : ""}
      `}>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3 min-w-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex-shrink-0"></div>
              <div className="min-w-0">
                <span className="text-lg font-bold text-gray-900 truncate block">VETPL MIS</span>
                <span className="text-xs text-gray-500 truncate block">Management System</span>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 mx-auto"></div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-100 rounded-lg flex-shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* User Profile - Fixed */}
      <div className="p-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
            <Users className="text-blue-600" size={16} />
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {user?.full_name || "Admin User"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email || "admin@company.com"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation - Scrollable Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="p-2 space-y-1">
          <NavSection 
            title="Main Navigation" 
            items={mainNavItems} 
            collapsed={collapsed} 
          />
          
          <NavSection 
            title="Administration" 
            items={adminNavItems} 
            collapsed={collapsed} 
          />
          
          <NavSection 
            title="Technology" 
            items={techNavItems} 
            collapsed={collapsed} 
          />
          
          <NavSection 
            title="Support & Feedback" 
            items={supportNavItems} 
            collapsed={collapsed} 
          />
        </div>
        
        {/* Empty space for bottom buttons */}
        <div className="h-24"></div>
      </div>

      {/* Bottom Actions - Always visible at bottom */}
      <div className="bottom-actions border-t border-gray-200 bg-white p-3 flex-shrink-0">
        <div className="space-y-2">
          <button
            onClick={handleHomeClick}
            className={`
              flex items-center w-full px-2 py-2 rounded-lg text-sm font-medium
              text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors
              ${collapsed ? "justify-center" : ""}
            `}
            title={collapsed ? "Back to Website" : undefined}
          >
            <Home size={18} className="flex-shrink-0" />
            {!collapsed && <span className="ml-2 truncate">Back to Website</span>}
          </button>

          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full px-2 py-2 rounded-lg text-sm font-medium
              text-red-600 hover:bg-red-50 transition-colors
              ${collapsed ? "justify-center" : ""}
            `}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span className="ml-2 truncate">Logout</span>}
          </button>
        </div>
        
        {/* Version Info */}
        {!collapsed && (
          <div className="mt-1 pt-1 pr-8 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              v2.1.0 • {new Date().getFullYear()}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;