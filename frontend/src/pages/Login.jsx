import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

        <div className="text-center mb-8">

          <FaRobot className="text-6xl text-blue-600 mx-auto mb-4" />

          <h1 className="text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue using ContractGPT
          </p>

        </div>

        <form className="space-y-6">

          <div>
            <label className="font-semibold mb-2 block">
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

          <div>

            <label className="font-semibold mb-2 block">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <FaLock className="text-gray-400 mr-3" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full outline-none"
              />

            </div>

          </div>

          <div className="flex justify-between items-center">

            <label className="flex items-center gap-2 text-sm">

              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
              />

              Show Password

            </label>

            <a
              href="#"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>

          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-8 text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;