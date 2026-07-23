import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBookOpen, FaSearch, FaFileAlt, FaTimes, FaLightbulb } from "react-icons/fa";
import GlassCard from "../components/ui/GlassCard";

const CLAUSES = [
  {
    title: "Confidentiality Clause (NDA)",
    category: "Protection",
    short: "Prevents parties from disclosing proprietary information shared during the agreement.",
    detail: "A confidentiality clause binds parties to secrecy regarding proprietary tech, client lists, or financial data. Key elements to look for include exceptions (e.g. legally required disclosure) and reasonable time limits (e.g. 2-5 years)."
  },
  {
    title: "Termination for Convenience",
    category: "Risk",
    short: "Allows one or both parties to terminate the contract without giving any specific reason.",
    detail: "Termination for convenience lets a party end the contract anytime with written notice (e.g. 30 days). Warning: Ensure notice periods are mutual and unearned fees/expenses are reimbursed upon early exit."
  },
  {
    title: "Limitation of Liability",
    category: "Financial Risk",
    short: "Caps maximum dollar damages one party can recover from another in legal disputes.",
    detail: "This clause limits financial exposure, usually to total fees paid in the last 12 months. Make sure exclusions (like gross negligence or willful misconduct) are included."
  },
  {
    title: "Indemnification",
    category: "Legal Risk",
    short: "Requires one party to cover legal fees and damages if a third party sues.",
    detail: "Indemnification shifts loss from one party to another. Uncapped indemnities for third-party IP infringement or breach of privacy can carry high financial risk."
  },
  {
    title: "Intellectual Property (IP) Assignment",
    category: "Ownership",
    short: "Defines who owns inventions, software, designs, or documentation created under the agreement.",
    detail: "Ensures work product belongs to the hiring party upon full payment. Contractors should ensure background IP (pre-existing tools) remains their property."
  },
  {
    title: "Force Majeure",
    category: "General",
    short: "Excuses performance delays caused by uncontrollable acts of God or wars.",
    detail: "Suspends contractual obligations during natural disasters, pandemics, or government shutdowns. Check if payment obligations are explicitly excluded from force majeure relief."
  },
];

function ClauseLibrary() {
  const [query, setQuery] = useState("");
  const [activeClause, setActiveClause] = useState(null);

  const filtered = CLAUSES.filter(
    (c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.short.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">AI Clause Library</h1>
              <p className="text-slate-400 text-sm">Essential guide to common contract clauses and legal standards</p>
            </div>

            <div className="flex items-center glass rounded-xl px-4 py-2.5 max-w-xs w-full">
              <FaSearch className="text-slate-500 mr-2" />
              <input
                type="text"
                placeholder="Search clauses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none text-white text-sm placeholder-slate-500 w-full"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((clause, idx) => (
              <GlassCard key={idx} className="p-6 flex flex-col justify-between" hover={true}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <FaBookOpen className="text-2xl text-indigo-400" />
                    <span className="text-xs px-2.5 py-0.5 rounded-full glass text-indigo-300 font-medium">
                      {clause.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2">{clause.title}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{clause.short}</p>
                </div>
                <button
                  onClick={() => setActiveClause(clause)}
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold pt-2"
                >
                  <FaFileAlt /> Learn Details & Best Practices
                </button>
              </GlassCard>
            ))}
          </div>

          <AnimatePresence>
            {activeClause && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="max-w-lg w-full glass-strong border border-white/10 rounded-3xl p-8 relative"
                >
                  <button
                    onClick={() => setActiveClause(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
                  >
                    <FaTimes size={18} />
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <FaLightbulb className="text-3xl text-amber-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeClause.title}</h3>
                      <span className="text-xs text-indigo-300">{activeClause.category}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{activeClause.detail}</p>
                  <button onClick={() => setActiveClause(null)} className="btn-primary w-full justify-center">
                    Close Guide
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default ClauseLibrary;