import {
  FaFileContract,
  FaExclamationTriangle,
  FaCheckCircle,
  FaRobot,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const pieData = [
  { name: "Safe", value: 70 },
  { name: "Medium", value: 20 },
  { name: "High", value: 10 },
];

const barData = [
  { month: "Jan", contracts: 8 },
  { month: "Feb", contracts: 12 },
  { month: "Mar", contracts: 18 },
  { month: "Apr", contracts: 24 },
  { month: "May", contracts: 20 },
  { month: "Jun", contracts: 28 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

function Dashboard() {
  const stats = [
    {
      title: "Contracts",
      value: "24",
      icon: <FaFileContract className="text-4xl text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Risk Clauses",
      value: "12",
      icon: <FaExclamationTriangle className="text-4xl text-red-500" />,
      bg: "bg-red-50",
    },
    {
      title: "Safe Clauses",
      value: "86",
      icon: <FaCheckCircle className="text-4xl text-green-500" />,
      bg: "bg-green-50",
    },
    {
      title: "AI Accuracy",
      value: "99%",
      icon: <FaRobot className="text-4xl text-indigo-600" />,
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-5xl font-bold mb-3">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-10">
        Welcome back! Here's your AI contract analytics.
      </p>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

        {stats.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} rounded-3xl shadow-lg p-8`}
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              {item.icon}

            </div>
          </div>
        ))}

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8 mb-10">

        {/* Pie Chart */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Risk Distribution
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Bar Chart */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Monthly Contracts
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={barData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="contracts"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* AI Summary */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          AI Summary
        </h2>

        <p className="text-gray-700 leading-8 text-lg">
          The latest contract analysis indicates an overall
          <span className="font-bold text-green-600">
            {" "}Low Risk{" "}
          </span>
          profile. Most clauses follow standard legal practices.
          A few payment and termination conditions should be reviewed
          before signing. AI confidence for this analysis is
          <span className="font-bold text-blue-600">
            {" "}99%
          </span>.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;