import {
  FaUsers,
  FaFileContract,
  FaRobot,
  FaChartLine,
  FaTrash,
  FaEye,
} from "react-icons/fa";

function Admin() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      contracts: 12,
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice@example.com",
      contracts: 7,
    },
    {
      id: 3,
      name: "David Johnson",
      email: "david@example.com",
      contracts: 19,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Admin Dashboard
        </h1>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaUsers className="text-4xl text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold">245</h2>
            <p>Total Users</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaFileContract className="text-4xl text-green-600 mb-4" />
            <h2 className="text-3xl font-bold">892</h2>
            <p>Contracts</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaRobot className="text-4xl text-indigo-600 mb-4" />
            <h2 className="text-3xl font-bold">853</h2>
            <p>AI Reports</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <FaChartLine className="text-4xl text-red-600 mb-4" />
            <h2 className="text-3xl font-bold">99%</h2>
            <p>Accuracy</p>
          </div>

        </div>

        {/* User Table */}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="py-4">Name</th>
                <th>Email</th>
                <th>Contracts</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="py-4">{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.contracts}</td>

                  <td>

                    <div className="flex justify-center gap-4">

                      <button className="text-blue-600">
                        <FaEye />
                      </button>

                      <button className="text-red-600">
                        <FaTrash />
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

export default Admin;