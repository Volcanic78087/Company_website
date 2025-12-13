import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import UserProfile from "../../components/dashboard/UserProfile";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>

            {/* Settings Tabs */}
            <div className="flex border-b border-gray-200 mt-6">
              {[
                "Profile",
                "Account",
                "Notifications",
                "Billing",
                "Security",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 font-medium text-lg ${
                    tab === "Profile"
                      ? "border-b-2 border-primary-600 text-primary-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <UserProfile />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
