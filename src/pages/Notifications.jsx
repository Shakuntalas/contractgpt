import {
  FaBell,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileContract,
  FaRobot,
} from "react-icons/fa";

function Notifications() {
  const notifications = [
    {
      id: 1,
      icon: <FaFileContract className="text-blue-600 text-2xl" />,
      title: "Contract Uploaded",
      message: "Employment_Agreement.pdf uploaded successfully.",
      time: "2 minutes ago",
    },
    {
      id: 2,
      icon: <FaRobot className="text-indigo-600 text-2xl" />,
      title: "AI Analysis Completed",
      message: "Risk level detected: Low Risk.",
      time: "10 minutes ago",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
      title: "Report Generated",
      message: "Your AI report is ready to download.",
      time: "30 minutes ago",
    },
    {
      id: 4,
      icon: <FaExclamationTriangle className="text-yellow-500 text-2xl" />,
      title: "Reminder",
      message: "Review contracts with Medium or High Risk.",
      time: "Yesterday",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <FaBell className="text-5xl text-blue-600" />
          <div>
            <h1 className="text-4xl font-bold">Notifications</h1>
            <p className="text-gray-500">
              Stay updated with your latest ContractGPT activities.
            </p>
          </div>
        </div>

        <div className="space-y-5">

          {notifications.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-5 hover:shadow-xl transition"
            >
              {item.icon}

              <div className="flex-1">
                <h2 className="font-bold text-lg">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-1">
                  {item.message}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  {item.time}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Notifications;