import { motion } from "framer-motion";
import { FaUpload, FaBrain, FaComments, FaFileAlt } from "react-icons/fa";

const STEPS = [
  { icon: FaUpload, title: "Upload PDF", desc: "Drag and drop your contract. We support PDF files up to 20MB with secure processing." },
  { icon: FaBrain, title: "AI Processing", desc: "Gemini AI embeds your document into ChromaDB for semantic search and analysis." },
  { icon: FaComments, title: "Chat & Explore", desc: "Ask questions in natural language. Get instant answers grounded in your contract." },
  { icon: FaFileAlt, title: "Get Summary", desc: "Generate executive summaries, key terms, risk scores, and downloadable reports." },
];

function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3">How It <span className="neon-text">Works</span></h2>
          <p className="text-slate-400">Four simple steps to understand any contract</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl glass flex items-center justify-center neon-glow">
                <Icon className="text-2xl text-indigo-400" />
              </div>
              <span className="text-xs font-bold text-indigo-400 mb-2 block">STEP {i + 1}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
