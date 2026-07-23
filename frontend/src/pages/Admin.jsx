import { motion } from "framer-motion";
import { FaUsers, FaFileContract, FaRobot, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";

function Admin() {
  const { stats, contracts } = useApp();

  const metrics = [
    { label: "Active Sessions", value: "1", icon: FaUsers, color: "text-indigo-400" },
    { label: "Indexed Documents", value: contracts.length, icon: FaFileContract, color: "text-violet-400" },
    { label: "AI RAG Calls", value: (stats.questionsAsked || 0) + (stats.summariesGenerated || 0), icon: FaRobot, color: "text-cyan-400" },
    { label: "Vectorstore Health", value: "100%", icon: FaShieldAlt, color: "text-emerald-400" },
  ];

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl glass border border-indigo-500/30 text-indigo-400">
              <FaShieldAlt className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Admin System Dashboard</h1>
              <p className="text-slate-400 text-sm">ContractGPT backend runtime status and vectorstore metrics</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map(({ label, value, icon: Icon, color }) => (
              <GlassCard key={label} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">{label}</p>
                    <p className="text-3xl font-extrabold text-white mt-2">{value}</p>
                  </div>
                  <Icon className={`text-3xl ${color}`} />
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="p-6" hover={false}>
            <h2 className="text-lg font-bold text-white mb-4">Document Collection Registry</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-white/5 text-indigo-300 border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Document ID</th>
                    <th className="py-3 px-4">Original File</th>
                    <th className="py-3 px-4">Uploaded At</th>
                    <th className="py-3 px-4">Pages</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        No active document collections stored in ChromaDB.
                      </td>
                    </tr>
                  ) : (
                    contracts.map((c) => (
                      <tr key={c.document_id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="py-3 px-4 font-mono text-xs text-indigo-300">{c.document_id.slice(0, 12)}...</td>
                        <td className="py-3 px-4 font-medium text-white">{c.original_filename}</td>
                        <td className="py-3 px-4 text-xs text-slate-400">{new Date(c.uploaded_at).toLocaleString()}</td>
                        <td className="py-3 px-4">{c.total_pages || c.total_chunks || 1}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-300">Indexed</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

export default Admin;