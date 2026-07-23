import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaFilePdf, FaShieldAlt, FaExclamationTriangle, FaCheckCircle,
  FaCopy, FaDownload, FaPrint, FaRedo, FaArrowLeft,
} from "react-icons/fa";
import { getSummary } from "../api/api";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";
import {
  buildSummaryText, downloadTextFile, downloadSummaryPdf,
  copyToClipboard, printSummary,
} from "../utils/download";

function RiskGauge({ score = 0 }) {
  const color = score >= 70 ? "text-red-400" : score >= 40 ? "text-amber-400" : "text-emerald-400";
  const label = score >= 70 ? "High Risk" : score >= 40 ? "Medium Risk" : "Low Risk";

  return (
    <div className="text-center">
      <div className={`text-5xl font-extrabold ${color}`}>{score}</div>
      <div className="text-sm text-slate-400 mt-1">/ 100</div>
      <div className={`text-sm font-medium mt-2 ${color}`}>{label}</div>
      <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden max-w-[120px] mx-auto">
        <div
          className={`h-full rounded-full transition-all ${
            score >= 70 ? "bg-red-500" : score >= 40 ? "bg-amber-500" : "bg-emerald-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function SummarySection({ title, items, variant = "default" }) {
  if (!items?.length) return null;
  const colors = {
    default: "text-white",
    risk: "text-red-300",
    success: "text-emerald-300",
  };

  return (
    <GlassCard className="p-6" hover={false}>
      <h2 className={`text-xl font-bold mb-4 ${colors[variant] || colors.default}`}>{title}</h2>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
            <span className="text-indigo-400 shrink-0">•</span>
            {item}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

function Summary() {
  const navigate = useNavigate();
  const { documentId, bumpStat } = useApp();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReport = async () => {
    if (!documentId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getSummary(documentId);
      setReport(data);
      bumpStat("summariesGenerated");
    } catch (err) {
      setError(err.message || "Unable to load summary.");
      toast.error(err.message || "Unable to load summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReport(); }, [documentId]);

  if (!documentId) {
    return (
      <div className="page-content min-h-[80vh] flex items-center justify-center px-4">
        <GlassCard className="p-12 text-center max-w-lg" hover={false}>
          <FaFilePdf className="text-6xl text-indigo-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-3">No Contract Found</h2>
          <p className="text-slate-400 mb-6">Upload a contract to generate an AI summary.</p>
          <Link to="/upload" className="btn-primary">Upload Contract</Link>
        </GlassCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-content min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-indigo-300 text-lg">Generating AI Summary...</p>
        <div className="w-64 skeleton h-3" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="page-content min-h-[80vh] flex items-center justify-center px-4">
        <GlassCard className="p-12 text-center max-w-lg" hover={false}>
          <FaExclamationTriangle className="text-5xl text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Summary Failed</h2>
          <p className="text-slate-400 mb-6">{error || "No report found."}</p>
          <button onClick={loadReport} className="btn-primary"><FaRedo /> Retry</button>
        </GlassCard>
      </div>
    );
  }

  const handleCopy = async () => {
    const ok = await copyToClipboard(buildSummaryText(report));
    toast[ok ? "success" : "error"](ok ? "Summary copied!" : "Copy failed.");
  };

  return (
    <div className="page-content min-h-screen py-8 px-4 sm:px-6 lg:px-8 print-content">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="btn-ghost text-sm py-2 flex items-center gap-2">
            <FaArrowLeft /> Back
          </button>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleCopy} className="btn-ghost text-sm py-2 flex items-center gap-2">
              <FaCopy /> Copy
            </button>
            <button
              onClick={() => downloadTextFile(buildSummaryText(report))}
              className="btn-ghost text-sm py-2 flex items-center gap-2"
            >
              <FaDownload /> TXT
            </button>
            <button
              onClick={() => downloadSummaryPdf(report)}
              className="btn-ghost text-sm py-2 flex items-center gap-2"
            >
              <FaFilePdf /> PDF
            </button>
            <button onClick={printSummary} className="btn-ghost text-sm py-2 flex items-center gap-2">
              <FaPrint /> Print
            </button>
            <button onClick={loadReport} className="btn-primary text-sm py-2 flex items-center gap-2">
              <FaRedo /> Regenerate
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="p-8 mb-6 gradient-border" hover={false}>
            <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">AI Contract Summary</h1>
                <p className="text-slate-400 text-sm">Generated by ContractGPT · ID: {report.document_id?.slice(0, 8)}...</p>
              </div>
              <RiskGauge score={report.risk_score ?? 0} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: FaCheckCircle, label: "Summary", value: "Ready", color: "text-emerald-400" },
                { icon: FaShieldAlt, label: "Key Terms", value: report.key_terms?.length || 0, color: "text-indigo-400" },
                { icon: FaExclamationTriangle, label: "Risky Clauses", value: report.risky_clauses?.length || 0, color: "text-amber-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="glass rounded-xl p-4 text-center">
                  <Icon className={`text-3xl ${color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>

            <GlassCard className="p-6 mb-6 bg-white/2" hover={false}>
              <h2 className="text-xl font-bold mb-3 text-white">Executive Summary</h2>
              <p className="text-slate-300 leading-relaxed">{report.summary}</p>
            </GlassCard>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-4">
            <SummarySection title="Key Terms" items={report.key_terms} />
            <SummarySection title="Risky Clauses" items={report.risky_clauses} variant="risk" />
            <SummarySection title="Payment Terms" items={report.payment_terms} />
            <SummarySection title="Obligations" items={report.obligations} />
            <SummarySection title="Responsibilities" items={report.responsibilities} />
            <SummarySection title="Liability" items={report.liability} />
            <SummarySection title="Termination" items={report.termination} />
            <SummarySection title="Renewal" items={report.renewal} />
            <SummarySection title="Timeline" items={report.timeline} variant="success" />
          </div>

          <p className="text-center text-slate-500 text-xs mt-8 no-print">
            ⚠️ AI-generated analysis. Not legal advice. Consult a qualified attorney for important decisions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Summary;
