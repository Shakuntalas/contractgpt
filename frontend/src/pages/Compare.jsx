import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaBalanceScale, FaFileContract, FaCheckCircle, FaExclamationTriangle, FaRobot } from "react-icons/fa";
import { compareContracts } from "../api/api";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";

function Compare() {
  const { contracts } = useApp();
  const [doc1, setDoc1] = useState(contracts[0]?.document_id || "");
  const [doc2, setDoc2] = useState(contracts[1]?.document_id || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCompare = async () => {
    if (!doc1 || !doc2) {
      toast.warning("Please select two uploaded contracts to compare.");
      return;
    }
    if (doc1 === doc2) {
      toast.warning("Please select two different contracts.");
      return;
    }

    setLoading(true);
    try {
      const data = await compareContracts(doc1, doc2);
      setResult(data);
      toast.success("Comparison completed!");
    } catch (err) {
      toast.error(err.message || "Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  const getDocName = (id) => contracts.find((c) => c.document_id === id)?.original_filename || id;

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl glass border border-indigo-500/30 text-indigo-400">
              <FaBalanceScale className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Compare Contracts</h1>
              <p className="text-slate-400 text-sm">Side-by-side AI comparative analysis</p>
            </div>
          </div>

          <GlassCard className="p-6 mb-8 gradient-border" hover={false}>
            <h2 className="text-lg font-semibold text-white mb-4">Select Two Contracts to Compare</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Contract #1</label>
                <select
                  value={doc1}
                  onChange={(e) => setDoc1(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                >
                  <option value="" className="bg-slate-900">-- Select Contract 1 --</option>
                  {contracts.map((c) => (
                    <option key={c.document_id} value={c.document_id} className="bg-slate-900">
                      {c.original_filename}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Contract #2</label>
                <select
                  value={doc2}
                  onChange={(e) => setDoc2(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                >
                  <option value="" className="bg-slate-900">-- Select Contract 2 --</option>
                  {contracts.map((c) => (
                    <option key={c.document_id} value={c.document_id} className="bg-slate-900">
                      {c.original_filename}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCompare}
                disabled={loading || !doc1 || !doc2}
                className="btn-primary px-8 py-3"
              >
                {loading ? "Comparing with AI..." : "Compare Contracts"}
              </button>
              {contracts.length < 2 && (
                <Link to="/upload" className="btn-ghost py-3">Upload Second Contract</Link>
              )}
            </div>
          </GlassCard>

          {result && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <GlassCard className="p-6 bg-indigo-500/10 border-indigo-500/30" hover={false}>
                <div className="flex items-center gap-3 mb-2">
                  <FaRobot className="text-2xl text-indigo-400" />
                  <h3 className="text-xl font-bold text-white">AI Executive Comparison Summary</h3>
                </div>
                <p className="text-slate-200 leading-relaxed">{result.comparison_summary}</p>
                {result.recommendation && (
                  <div className="mt-4 p-4 rounded-xl glass border border-emerald-500/30 text-emerald-300 text-sm">
                    <strong>Recommendation:</strong> {result.recommendation}
                  </div>
                )}
              </GlassCard>

              <div className="grid md:grid-cols-2 gap-6">
                <GlassCard className="p-6" hover={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <FaFileContract className="text-2xl text-indigo-400" />
                    <h3 className="font-bold text-white truncate">{getDocName(doc1)}</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 text-sm text-slate-300">
                    <strong>Assessed Risk:</strong> {result.doc1_risk || "Medium"}
                  </div>
                </GlassCard>

                <GlassCard className="p-6" hover={false}>
                  <div className="flex items-center gap-3 mb-4">
                    <FaFileContract className="text-2xl text-violet-400" />
                    <h3 className="font-bold text-white truncate">{getDocName(doc2)}</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 text-sm text-slate-300">
                    <strong>Assessed Risk:</strong> {result.doc2_risk || "Medium"}
                  </div>
                </GlassCard>
              </div>

              {result.differences?.length > 0 && (
                <GlassCard className="p-6" hover={false}>
                  <h3 className="text-lg font-bold text-white mb-4">Detailed Clause Comparison</h3>
                  <div className="space-y-4">
                    {result.differences.map((diff, idx) => (
                      <div key={idx} className="glass rounded-xl p-4 border border-white/5">
                        <div className="font-semibold text-indigo-300 text-sm mb-2">{diff.category}</div>
                        <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-300">
                          <div className="p-2.5 rounded bg-white/5">
                            <span className="font-medium text-slate-400 block mb-1">Contract 1:</span>
                            {diff.doc1}
                          </div>
                          <div className="p-2.5 rounded bg-white/5">
                            <span className="font-medium text-slate-400 block mb-1">Contract 2:</span>
                            {diff.doc2}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Compare;