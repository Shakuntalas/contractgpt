function ChatSection() {
  return (
    <section className="py-20 px-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-4xl font-bold text-center mb-10">
          Chat with Your Contract
        </h2>

        <div className="bg-gray-100 rounded-2xl p-6 h-80 overflow-y-auto mb-6">

          <div className="bg-blue-600 text-white p-4 rounded-2xl w-fit max-w-lg mb-4">
            Summarize this contract.
          </div>

          <div className="bg-white shadow p-4 rounded-2xl w-fit max-w-2xl">
            This contract is a 24-month service agreement between two parties.
            It includes confidentiality and arbitration clauses, with one
            high-risk termination penalty.
          </div>

        </div>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Ask anything about your contract..."
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="bg-blue-600 text-white px-8 rounded-xl hover:bg-blue-700">
            Send
          </button>

        </div>

      </div>

    </section>
  );
}

export default ChatSection;