import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import { useAuth, useAuthData } from "../../context/AuthContext";
import { useSidebar } from "../../hooks/useSidebar";

import {
  TrendingUp,
  Users,
  DollarSign,
  Package,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Bell,
  Settings,
} from "lucide-react";

const DashboardHome = () => {
  const { user, logout, mockApi } = useAuth();
  const { dashboardStats, recentActivities, projects } = useAuthData();
  const { collapsed } = useSidebar();
  const [notifications] = useState([
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
  ]);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${dashboardStats.revenue.toLocaleString()}`,
      change: `+${dashboardStats.growth}%`,
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Active Users",
      value: dashboardStats.users.toLocaleString(),
      change: "+18.2%",
      icon: Users,
      color: "blue",
    },
    {
      title: "Projects",
      value: dashboardStats.projects,
      change: "+5.2%",
      icon: Package,
      color: "purple",
    },
    {
      title: "Conversion Rate",
      value: `${dashboardStats.conversion}%`,
      change: "-1.1%",
      icon: TrendingUp,
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div
        className={`transition-margin ${
          collapsed ? "sidebar-collapsed" : "sidebar-expanded"
        }`}
      >
        <Navbar />

        <main className="p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.full_name}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <Users size={28} />
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-1">
                      Welcome back, {user?.full_name}! 👋
                    </h1>
                    <p className="text-primary-100 opacity-90">
                      {user?.role === "admin"
                        ? "Administrator Dashboard"
                        : user?.role === "manager"
                        ? "Manager Dashboard"
                        : "User Dashboard"}{" "}
                      • Last login: Today at 9:42 AM
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                    <Bell size={18} className="mr-2" />
                    <span>
                      {notifications.filter((n) => !n.read).length} unread
                      notifications
                    </span>
                  </div>
                  <div className="flex items-center bg-white/20 px-4 py-2 rounded-lg">
                    <Calendar size={18} className="mr-2" />
                    <span>3 meetings today</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition">
                  <Calendar className="inline mr-2" size={18} />
                  View Calendar
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`text-${stat.color}-600`} size={24} />
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <div className="mb-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>

                <div className="flex items-center">
                  {stat.change.startsWith("+") ? (
                    <ArrowUpRight className="text-green-500 mr-1" size={16} />
                  ) : (
                    <ArrowDownRight className="text-red-500 mr-1" size={16} />
                  )}
                  <span
                    className={
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    from last month
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts and Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Revenue Overview
                  </h3>
                  <p className="text-gray-600">Monthly revenue performance</p>
                </div>
                <button className="flex items-center text-primary-600 hover:text-primary-700">
                  <Download size={18} className="mr-2" />
                  Export
                </button>
              </div>

              {/* Placeholder Chart */}
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Revenue chart would appear here
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Activity
                </h3>
                <button className="text-sm text-primary-600 hover:text-primary-700">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                      <Users className="text-primary-600" size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">
                          {activity.user}
                        </span>
                        <span className="text-gray-600">
                          {" "}
                          {activity.action}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Active Projects
                  </h3>
                  <p className="text-gray-600">Track your project progress</p>
                </div>
                <button className="btn-primary">+ New Project</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Project
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Progress
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Team
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects.map((project, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">
                          {project.name}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {project.progress}%
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            project.status === "Almost Done"
                              ? "bg-green-100 text-green-800"
                              : project.status === "Delayed"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex -space-x-2">
                          {[...Array(project.team)].map((_, i) => (
                            <div
                              key={i}
                              className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white"
                            ></div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Upcoming Tasks</h4>
              <div className="space-y-3">
                {[
                  "Team Meeting",
                  "Client Call",
                  "Project Deadline",
                  "Code Review",
                ].map((task, i) => (
                  <div key={i} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                    <span className="ml-3 text-gray-700">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">
                Team Availability
              </h4>
              <div className="space-y-4">
                {[
                  { name: "Design Team", availability: "80%" },
                  { name: "Dev Team", availability: "60%" },
                  { name: "QA Team", availability: "90%" },
                ].map((team, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{team.name}</span>
                      <span className="font-medium">{team.availability}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: team.availability }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Notifications</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">
                    System Update
                  </div>
                  <div className="text-xs text-blue-600">
                    Maintenance scheduled for tomorrow
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800">
                    New Message
                  </div>
                  <div className="text-xs text-green-600">
                    You have 3 unread messages
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800">
                    Alert
                  </div>
                  <div className="text-xs text-yellow-600">
                    Storage is 85% full
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardHome;
