import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaRobot, FaLightbulb, FaSearch } from "react-icons/fa";
import { explainClauseApi } from "../api/api";
import GlassCard from "../components/ui/GlassCard";
import MarkdownRenderer from "../components/ui/MarkdownRenderer";

function ClauseExplainer() {
  const [clause, setClause] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const explainClause = async () => {
    if (!clause.trim()) {
      toast.warning("Please paste a contract clause first.");
      return;
    }

    setLoading(true);
    setExplanation("");
    try {
      const data = await explainClauseApi(clause);
      setExplanation(data.explanation || "No explanation generated.");
      toast.success("Clause explained!");
    } catch (err) {
      toast.error(err.message || "Failed to explain clause.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl glass border border-indigo-500/30 text-indigo-400">
              <FaRobot className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">AI Clause Explainer</h1>
              <p className="text-slate-400 text-sm">Translate complex legal legalese into plain, simple English instantly.</p>
            </div>
          </div>

          <GlassCard className="p-8 mb-8 gradient-border" hover={false}>
            <label className="text-sm font-medium text-slate-300 mb-3 block">Paste Legal Clause Here</label>
            <textarea
              rows={6}
              placeholder="e.g. 'Either party may terminate this Agreement without cause upon giving ninety (90) days prior written notice to the other party...'"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
              value={clause}
              onChange={(e) => setClause(e.target.value)}
            />

            <button
              onClick={explainClause}
              disabled={loading || !clause.trim()}
              className="mt-4 btn-primary px-8 py-3 flex items-center gap-3"
            >
              <FaSearch />
              {loading ? "Analyzing Clause..." : "Explain in Plain English"}
            </button>
          </GlassCard>

          {explanation && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-8 border-l-4 border-l-indigo-500" hover={false}>
                <div className="flex items-center gap-3 mb-4">
                  <FaLightbulb className="text-2xl text-amber-400" />
                  <h2 className="text-xl font-bold text-white">AI Plain English Explanation</h2>
                </div>
                <MarkdownRenderer content={explanation} />
              </GlassCard>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default ClauseExplainer;