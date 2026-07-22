import { useState } from "react";
import { FaRobot, FaLightbulb, FaSearch } from "react-icons/fa";

function ClauseExplainer() {
  const [clause, setClause] = useState("");
  const [explanation, setExplanation] = useState("");

  const explainClause = () => {
    if (!clause.trim()) {
      setExplanation("Please enter a contract clause.");
      return;
    }

    setExplanation(
      `AI Explanation:

"${clause}"

This clause appears to define legal rights and obligations between the parties. Before signing, verify that the responsibilities, deadlines, penalties, and exceptions are clearly stated.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center gap-4 mb-8">

          <FaRobot className="text-5xl text-blue-600" />

          <div>

            <h1 className="text-4xl font-bold">
              AI Clause Explainer
            </h1>

            <p className="text-gray-500">
              Understand legal clauses in simple language.
            </p>

          </div>

        </div>

        <textarea
          rows={8}
          placeholder="Paste any contract clause here..."
          className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
          value={clause}
          onChange={(e) => setClause(e.target.value)}
        />

        <button
          onClick={explainClause}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-3"
        >
          <FaSearch />
          Explain Clause
        </button>

        {explanation && (
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6">

            <div className="flex items-center gap-3 mb-3">

              <FaLightbulb className="text-yellow-500 text-2xl" />

              <h2 className="text-2xl font-bold">
                AI Explanation
              </h2>

            </div>

            <p className="whitespace-pre-line text-gray-700 leading-8">
              {explanation}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default ClauseExplainer;