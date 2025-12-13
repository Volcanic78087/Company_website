import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Edit2,
  Save,
  X,
  Camera,
  Key,
} from "lucide-react";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSave = async () => {
    try {
      const result = await updateProfile(editData);
      if (result.success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const result = await changePassword(passwordData.current, passwordData.new);
    if (result.success) {
      setPasswordData({ current: "", new: "", confirm: "" });
      setShowChangePassword(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.full_name}
                  className="h-full w-full rounded-full"
                />
              ) : (
                user.full_name.charAt(0)
              )}
            </div>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white border shadow flex items-center justify-center">
              <Camera size={16} />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.full_name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center mt-2">
              <Shield
                className={`h-4 w-4 mr-2 ${
                  user.role === "admin"
                    ? "text-red-500"
                    : user.role === "manager"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              />
              <span className="text-sm font-medium text-gray-700 capitalize">
                {user.role} • {user.department}
              </span>
            </div>
          </div>
        </div>

        <div>
          {isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <X size={16} className="mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center"
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center"
            >
              <Edit2 size={16} className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline mr-2" size={16} />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.full_name}
                onChange={(e) =>
                  setEditData({ ...editData, full_name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                {user.full_name}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline mr-2" size={16} />
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                {user.email}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="inline mr-2" size={16} />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="+1 (555) 123-4567"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                {user.phone || "Not set"}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="inline mr-2" size={16} />
              Department
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.department}
                onChange={(e) =>
                  setEditData({ ...editData, department: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg">
                {user.department}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <Key className="mr-2" size={20} />
            Password & Security
          </h3>

          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {showChangePassword ? "Cancel" : "Change Password"}
          </button>
        </div>

        {showChangePassword && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.current}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, current: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, new: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={handlePasswordChange} className="btn-primary">
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Member Since</div>
            <div className="font-medium">{user.created_at}</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Account Status</div>
            <div className="flex items-center">
              <div
                className={`h-2 w-2 rounded-full mr-2 ${
                  user.is_active ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="font-medium">
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">User Role</div>
            <div className="font-medium capitalize">{user.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
