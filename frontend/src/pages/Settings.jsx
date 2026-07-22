import { useState } from "react";
import {
  FaCog,
  FaMoon,
  FaBell,
  FaShieldAlt,
  FaRobot,
  FaSave,
} from "react-icons/fa";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoAnalysis, setAutoAnalysis] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <div className="flex items-center gap-4 mb-10">
            <FaCog className="text-5xl text-blue-600" />
            <div>
              <h1 className="text-4xl font-bold">
                Settings
              </h1>
              <p className="text-gray-500">
                Customize your ContractGPT experience
              </p>
            </div>
          </div>

          <div className="space-y-8">

            <div className="flex justify-between items-center border-b pb-6">

              <div className="flex items-center gap-4">
                <FaMoon className="text-2xl text-indigo-600" />
                <div>
                  <h2 className="font-bold text-xl">
                    Dark Mode
                  </h2>
                  <p className="text-gray-500">
                    Enable dark theme
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />

            </div>

            <div className="flex justify-between items-center border-b pb-6">

              <div className="flex items-center gap-4">
                <FaBell className="text-2xl text-yellow-500" />
                <div>
                  <h2 className="font-bold text-xl">
                    Notifications
                  </h2>
                  <p className="text-gray-500">
                    Receive AI updates
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />

            </div>

            <div className="flex justify-between items-center border-b pb-6">

              <div className="flex items-center gap-4">
                <FaRobot className="text-2xl text-blue-600" />
                <div>
                  <h2 className="font-bold text-xl">
                    Auto AI Analysis
                  </h2>
                  <p className="text-gray-500">
                    Analyze immediately after upload
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={autoAnalysis}
                onChange={() => setAutoAnalysis(!autoAnalysis)}
              />

            </div>

            <div className="flex justify-between items-center border-b pb-6">

              <div className="flex items-center gap-4">
                <FaShieldAlt className="text-2xl text-green-600" />
                <div>
                  <h2 className="font-bold text-xl">
                    Security
                  </h2>
                  <p className="text-gray-500">
                    Two-factor authentication (UI)
                  </p>
                </div>
              </div>

              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Enabled
              </button>

            </div>

            <button className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:from-blue-700 hover:to-indigo-700 transition">

              <FaSave />

              Save Settings

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;