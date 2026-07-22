import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaFileContract,
  FaRobot,
} from "react-icons/fa";

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-16 px-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Cover */}

          <div className="h-44 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

          {/* Profile */}

          <div className="px-10 pb-10">

            <div className="-mt-20 flex flex-col md:flex-row md:items-end md:justify-between">

              <div className="flex items-center gap-6">

                <FaUserCircle className="text-9xl text-white bg-blue-600 rounded-full p-2 border-8 border-white" />

                <div>

                  <h1 className="text-4xl font-bold">
                    Shakuntala
                  </h1>

                  <p className="text-gray-500">
                    AI Contract Analyst
                  </p>

                </div>

              </div>

              <button className="mt-6 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2">
                <FaEdit />
                Edit Profile
              </button>

            </div>

            {/* Details */}

            <div className="grid md:grid-cols-2 gap-8 mt-12">

              <div className="bg-slate-50 rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-5">
                  Personal Information
                </h2>

                <div className="space-y-5">

                  <div className="flex items-center gap-4">
                    <FaEnvelope className="text-blue-600" />
                    <span>shakuntala@example.com</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <FaPhone className="text-blue-600" />
                    <span>+91 9876543210</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>Hubli, Karnataka</span>
                  </div>

                </div>

              </div>

              <div className="bg-slate-50 rounded-2xl p-6">

                <h2 className="text-2xl font-bold mb-5">
                  AI Statistics
                </h2>

                <div className="space-y-5">

                  <div className="flex justify-between">
                    <span>Contracts Uploaded</span>
                    <span className="font-bold">24</span>
                  </div>

                  <div className="flex justify-between">
                    <span>AI Chats</span>
                    <span className="font-bold">58</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Risk Reports</span>
                    <span className="font-bold">18</span>
                  </div>

                  <div className="flex justify-between">
                    <span>AI Accuracy</span>
                    <span className="font-bold text-green-600">
                      99%
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Recent Activity */}

            <div className="mt-12 bg-slate-50 rounded-2xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Recent Activity
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <FaFileContract className="text-blue-600 text-2xl" />
                  <span>Uploaded Employment Agreement.pdf</span>
                </div>

                <div className="flex items-center gap-4">
                  <FaRobot className="text-indigo-600 text-2xl" />
                  <span>AI generated contract summary.</span>
                </div>

                <div className="flex items-center gap-4">
                  <FaFileContract className="text-green-600 text-2xl" />
                  <span>Downloaded AI analysis report.</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;