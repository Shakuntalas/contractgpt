import { FaBookOpen, FaSearch, FaFileAlt } from "react-icons/fa";

function ClauseLibrary() {
  const clauses = [
    {
      title: "Confidentiality Clause",
      description:
        "Prevents parties from disclosing confidential information shared during the agreement."
    },
    {
      title: "Termination Clause",
      description:
        "Defines how either party can legally terminate the contract."
    },
    {
      title: "Payment Terms",
      description:
        "Specifies payment schedule, due dates, penalties, and billing conditions."
    },
    {
      title: "Intellectual Property",
      description:
        "Defines ownership of inventions, software, designs, or other created work."
    },
    {
      title: "Non-Disclosure Agreement (NDA)",
      description:
        "Protects sensitive business information from being disclosed."
    },
    {
      title: "Force Majeure",
      description:
        "Protects parties if extraordinary events prevent fulfilling contractual obligations."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              AI Clause Library
            </h1>

            <p className="text-gray-500 mt-2">
              Learn the meaning of common legal clauses used in contracts.
            </p>
          </div>

          <div className="flex items-center bg-white rounded-xl shadow px-4 py-3">

            <FaSearch className="text-gray-400 mr-3" />

            <input
              type="text"
              placeholder="Search clause..."
              className="outline-none"
            />

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {clauses.map((clause, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >

              <FaBookOpen className="text-blue-600 text-4xl mb-4" />

              <h2 className="text-xl font-bold mb-3">
                {clause.title}
              </h2>

              <p className="text-gray-600 mb-5">
                {clause.description}
              </p>

              <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800">

                <FaFileAlt />

                Learn More

              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ClauseLibrary;