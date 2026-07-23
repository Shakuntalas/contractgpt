import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaFilePdf, FaRedo } from "react-icons/fa";
import { getSummary } from "../api/api";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";

function RiskHeatmap() {
  const { documentId, contracts } = useApp();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeContract = contracts.find((c) => c.document_id === documentId);

  const loadData = async () => {
    if (!documentId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getSummary(documentId);
      setReport(data);
    } catch (err) {
      setError(err.message || "Failed to load contract risk analysis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [documentId]);

  if (!documentId) {
    return (
      <div className="page-content min-h-[80vh] flex items-center justify-center px-4">
        <GlassCard className="p-12 text-center max-w-lg" hover={false}>
          <FaShieldAlt className="text-6xl text-indigo-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-3">No Contract Selected</h2>
          <p className="text-slate-400 mb-6">Upload a contract to view its visual AI Risk Heatmap.</p>
          <Link to="/upload" className="btn-primary">Upload Contract</Link>
        </GlassCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-content min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-indigo-300 text-lg">Generating Risk Heatmap...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="page-content min-h-[80vh] flex items-center justify-center px-4">
        <GlassCard className="p-12 text-center max-w-lg" hover={false}>
          <FaExclamationTriangle className="text-5xl text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Analysis Error</h2>
          <p className="text-slate-400 mb-6">{error || "Could not analyze risk profile."}</p>
          <button onClick={loadData} className="btn-primary"><FaRedo /> Retry</button>
        </GlassCard>
      </div>
    );
  }

  const riskyClauses = report.risky_clauses || [];
  const keyTerms = report.key_terms || [];
  const liabilities = report.liability || [];
  const terminations = report.termination || [];

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl glass border border-indigo-500/30 text-indigo-400">
                <FaShieldAlt className="text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">AI Risk Heatmap</h1>
                <p className="text-slate-400 text-sm">
                  Document: <span className="text-white font-medium">{activeContract?.original_filename || documentId}</span>
                </p>
              </div>
            </div>

            <GlassCard className="px-6 py-3 text-center" hover={false}>
              <div className="text-xs text-slate-400">Overall Risk Score</div>
              <div className={`text-2xl font-extrabold ${report.risk_score >= 70 ? "text-red-400" : report.risk_score >= 40 ? "text-amber-400" : "text-emerald-400"}`}>
                {report.risk_score} / 100
              </div>
            </GlassCard>
          </div>

          <div className="grid gap-6 mb-8">
            {riskyClauses.length > 0 ? (
              riskyClauses.map((clause, index) => (
                <GlassCard key={index} className="p-6 border-l-4 border-l-red-500" hover={false}>
                  <div className="flex items-start gap-4">
                    <FaExclamationTriangle className="text-2xl text-red-400 shrink-0 mt-1" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300">High Severity</span>
                        <span className="text-xs text-slate-500">Risky Provision #{index + 1}</span>
                      </div>
                      <p className="text-white font-medium leading-relaxed">{clause}</p>
                    </div>
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="p-8 text-center" hover={false}>
                <FaCheckCircle className="text-5xl text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No High-Risk Traps Detected</h3>
                <p className="text-slate-400 text-sm">This contract follows standard safe guidelines.</p>
              </GlassCard>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6" hover={false}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-indigo-400" /> Key Provisions & Liabilities
              </h2>
              <ul className="space-y-3">
                {liabilities.concat(keyTerms.slice(0, 3)).map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-300 text-sm">
                    <span className="text-indigo-400 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaFilePdf className="text-cyan-400" /> Termination Terms
              </h2>
              <ul className="space-y-3">
                {terminations.map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-300 text-sm">
                    <span className="text-cyan-400 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RiskHeatmap;