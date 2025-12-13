import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Lock, Mail, AlertCircle, User } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const demoCredentials = [
    { email: "admin@company.com", password: "admin123", role: "Admin" },
    { email: "manager@company.com", password: "manager123", role: "Manager" },
    { email: "user@company.com", password: "user123", role: "Regular User" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (!fullName || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      setLoading(true);
      const result = await register(fullName, email, password);
      if (result.success) {
        setEmail("");
        setPassword("");
        setFullName("");
      }
      setLoading(false);
    } else {
      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }

      setLoading(true);
      const result = await login(email, password);
      if (result.success) {
        navigate("/dashboard");
      }
      setLoading(false);
    }
  };

  const fillDemoCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
    setIsRegister(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg">
            <Lock className="text-white" size={28} />
          </div>
        </div>

        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isRegister ? "Creating Account..." : "Signing in..."}
                  </>
                ) : isRegister ? (
                  "Sign Up"
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials Section */}
          {!isRegister && (
            <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-primary-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-primary-900">
                    Try Demo Accounts
                  </h3>
                  <div className="mt-2 space-y-2">
                    {demoCredentials.map((cred, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <span className="text-sm font-medium text-primary-800">
                            {cred.role}
                          </span>
                          <div className="text-xs text-primary-700">
                            Email: {cred.email}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            fillDemoCredentials(cred.email, cred.password)
                          }
                          className="text-xs bg-primary-600 hover:bg-primary-700 text-white px-2 py-1 rounded"
                        >
                          Use
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-primary-700">
                    Click "Use" to auto-fill credentials, then click "Sign In"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
