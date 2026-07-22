import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaFileAlt,
  FaRobot,
} from "react-icons/fa";

function AnalysisSection() {
  const cards = [
    {
      icon: <FaExclamationTriangle className="text-5xl text-red-500" />,
      title: "High Risk Clauses",
      value: "03",
      bg: "bg-red-50",
    },
    {
      icon: <FaCheckCircle className="text-5xl text-green-500" />,
      title: "Safe Clauses",
      value: "15",
      bg: "bg-green-50",
    },
    {
      icon: <FaFileAlt className="text-5xl text-blue-500" />,
      title: "Total Pages",
      value: "08",
      bg: "bg-blue-50",
    },
    {
      icon: <FaRobot className="text-5xl text-indigo-600" />,
      title: "AI Confidence",
      value: "98%",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900">
            AI Contract Analysis
          </h2>

          <p className="text-gray-600 mt-5 text-lg">
            Instantly understand your contracts with AI-powered insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bg} rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="flex justify-center mb-6">
                {card.icon}
              </div>

              <h3 className="text-5xl font-bold text-gray-900">
                {card.value}
              </h3>

              <p className="text-gray-600 mt-3 text-lg">
                {card.title}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-10">

          <h3 className="text-3xl font-bold mb-6">
            AI Summary
          </h3>

          <p className="text-gray-600 leading-8 text-lg">
            The uploaded contract appears to have a
            <span className="font-bold text-green-600"> Low Risk </span>
            profile. The AI detected a few clauses that may require review,
            but the overall agreement follows standard legal practices.
            We recommend carefully checking the highlighted payment terms,
            termination conditions, and confidentiality clause before signing.
          </p>

        </div>

      </div>
    </section>
  );
}

export default AnalysisSection;