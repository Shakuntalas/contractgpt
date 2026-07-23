import { motion } from "framer-motion";
import {
  FaRobot, FaFileContract, FaShieldAlt, FaComments,
  FaClock, FaChartLine, FaSearch, FaBalanceScale,
} from "react-icons/fa";
import GlassCard from "./ui/GlassCard";

const FEATURES = [
  { icon: FaRobot, title: "AI-Powered Analysis", desc: "Gemini AI reads and understands your entire contract using advanced RAG technology.", color: "text-indigo-400" },
  { icon: FaFileContract, title: "Smart Summaries", desc: "Executive summaries, key terms, and risky clauses extracted automatically.", color: "text-violet-400" },
  { icon: FaShieldAlt, title: "Risk Detection", desc: "Identify hidden obligations, auto-renewals, and liability traps before signing.", color: "text-emerald-400" },
  { icon: FaComments, title: "Chat with Contract", desc: "Ask questions in plain English and get instant, context-aware answers.", color: "text-cyan-400" },
  { icon: FaClock, title: "Save Hours", desc: "Reduce manual legal review from hours to seconds with AI automation.", color: "text-amber-400" },
  { icon: FaChartLine, title: "Risk Scoring", desc: "Get a 0-100 risk score with detailed breakdown of contract concerns.", color: "text-rose-400" },
  { icon: FaSearch, title: "Clause Search", desc: "Semantic search finds relevant clauses even when wording differs.", color: "text-blue-400" },
  { icon: FaBalanceScale, title: "Plain English", desc: "Complex legal language translated into clear, understandable terms.", color: "text-purple-400" },
];

function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to <span className="neon-text">Review Contracts</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Powered by LangChain, Gemini AI, and ChromaDB vector search for accurate, context-aware analysis.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="p-6 h-full">
                <Icon className={`text-3xl ${color} mb-4`} />
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
