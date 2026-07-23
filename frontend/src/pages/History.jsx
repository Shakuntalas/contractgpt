import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFileContract, FaComments, FaFileAlt, FaClock } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";

function History() {
  const { contracts } = useApp();

  return (
    <div className="page-content min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Contract History</h1>
          <p className="text-slate-400 mb-8">All contracts you've uploaded and analyzed.</p>

          {contracts.length === 0 ? (
            <GlassCard className="p-12 text-center" hover={false}>
              <FaFileContract className="text-5xl text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No contracts in history yet.</p>
              <Link to="/upload" className="btn-primary">Upload Contract</Link>
            </GlassCard>
          ) : (
            <div className="space-y-3">
              {contracts.map((c) => (
                <GlassCard key={c.document_id} className="p-5 flex flex-wrap items-center justify-between gap-4" hover={false}>
                  <div className="flex items-center gap-4 min-w-0">
                    <FaFileContract className="text-2xl text-indigo-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-white truncate">{c.original_filename}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <FaClock className="inline" />
                        {new Date(c.uploaded_at).toLocaleString()}
                        · {c.total_pages || "?"} pages
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/chat" className="btn-ghost text-sm py-2 flex items-center gap-1">
                      <FaComments /> Chat
                    </Link>
                    <Link to="/summary" className="btn-primary text-sm py-2 flex items-center gap-1">
                      <FaFileAlt /> Summary
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default History;
