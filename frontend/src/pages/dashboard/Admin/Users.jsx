import { useState } from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import {
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Shield,
  User,
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2 hours ago",
      phone: "+1 (555) 123-4567",
      department: "Management",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Manager",
      status: "Active",
      lastLogin: "1 day ago",
      phone: "+1 (555) 987-6543",
      department: "Sales",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@company.com",
      role: "Developer",
      status: "Inactive",
      lastLogin: "1 week ago",
      phone: "+1 (555) 456-7890",
      department: "IT",
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Emma Brown",
      email: "emma@company.com",
      role: "Designer",
      status: "Active",
      lastLogin: "5 hours ago",
      phone: "+1 (555) 321-6547",
      department: "Creative",
      joinDate: "2023-04-05",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david@company.com",
      role: "Analyst",
      status: "Active",
      lastLogin: "3 days ago",
      phone: "+1 (555) 654-3210",
      department: "Analytics",
      joinDate: "2023-05-12",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddUser, setShowAddUser] = useState(false);

  const roles = ["All", "Admin", "Manager", "Developer", "Designer", "Analyst"];
  const statuses = ["All", "Active", "Inactive"];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "all" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleStatusToggle = (userId) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          };
        }
        return user;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="text-gray-600">
                Manage system users and permissions
              </p>
            </div>

            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download size={18} className="mr-2" />
                Export
              </button>

              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Upload size={18} className="mr-2" />
                Import
              </button>

              <button
                onClick={() => setShowAddUser(true)}
                className="btn-primary flex items-center"
              >
                <UserPlus size={18} className="mr-2" />
                Add User
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Users
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {roles.map((role) => (
                    <option key={role} value={role.toLowerCase()}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status.toLowerCase()}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Filter size={18} className="mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      User
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Role
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Department
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Last Login
                    </th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                            <User className="text-primary-600" size={20} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Shield
                            className={`mr-2 ${
                              user.role === "Admin"
                                ? "text-red-600"
                                : user.role === "Manager"
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                            size={16}
                          />
                          <span
                            className={`font-medium ${
                              user.role === "Admin"
                                ? "text-red-700"
                                : user.role === "Manager"
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {user.department}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {user.status === "Active" ? (
                            <>
                              <CheckCircle
                                className="text-green-500 mr-2"
                                size={16}
                              />
                              <span className="text-green-700">Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle
                                className="text-red-500 mr-2"
                                size={16}
                              />
                              <span className="text-red-700">Inactive</span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-gray-600">
                        {user.lastLogin}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Mail size={18} className="text-gray-600" />
                          </button>

                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Phone size={18} className="text-gray-600" />
                          </button>

                          <button
                            onClick={() => handleStatusToggle(user.id)}
                            className={`p-1 rounded ${
                              user.status === "Active"
                                ? "hover:bg-red-50 text-red-600"
                                : "hover:bg-green-50 text-green-600"
                            }`}
                          >
                            {user.status === "Active" ? (
                              <XCircle size={18} />
                            ) : (
                              <CheckCircle size={18} />
                            )}
                          </button>

                          <button className="p-1 hover:bg-blue-50 rounded text-blue-600">
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 hover:bg-red-50 rounded text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing 1 to {filteredUsers.length} of {users.length} users
                </div>

                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-primary-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">User Distribution</h3>
                <button className="text-primary-600 hover:text-primary-700 text-sm">
                  View Details
                </button>
              </div>

              <div className="space-y-4">
                {[
                  { role: "Admin", count: 2, color: "bg-red-500" },
                  { role: "Manager", count: 5, color: "bg-blue-500" },
                  { role: "Developer", count: 12, color: "bg-green-500" },
                  { role: "Designer", count: 8, color: "bg-purple-500" },
                ].map((item) => (
                  <div key={item.role}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.role}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${(item.count / 27) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                  <UserPlus className="mx-auto mb-2 text-gray-600" size={20} />
                  <div className="text-sm font-medium">Invite User</div>
                </button>

                <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                  <Shield className="mx-auto mb-2 text-gray-600" size={20} />
                  <div className="text-sm font-medium">Permissions</div>
                </button>

                <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                  <Download className="mx-auto mb-2 text-gray-600" size={20} />
                  <div className="text-sm font-medium">Export Data</div>
                </button>

                <button className="p-3 border rounded-lg text-center hover:bg-gray-50">
                  <Filter className="mx-auto mb-2 text-gray-600" size={20} />
                  <div className="text-sm font-medium">Filter Users</div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">System Status</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={18} />
                    <span className="text-gray-700">Active Users</span>
                  </div>
                  <span className="font-bold">18</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <XCircle className="text-red-500 mr-2" size={18} />
                    <span className="text-gray-700">Inactive Users</span>
                  </div>
                  <span className="font-bold">4</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="text-blue-500 mr-2" size={18} />
                    <span className="text-gray-700">Online Now</span>
                  </div>
                  <span className="font-bold">6</span>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600">
                    Last Updated: Just now
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

export default Users;
