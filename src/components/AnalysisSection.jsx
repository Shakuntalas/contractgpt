function AnalysisSection() {
  return (
    <section className="py-20 px-8 bg-slate-50">

      <h2 className="text-4xl font-bold text-center mb-12">
        AI Analysis Results
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h3 className="text-2xl font-bold mb-6 text-blue-600">
            📄 Contract Summary
          </h3>

          <p className="text-gray-700 leading-8">
            • Agreement Duration: 24 Months <br />
            • Parties Involved: 2 <br />
            • Payment Terms: Monthly <br />
            • Governing Law: India <br />
            • Confidentiality Clause Included
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h3 className="text-2xl font-bold mb-6 text-red-600">
            ⚠ Risk Analysis
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li>🔴 High termination penalty</li>
            <li>🟡 Ambiguous payment clause</li>
            <li>🟢 Confidentiality clause present</li>
            <li>🟢 Arbitration clause included</li>
          </ul>

        </div>

      </div>

    </section>
  );
}

export default AnalysisSection;