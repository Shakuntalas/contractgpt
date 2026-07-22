import {
  FaFileContract,
  FaBalanceScale,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

function Compare() {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <FaBalanceScale className="text-5xl text-blue-600" />
          <div>
            <h1 className="text-4xl font-bold">
              Compare Contracts
            </h1>
            <p className="text-gray-500">
              Compare two contracts side by side.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">
              <FaFileContract className="text-blue-600 text-3xl" />
              <h2 className="text-2xl font-bold">
                Employment_Agreement.pdf
              </h2>
            </div>

            <div className="space-y-5">

              <div>
                <h3 className="font-bold">Risk Level</h3>
                <p className="text-green-600">Low Risk</p>
              </div>

              <div>
                <h3 className="font-bold">Notice Period</h3>
                <p>30 Days</p>
              </div>

              <div>
                <h3 className="font-bold">Salary Clause</h3>
                <p>Clearly Defined</p>
              </div>

              <div>
                <h3 className="font-bold">Termination</h3>
                <p>Standard Terms</p>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">
              <FaFileContract className="text-red-600 text-3xl" />
              <h2 className="text-2xl font-bold">
                Employment_Agreement_V2.pdf
              </h2>
            </div>

            <div className="space-y-5">

              <div>
                <h3 className="font-bold">Risk Level</h3>
                <p className="text-yellow-600">Medium Risk</p>
              </div>

              <div>
                <h3 className="font-bold">Notice Period</h3>
                <p>90 Days</p>
              </div>

              <div>
                <h3 className="font-bold">Salary Clause</h3>
                <p>Needs Clarification</p>
              </div>

              <div>
                <h3 className="font-bold">Termination</h3>
                <p>Employer Favored</p>
              </div>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-3xl font-bold mb-6">
            AI Comparison Summary
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600" />
              <p>
                Contract 1 contains more balanced employment terms.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-yellow-500" />
              <p>
                Contract 2 has a longer notice period and less favorable termination conditions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-600" />
              <p>
                AI recommends Contract 1 based on lower legal risk.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Compare;