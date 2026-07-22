import {
  FaRobot,
  FaFileContract,
  FaShieldAlt,
  FaComments,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaRobot className="text-5xl text-blue-600" />,
      title: "AI Powered Analysis",
      description:
        "Automatically analyze contracts using Artificial Intelligence and identify important clauses instantly.",
    },
    {
      icon: <FaFileContract className="text-5xl text-indigo-600" />,
      title: "Smart Contract Review",
      description:
        "Understand lengthy contracts within seconds with AI-generated summaries and highlights.",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-green-600" />,
      title: "Risk Detection",
      description:
        "Identify risky clauses, hidden obligations, and missing legal terms before signing.",
    },
    {
      icon: <FaComments className="text-5xl text-purple-600" />,
      title: "AI Chat Assistant",
      description:
        "Ask questions about your uploaded contract and receive instant AI-generated answers.",
    },
    {
      icon: <FaClock className="text-5xl text-orange-500" />,
      title: "Save Time",
      description:
        "Reduce hours of manual legal review into just a few seconds with AI automation.",
    },
    {
      icon: <FaChartLine className="text-5xl text-red-500" />,
      title: "Detailed Insights",
      description:
        "Receive confidence scores, contract summaries, and actionable insights in one dashboard.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-100">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900">
            Powerful AI Features
          </h2>

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
            ContractGPT combines Artificial Intelligence with modern
            contract analysis to help users review, summarize, and understand
            legal documents effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div className="mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;