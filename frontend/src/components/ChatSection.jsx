import { useState } from "react";
import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
  FaPaperclip,
  FaMicrophone,
} from "react-icons/fa";

function ChatSection() {
  const [message, setMessage] = useState("");

  return (
    <section className="py-24 bg-gradient-to-br from-slate-100 to-blue-50">
      <div className="max-w-6xl mx-auto px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-gray-900">
            Chat with ContractGPT
          </h2>

          <p className="text-gray-600 mt-5 text-lg">
            Ask questions about your uploaded contract and receive
            AI-powered responses instantly.
          </p>
        </div>

        {/* Chat Box */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center gap-4">
            <FaRobot className="text-4xl" />
            <div>
              <h3 className="text-2xl font-bold">
                ContractGPT Assistant
              </h3>
              <p className="text-blue-100">
                AI is ready to answer your questions.
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-8 space-y-8 h-[450px] overflow-y-auto bg-gray-50">

            {/* AI Message */}
            <div className="flex items-start gap-4">

              <FaRobot className="text-4xl text-blue-600 mt-1" />

              <div className="bg-white shadow rounded-2xl p-5 max-w-xl">
                <h4 className="font-semibold text-blue-600 mb-2">
                  ContractGPT
                </h4>

                <p className="text-gray-700 leading-7">
                  Hello! 👋 Upload your contract and ask me anything.
                  I can summarize clauses, identify risks, explain legal
                  terms, and provide AI-generated insights.
                </p>
              </div>

            </div>

            {/* User Message */}
            <div className="flex justify-end items-start gap-4">

              <div className="bg-blue-600 text-white rounded-2xl p-5 max-w-xl">
                Can you summarize this employment contract?
              </div>

              <FaUserCircle className="text-4xl text-gray-600 mt-1" />

            </div>

            {/* AI Response */}
            <div className="flex items-start gap-4">

              <FaRobot className="text-4xl text-blue-600 mt-1" />

              <div className="bg-white shadow rounded-2xl p-5 max-w-xl">
                <h4 className="font-semibold text-blue-600 mb-2">
                  ContractGPT
                </h4>

                <p className="text-gray-700 leading-7">
                  This employment contract outlines job responsibilities,
                  salary, confidentiality, notice period, and termination
                  conditions. Overall, the agreement appears standard,
                  but I recommend reviewing the termination clause and
                  confidentiality obligations carefully.
                </p>
              </div>

            </div>

          </div>

          {/* Input */}
          <div className="border-t bg-white p-6">

            <div className="flex items-center gap-4">

              <button className="text-gray-500 hover:text-blue-600 text-2xl transition">
                <FaPaperclip />
              </button>

              <input
                type="text"
                placeholder="Ask anything about your contract..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="text-gray-500 hover:text-blue-600 text-2xl transition">
                <FaMicrophone />
              </button>

              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2">
                <FaPaperPlane />
                Send
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ChatSection;