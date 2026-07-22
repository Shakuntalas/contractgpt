import { Link, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const navLink = (path) =>
    `transition duration-300 font-medium ${
      location.pathname === path
        ? "text-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-3xl font-bold text-blue-600"
        >
          <FaRobot className="text-4xl text-indigo-600" />
          ContractGPT
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={navLink("/")}>
            Home
          </Link>

          <Link to="/upload" className={navLink("/upload")}>
            Upload
          </Link>

          <Link to="/dashboard" className={navLink("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/chat" className={navLink("/chat")}>
            AI Chat
          </Link>
        </div>

        {/* Login Button */}
        <Link
  to="/login"
  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
>
  Login
</Link>

      </div>
    </nav>
  );
}

export default Navbar;