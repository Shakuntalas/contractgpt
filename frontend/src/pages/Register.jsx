import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10">

        <div className="text-center mb-8">

          <FaRobot className="text-6xl text-blue-600 mx-auto mb-4" />

          <h1 className="text-4xl font-bold">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join ContractGPT and start analyzing contracts with AI.
          </p>

        </div>

        <form className="space-y-5">

          {/* Full Name */}

          <div>

            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaUser className="text-gray-400 mr-3" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full outline-none"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="block font-semibold mb-2">
              Email
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaEnvelope className="text-gray-400 mr-3" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="block font-semibold mb-2">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaLock className="text-gray-400 mr-3" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full outline-none"
              />

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block font-semibold mb-2">
              Confirm Password
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaLock className="text-gray-400 mr-3" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full outline-none"
              />

            </div>

          </div>

          {/* Show Password */}

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />

            Show Password

          </label>

          {/* Register Button */}

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;