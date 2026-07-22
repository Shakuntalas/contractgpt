function Features() {
  return (
    <section className="py-20 px-8 bg-white">

      <h2 className="text-4xl font-bold text-center mb-12">
        Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-gray-100 p-8 rounded-xl shadow">
          <h3 className="text-2xl font-bold mb-4">
            📄 Upload Contracts
          </h3>

          <p className="text-gray-600">
            Upload PDF or DOC contracts securely for AI analysis.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-xl shadow">
          <h3 className="text-2xl font-bold mb-4">
            ⚠ Risk Detection
          </h3>

          <p className="text-gray-600">
            Identify risky clauses and hidden legal issues instantly.
          </p>
        </div>

        <div className="bg-gray-100 p-8 rounded-xl shadow">
          <h3 className="text-2xl font-bold mb-4">
            🤖 AI Summary
          </h3>

          <p className="text-gray-600">
            Generate simple summaries of complex legal documents.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;