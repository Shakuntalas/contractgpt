import { Link } from "react-router-dom";
import { FaRobot, FaHome } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-6">

      <div className="text-center">

        <FaRobot className="text-8xl text-blue-600 mx-auto mb-6" />

        <h1 className="text-8xl font-extrabold text-gray-800">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-3 mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition"
        >
          <FaHome />
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;