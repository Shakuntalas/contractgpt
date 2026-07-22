import { useState } from "react";
import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
  FaPaperclip,
  FaMicrophone,
  FaHistory,
  FaPlus,
} from "react-icons/fa";

function Chat() {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="grid lg:grid-cols-4 h-screen">

        {/* Sidebar */}

        <div className="bg-gray-900 text-white p-6 flex flex-col">

          <button className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 mb-8 transition">
            <FaPlus />
            New Chat
          </button>

          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <FaHistory />
            Recent Chats
          </h2>

          <div className="space-y-3">

            <div className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition">
              Employment Agreement
            </div>

            <div className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition">
              Rental Contract
            </div>

            <div className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition">
              NDA Agreement
            </div>

          </div>

          <div className="mt-auto text-gray-400 text-sm">
            ContractGPT AI Assistant
          </div>

        </div>

        {/* Chat Area */}

        <div className="lg:col-span-3 flex flex-col">

          {/* Header */}

          <div className="bg-white shadow px-8 py-5 flex items-center gap-4">

            <FaRobot className="text-4xl text-blue-600" />

            <div>

              <h1 className="text-2xl font-bold">
                ContractGPT
              </h1>

              <p className="text-gray-500">
                AI Contract Assistant
              </p>

            </div>

          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-8 space-y-8">

            {/* AI */}

            <div className="flex gap-4">

              <FaRobot className="text-4xl text-blue-600 mt-1" />

              <div className="bg-white shadow rounded-2xl p-5 max-w-2xl">

                <h3 className="font-semibold text-blue-600 mb-2">
                  ContractGPT
                </h3>

                <p className="text-gray-700 leading-7">
                  Hello 👋 I'm your AI legal assistant.
                  Upload a contract and ask me questions about clauses,
                  risks, summaries, obligations, payment terms, or legal
                  language.
                </p>

              </div>

            </div>

            {/* User */}

            <div className="flex justify-end gap-4">

              <div className="bg-blue-600 text-white rounded-2xl p-5 max-w-2xl">
                Explain the termination clause.
              </div>

              <FaUserCircle className="text-4xl text-gray-600 mt-1" />

            </div>

            {/* AI */}

            <div className="flex gap-4">

              <FaRobot className="text-4xl text-blue-600 mt-1" />

              <div className="bg-white shadow rounded-2xl p-5 max-w-2xl">

                <h3 className="font-semibold text-blue-600 mb-2">
                  ContractGPT
                </h3>

                <p className="text-gray-700 leading-7">
                  The termination clause allows either party to end the
                  agreement with a 30-day written notice. Early termination
                  may involve additional obligations depending on the
                  circumstances outlined in the contract.
                </p>

              </div>

            </div>

          </div>

          {/* Input */}

          <div className="bg-white border-t p-6">

            <div className="flex items-center gap-4">

              <button className="text-2xl text-gray-500 hover:text-blue-600">
                <FaPaperclip />
              </button>

              <input
                type="text"
                placeholder="Ask anything about your contract..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button className="text-2xl text-gray-500 hover:text-blue-600">
                <FaMicrophone />
              </button>

              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition">
                <FaPaperPlane />
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Chat;