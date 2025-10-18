import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const isAuthenticated = localStorage.getItem("token") !== null;

  useEffect(() => {
    if (isAuthenticated) {
      const name = localStorage.getItem("userName");
      setUserName(name || "User");
    }
  }, [isAuthenticated, location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and branding */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-blue-600">
              HealthTrack
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  Hello,{" "}
                  <span className="font-medium text-gray-900">{userName}</span>
                </span>
<Link
  to="/dashboard"
  className={`px-4 py-2 rounded-lg transition-colors ${
    location.pathname === "/dashboard"
      ? "bg-blue-50 text-blue-700 font-medium"
      : "text-gray-600 hover:text-gray-900"
  }`}
>
  Dashboard
</Link>
<Link 
  to="/history" 
  className={`px-4 py-2 rounded-lg transition-colors ${
    location.pathname === '/history' 
      ? 'bg-blue-50 text-blue-700 font-medium' 
      : 'text-gray-600 hover:text-gray-900'
  }`}
>
  History
</Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;