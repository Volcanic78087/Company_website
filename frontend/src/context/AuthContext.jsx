import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Demo users data
const DEMO_USERS = [
  {
    id: 1,
    email: "admin@company.com",
    password: "admin123",
    full_name: "Admin User",
    is_active: true,
    is_admin: true,
    role: "admin",
    department: "Management",
    phone: "+1 (555) 123-4567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    email: "manager@company.com",
    password: "manager123",
    full_name: "Sarah Johnson",
    is_active: true,
    is_admin: false,
    role: "manager",
    department: "Sales",
    phone: "+1 (555) 987-6543",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    created_at: "2024-02-20",
  },
  {
    id: 3,
    email: "user@company.com",
    password: "user123",
    full_name: "John Doe",
    is_active: true,
    is_admin: false,
    role: "developer",
    department: "IT",
    phone: "+1 (555) 456-7890",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    created_at: "2024-03-10",
  },
];

// Create context
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("company_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
        localStorage.removeItem("company_user");
        localStorage.removeItem("company_token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function (frontend only)
  const login = async (email, password) => {
    try {
      setLoading(true);

      // Find user in demo data
      const foundUser = DEMO_USERS.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        toast.error("Invalid email or password");
        return { success: false, error: "Invalid credentials" };
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      const userData = {
        ...userWithoutPassword,
        token: `demo-token-${Date.now()}`,
      };

      // Store in localStorage
      localStorage.setItem("company_user", JSON.stringify(userData));
      localStorage.setItem("company_token", userData.token);

      // Update state
      setUser(userData);

      toast.success(`Welcome back, ${userData.full_name}!`);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return { success: false, error: "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Register function (frontend only)
  const register = async (fullName, email, password) => {
    try {
      setLoading(true);

      // Check if user already exists
      const existingUser = DEMO_USERS.find((user) => user.email === email);
      if (existingUser) {
        toast.error("Email already registered");
        return { success: false, error: "Email already exists" };
      }

      // Create new user
      const newUser = {
        id: DEMO_USERS.length + 1,
        email,
        password, // Note: In real app, never store password in plain text
        full_name: fullName,
        is_active: true,
        is_admin: false,
        role: "user",
        department: "General",
        phone: "",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`,
        created_at: new Date().toISOString().split("T")[0],
      };

      // Note: In real app, add to database. Here we'll just simulate success
      toast.success(
        "Registration successful! Please login with your credentials."
      );

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      return { success: false, error: "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("company_user");
    localStorage.removeItem("company_token");
    setUser(null);
    toast.success("Logged out successfully");

    // Use window.location instead of navigate for logout
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);

      if (!user) {
        throw new Error("No user logged in");
      }

      const updatedUser = {
        ...user,
        ...userData,
        updated_at: new Date().toISOString(),
      };

      // Update localStorage
      localStorage.setItem("company_user", JSON.stringify(updatedUser));

      // Update state
      setUser(updatedUser);

      toast.success("Profile updated successfully");
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile");
      return { success: false, error: "Update failed" };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);

      // In demo mode, just simulate success
      toast.success("Password changed successfully");
      return { success: true };
    } catch (error) {
      console.error("Change password error:", error);
      toast.error("Failed to change password");
      return { success: false, error: "Change failed" };
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Check if user is admin
  const isAdmin = user?.is_admin || false;

  // Get user role
  const getUserRole = () => user?.role || "user";

  // Get user permissions
  const getUserPermissions = () => {
    if (!user) return [];

    const permissions = ["view_dashboard", "edit_profile"];

    if (isAdmin) {
      permissions.push(
        "manage_users",
        "manage_settings",
        "view_reports",
        "manage_roles"
      );
    }

    if (user.role === "manager") {
      permissions.push("manage_team", "approve_requests", "view_analytics");
    }

    if (user.role === "developer") {
      permissions.push("view_tasks", "submit_reports");
    }

    return permissions;
  };

  // Has permission check
  const hasPermission = (permission) => {
    return getUserPermissions().includes(permission);
  };

  // Mock API calls for dashboard data
  const mockApi = {
    // Get dashboard stats
    getDashboardStats: () => {
      return {
        revenue: 54231,
        users: 2345,
        projects: 45,
        conversion: 3.2,
        growth: 12.5,
      };
    },

    // Get recent activities
    getRecentActivities: () => {
      return [
        { user: "John Doe", action: "added new project", time: "2 mins ago" },
        {
          user: "Sarah Smith",
          action: "updated sales report",
          time: "15 mins ago",
        },
        {
          user: "Mike Johnson",
          action: "commented on task",
          time: "1 hour ago",
        },
        {
          user: "Emma Wilson",
          action: "uploaded new file",
          time: "2 hours ago",
        },
        {
          user: "David Brown",
          action: "created new invoice",
          time: "5 hours ago",
        },
      ];
    },

    // Get projects
    getProjects: () => {
      return [
        {
          name: "Website Redesign",
          progress: 75,
          status: "In Progress",
          team: 5,
        },
        { name: "Mobile App", progress: 90, status: "Almost Done", team: 8 },
        {
          name: "CRM Implementation",
          progress: 45,
          status: "In Progress",
          team: 6,
        },
        { name: "API Integration", progress: 30, status: "Delayed", team: 4 },
      ];
    },

    // Get users list (admin only)
    getUsers: () => {
      return DEMO_USERS.map(({ password, ...user }) => ({
        ...user,
        lastLogin: `${Math.floor(Math.random() * 24)} hours ago`,
        status: Math.random() > 0.2 ? "Active" : "Inactive",
      }));
    },
  };

  // Context value
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated,
    isAdmin,
    getUserRole,
    hasPermission,
    getUserPermissions,
    mockApi,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for easy access
export const useAuthData = () => {
  const auth = useAuth();

  return {
    // User info
    currentUser: auth.user,
    userName: auth.user?.full_name || "Guest",
    userEmail: auth.user?.email,
    userAvatar: auth.user?.avatar,

    // Auth status
    isLoggedIn: auth.isAuthenticated,
    isAdminUser: auth.isAdmin,
    userRole: auth.getUserRole(),

    // Auth actions
    loginUser: auth.login,
    logoutUser: auth.logout,
    registerUser: auth.register,

    // Permissions
    canView: auth.hasPermission,
    userPermissions: auth.getUserPermissions(),

    // Loading state
    isLoading: auth.loading,

    // Mock data
    dashboardStats: auth.mockApi.getDashboardStats(),
    recentActivities: auth.mockApi.getRecentActivities(),
    projects: auth.mockApi.getProjects(),
    usersList: auth.isAdmin ? auth.mockApi.getUsers() : [],
  };
};
