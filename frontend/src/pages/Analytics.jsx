import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  { name: "Low Risk", value: 18 },
  { name: "Medium Risk", value: 10 },
  { name: "High Risk", value: 5 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const barData = [
  { month: "Jan", uploads: 5 },
  { month: "Feb", uploads: 8 },
  { month: "Mar", uploads: 10 },
  { month: "Apr", uploads: 14 },
  { month: "May", uploads: 18 },
  { month: "Jun", uploads: 25 },
];

function Analytics() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold">Contracts</h2>
            <p className="text-4xl mt-4 font-bold text-blue-600">
              33
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold">AI Reports</h2>
            <p className="text-4xl mt-4 font-bold text-indigo-600">
              30
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold">Accuracy</h2>
            <p className="text-4xl mt-4 font-bold text-green-600">
              99%
            </p>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Risk Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
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

              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Monthly Uploads
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={barData}>

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="uploads" fill="#2563eb" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;