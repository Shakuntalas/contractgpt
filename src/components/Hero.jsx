function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6">

      <h2 className="text-5xl font-bold text-gray-800 mb-6">
        AI-Powered Contract Analysis
      </h2>

      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        Upload contracts, detect risks, summarize clauses,
        and understand legal documents using Artificial Intelligence.
      </p>

      <div className="space-x-4">

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Upload Contract
        </button>

        <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
          Learn More
        </button>

      </div>

    </section>
  );
}

export default Hero;