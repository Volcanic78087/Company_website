import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { Toaster } from "react-hot-toast";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

// Dashboard Pages
import Login from "./pages/dashboard/Login";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Users from "./pages/dashboard/Admin/Users";
import Settings from "./pages/dashboard/Settings";
import Testimonials from "./pages/Testimonial";
import Careers from "./pages/Careers";

// Placeholder Component
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">🚧</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">
        This feature is coming soon. We're working hard to bring you the best
        experience.
      </p>
      <a href="/dashboard" className="btn-primary">
        Back to Dashboard
      </a>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonial" element={<Testimonials />} />
          <Route path="/careers" element={<Careers />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route
              path="/dashboard/sales"
              element={<PlaceholderPage title="Sales Dashboard" />}
            />
            <Route
              path="/dashboard/quality"
              element={<PlaceholderPage title="Quality Management" />}
            />
            <Route
              path="/dashboard/timetracker"
              element={<PlaceholderPage title="Time Tracker" />}
            />
            <Route
              path="/dashboard/analytics"
              element={<PlaceholderPage title="Analytics Dashboard" />}
            />
            <Route
              path="/dashboard/calendar"
              element={<PlaceholderPage title="Calendar" />}
            />
            <Route
              path="/dashboard/reports"
              element={<PlaceholderPage title="Reports" />}
            />
            <Route
              path="/dashboard/settings"
              element={<PlaceholderPage title="Settings" />}
            />
            <Route
              path="/dashboard/support"
              element={<PlaceholderPage title="Support Center" />}
            />
            <Route
              path="/dashboard/help"
              element={<PlaceholderPage title="Help & Documentation" />}
            />

            {/* Admin Only Routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route
                path="/dashboard/admin"
                element={<PlaceholderPage title="Admin Dashboard" />}
              />
              <Route path="/dashboard/admin/users" element={<Users />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="text-9xl font-bold text-primary-600 mb-4">
                    404
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Page Not Found
                  </h1>
                  <p className="text-gray-600 mb-8">
                    The page you are looking for doesn't exist or has been
                    moved.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/" className="btn-primary">
                      Go Home
                    </a>
                    <a
                      href="/dashboard"
                      className="px-6 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition"
                    >
                      Go to Dashboard
                    </a>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
