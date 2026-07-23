import { motion } from "framer-motion";
import { FaQuestionCircle, FaEnvelope, FaBook, FaRobot, FaShieldAlt } from "react-icons/fa";
import GlassCard from "../components/ui/GlassCard";

function Help() {
  const faqs = [
    {
      q: "How does ContractGPT analyze contracts?",
      a: "ContractGPT extracts text from your uploaded PDF, creates embeddings with Google Gemini, stores them in ChromaDB, and uses Retrieval-Augmented Generation (RAG) to generate grounded summaries and answer questions."
    },
    {
      q: "Which file formats and sizes are supported?",
      a: "Currently PDF contracts up to 20 MB are supported. The system cleans header/footer artifacts and creates page-aware chunks."
    },
    {
      q: "Is my contract data private?",
      a: "Yes. Documents are processed locally on your backend server and embeddings stored in ChromaDB vectorstore. Communication with Google Gemini uses encrypted HTTPS."
    },
    {
      q: "Can I export or print the AI summaries?",
      a: "Yes! On the Summary page, you can copy text to clipboard, download as TXT or PDF, or print directly."
    }
  ];

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <FaRobot className="text-6xl text-indigo-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-3">Help & Support</h1>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Everything you need to know about uploading, chatting, and analyzing legal documents with ContractGPT.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-indigo-400" /> Frequently Asked Questions
              </h2>
              {faqs.map((faq, idx) => (
                <GlassCard key={idx} className="p-6" hover={false}>
                  <h3 className="font-semibold text-white text-base mb-2">{faq.q}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{faq.a}</p>
                </GlassCard>
              ))}
            </div>

            <div className="space-y-6">
              <GlassCard className="p-6" hover={false}>
                <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                  <FaEnvelope className="text-emerald-400" /> Email Support
                </h3>
                <p className="text-slate-400 text-sm mb-4">Questions or feedback? Send us an email.</p>
                <a href="mailto:support@contractgpt.ai" className="text-indigo-300 hover:underline font-medium text-sm">
                  support@contractgpt.ai
                </a>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                  <FaBook className="text-cyan-400" /> Documentation
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ContractGPT leverages LangChain, Google Gemini 1.5 Flash, and ChromaDB vector database.
                </p>
              </GlassCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Help;