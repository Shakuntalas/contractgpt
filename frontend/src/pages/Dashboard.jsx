import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFileContract, FaComments, FaFileAlt, FaExclamationTriangle,
  FaUpload, FaRobot, FaArrowRight,
} from "react-icons/fa";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";

const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"];

function Dashboard() {
  const { stats, contracts } = useApp();

  const pieData = [
    { name: "Uploaded", value: stats.contractsUploaded || 0 },
    { name: "Questions", value: stats.questionsAsked || 0 },
    { name: "Summaries", value: stats.summariesGenerated || 0 },
  ].filter((d) => d.value > 0);

  const barData = contracts.slice(0, 6).map((c, i) => ({
    name: c.original_filename?.slice(0, 12) || `Doc ${i + 1}`,
    pages: c.total_pages || c.total_chunks || 0,
  }));

  const statCards = [
    { title: "Contracts Uploaded", value: stats.contractsUploaded || 0, icon: FaFileContract, color: "text-indigo-400" },
    { title: "Questions Asked", value: stats.questionsAsked || 0, icon: FaComments, color: "text-violet-400" },
    { title: "Summaries Generated", value: stats.summariesGenerated || 0, icon: FaFileAlt, color: "text-cyan-400" },
    { title: "Active Contracts", value: contracts.length, icon: FaRobot, color: "text-emerald-400" },
  ];

  const quickActions = [
    { to: "/upload", label: "Upload Contract", icon: FaUpload },
    { to: "/chat", label: "AI Chat", icon: FaComments },
    { to: "/summary", label: "View Summary", icon: FaFileAlt },
  ];

  return (
    <div className="page-content min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400 mb-8">Your AI contract analytics at a glance.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map(({ title, value, icon: Icon, color }) => (
              <GlassCard key={title} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm">{title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{value}</p>
                  </div>
                  <Icon className={`text-3xl ${color}`} />
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <GlassCard className="p-6" hover={false}>
              <h2 className="text-lg font-semibold mb-4 text-white">Activity Overview</h2>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1e1b4b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-slate-500 text-center py-12">Upload a contract to see activity data.</p>
              )}
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h2 className="text-lg font-semibold mb-4 text-white">Document Sizes</h2>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#1e1b4b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                    <Bar dataKey="pages" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-slate-500 text-center py-12">No documents yet.</p>
              )}
            </GlassCard>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <GlassCard className="p-6 lg:col-span-2" hover={false}>
              <h2 className="text-lg font-semibold mb-4 text-white">Recent Contracts</h2>
              {contracts.length === 0 ? (
                <div className="text-center py-8">
                  <FaExclamationTriangle className="text-3xl text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500">No contracts uploaded yet.</p>
                  <Link to="/upload" className="btn-primary mt-4 inline-flex text-sm">Upload Now</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {contracts.slice(0, 5).map((c) => (
                    <div key={c.document_id} className="flex items-center justify-between glass rounded-xl p-4">
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{c.original_filename}</p>
                        <p className="text-xs text-slate-500">
                          {new Date(c.uploaded_at).toLocaleDateString()} · {c.total_pages || "?"} pages
                        </p>
                      </div>
                      <Link to="/chat" className="text-indigo-400 hover:text-indigo-300 text-sm shrink-0 ml-4">
                        Chat <FaArrowRight className="inline ml-1" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 glass rounded-xl p-4 hover:bg-indigo-500/10 transition text-slate-300 hover:text-white"
                  >
                    <Icon className="text-indigo-400" />
                    {label}
                    <FaArrowRight className="ml-auto text-slate-600" />
                  </Link>
                ))}
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
