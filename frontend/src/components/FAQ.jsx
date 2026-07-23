import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import GlassCard from "./ui/GlassCard";

const FAQS = [
  { q: "What file formats are supported?", a: "Currently, ContractGPT supports PDF files up to 20MB. The AI extracts text, cleans it, and creates searchable embeddings for analysis." },
  { q: "Is my contract data secure?", a: "Documents are processed locally on your server. Files are stored in your backend's upload directory and embeddings in ChromaDB. No data is sent to third parties except Google's Gemini API for AI processing." },
  { q: "Can ContractGPT replace a lawyer?", a: "No. ContractGPT provides AI-generated analysis to help you understand contracts faster. It is not a substitute for professional legal advice." },
  { q: "How accurate is the AI analysis?", a: "Our RAG pipeline retrieves relevant contract sections before generating answers, reducing hallucinations. Answers are grounded in your uploaded document." },
  { q: "What AI models are used?", a: "ContractGPT uses Google Gemini for chat and summarization, Gemini embeddings for vector search, and ChromaDB for document storage and retrieval." },
  { q: "Can I download the summary?", a: "Yes! The summary page supports copy, download as TXT, download as PDF, and print functionality." },
];

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Frequently Asked <span className="neon-text">Questions</span></h2>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <GlassCard key={i} className="overflow-hidden" hover={false}>
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="font-medium text-white pr-4">{q}</span>
                <FaChevronDown className={`text-indigo-400 transition-transform shrink-0 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
