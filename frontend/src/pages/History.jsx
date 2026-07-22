import { FaFileContract, FaEye, FaDownload, FaSearch } from "react-icons/fa";

function History() {
  const contracts = [
    {
      id: 1,
      name: "Employment_Agreement.pdf",
      risk: "Low",
      date: "22 Jul 2026",
    },
    {
      id: 2,
      name: "Rental_Agreement.pdf",
      risk: "Medium",
      date: "21 Jul 2026",
    },
    {
      id: 3,
      name: "NDA.pdf",
      risk: "High",
      date: "20 Jul 2026",
    },
    {
      id: 4,
      name: "Internship_Letter.pdf",
      risk: "Low",
      date: "18 Jul 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Contract History
            </h1>
            <p className="text-gray-500 mt-2">
              View all previously analyzed contracts.
            </p>
          </div>

          <div className="flex items-center border rounded-xl bg-white px-4 py-3 shadow">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search contracts..."
              className="outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4">Contract</th>
                <th>Date</th>
                <th>Risk</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {contracts.map((contract) => (

                <tr
                  key={contract.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="py-5 px-6 flex items-center gap-3">
                    <FaFileContract className="text-blue-600" />
                    {contract.name}
                  </td>

                  <td>{contract.date}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        contract.risk === "Low"
                          ? "bg-green-500"
                          : contract.risk === "Medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {contract.risk}
                    </span>
                  </td>

                  <td>

                    <div className="flex justify-center gap-4">

                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>

                      <button className="text-green-600 hover:text-green-800">
                        <FaDownload />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default History;