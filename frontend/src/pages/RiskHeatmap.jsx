import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

function RiskHeatmap() {
  const clauses = [
    {
      clause: "Confidentiality",
      risk: "Low",
      color: "bg-green-100 border-green-500",
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
      description: "This clause follows standard confidentiality practices.",
    },
    {
      clause: "Termination",
      risk: "High",
      color: "bg-red-100 border-red-500",
      icon: <FaExclamationTriangle className="text-red-600 text-2xl" />,
      description:
        "Employer can terminate the agreement without sufficient notice.",
    },
    {
      clause: "Payment Terms",
      risk: "Medium",
      color: "bg-yellow-100 border-yellow-500",
      icon: <FaInfoCircle className="text-yellow-600 text-2xl" />,
      description:
        "Late payment penalties are not clearly defined.",
    },
    {
      clause: "Intellectual Property",
      risk: "Low",
      color: "bg-green-100 border-green-500",
      icon: <FaCheckCircle className="text-green-600 text-2xl" />,
      description:
        "Ownership of intellectual property is clearly specified.",
    },
    {
      clause: "Non-Compete",
      risk: "High",
      color: "bg-red-100 border-red-500",
      icon: <FaExclamationTriangle className="text-red-600 text-2xl" />,
      description:
        "The non-compete duration may be legally excessive.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <FaShieldAlt className="text-5xl text-blue-600" />
          <div>
            <h1 className="text-4xl font-bold">
              AI Risk Heatmap
            </h1>
            <p className="text-gray-500">
              Review AI-detected risk levels for important contract clauses.
            </p>
          </div>
        </div>

        <div className="space-y-6">

          {clauses.map((item, index) => (

            <div
              key={index}
              className={`border-l-8 ${item.color} rounded-xl shadow p-6`}
            >
              <div className="flex items-center gap-4 mb-3">
                {item.icon}

                <h2 className="text-2xl font-bold">
                  {item.clause}
                </h2>

                <span className="ml-auto font-bold">
                  {item.risk} Risk
                </span>
              </div>

              <p className="text-gray-700">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default RiskHeatmap;