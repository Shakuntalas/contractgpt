import { useState } from "react";
import { FaRobot, FaUserCircle, FaPaperPlane, FaPaperclip } from "react-icons/fa";
import GlassCard from "./ui/GlassCard";

function ChatSection() {
  const [message, setMessage] = useState("");

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Interactive <span className="neon-text">AI Chat</span></h2>
          <p className="text-slate-400">Ask specific questions about your uploaded contract and receive grounded answers.</p>
        </div>

        <GlassCard className="p-6 gradient-border" hover={false}>
          <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
            <FaRobot className="text-3xl text-indigo-400" />
            <div>
              <h3 className="font-bold text-white text-lg">ContractGPT Assistant</h3>
              <p className="text-xs text-indigo-300">RAG Grounded Intelligence</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <FaRobot className="text-2xl text-indigo-400 shrink-0 mt-1" />
              <div className="glass rounded-2xl p-4 text-slate-200 text-sm">
                Hello! 👋 Upload your contract and ask me anything. I can summarize clauses, identify risks, and explain terms.
              </div>
            </div>

            <div className="flex gap-3 ml-auto justify-end max-w-md">
              <div className="bg-indigo-600 rounded-2xl p-4 text-white text-sm">
                Can you summarize this employment contract?
              </div>
              <FaUserCircle className="text-2xl text-slate-400 shrink-0 mt-1" />
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask anything about your contract..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none"
            />
            <button className="btn-primary px-6 py-3">
              <FaPaperPlane /> Send
            </button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

export default ChatSection;