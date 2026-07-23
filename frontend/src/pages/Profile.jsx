import { motion } from "framer-motion";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileContract, FaRobot, FaCheckCircle } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";

function Profile() {
  const { stats, contracts } = useApp();

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="p-8 gradient-border mb-8" hover={false}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <FaUserCircle className="text-8xl text-indigo-400 shrink-0" />
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-extrabold text-white">Legal Professional</h1>
                <p className="text-indigo-300 text-sm mt-1">ContractGPT Enterprise Analyst</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-4 justify-center sm:justify-start">
                  <span className="flex items-center gap-1.5"><FaEnvelope className="text-indigo-400" /> user@contractgpt.ai</span>
                  <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="text-indigo-400" /> Secure Cloud Workspace</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <GlassCard className="p-6" hover={false}>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaRobot className="text-indigo-400" /> Account Statistics
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-white/5 text-slate-300">
                  <span>Contracts Uploaded</span>
                  <span className="font-bold text-white">{stats.contractsUploaded || contracts.length || 0}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5 text-slate-300">
                  <span>AI Questions Asked</span>
                  <span className="font-bold text-white">{stats.questionsAsked || 0}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5 text-slate-300">
                  <span>Summaries Generated</span>
                  <span className="font-bold text-white">{stats.summariesGenerated || 0}</span>
                </div>
                <div className="flex justify-between py-2 text-slate-300">
                  <span>AI Accuracy Assurance</span>
                  <span className="font-bold text-emerald-400">99.9%</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaFileContract className="text-cyan-400" /> Recent Contracts
              </h2>
              {contracts.length === 0 ? (
                <p className="text-slate-500 text-sm py-4">No uploaded contracts in history.</p>
              ) : (
                <div className="space-y-3">
                  {contracts.slice(0, 3).map((c) => (
                    <div key={c.document_id} className="glass p-3 rounded-xl text-xs text-slate-300 truncate">
                      <div className="font-medium text-white truncate">{c.original_filename}</div>
                      <div className="text-slate-500 mt-0.5">{new Date(c.uploaded_at).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;