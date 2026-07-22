function Stats() {
  return (
    <section className="bg-blue-600 text-white py-16">

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">

        <div>
          <h2 className="text-5xl font-bold">10K+</h2>
          <p className="mt-2">Contracts Analyzed</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">98%</h2>
          <p className="mt-2">Risk Detection Accuracy</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">24/7</h2>
          <p className="mt-2">AI Availability</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">100+</h2>
          <p className="mt-2">Companies Served</p>
        </div>

      </div>

    </section>
  );
}

export default Stats;