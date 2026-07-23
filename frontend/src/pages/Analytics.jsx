import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { FaFileContract, FaRobot, FaCheckCircle, FaChartLine } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

function Analytics() {
  const { stats, contracts } = useApp();

  const totalUploaded = stats.contractsUploaded || contracts.length || 0;
  const totalQuestions = stats.questionsAsked || 0;
  const totalSummaries = stats.summariesGenerated || 0;

  const pieData = [
    { name: "Uploaded", value: totalUploaded || 1 },
    { name: "Summaries", value: totalSummaries || 0 },
    { name: "Q&A Interactions", value: totalQuestions || 0 },
  ].filter((d) => d.value > 0);

  const barData = contracts.slice(0, 6).map((c, i) => ({
    name: c.original_filename?.slice(0, 10) || `Doc ${i + 1}`,
    chunks: c.total_chunks || c.total_pages || 1,
  }));

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl glass border border-indigo-500/30 text-indigo-400">
              <FaChartLine className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Analytics Dashboard</h1>
              <p className="text-slate-400 text-sm">Real-time metrics on uploaded contracts and AI processing</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Total Contracts", value: totalUploaded, icon: FaFileContract, color: "text-indigo-400" },
              { title: "AI Questions Answered", value: totalQuestions, icon: FaRobot, color: "text-violet-400" },
              { title: "Summaries Generated", value: totalSummaries, icon: FaCheckCircle, color: "text-emerald-400" },
            ].map(({ title, value, icon: Icon, color }) => (
              <GlassCard key={title} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">{title}</p>
                    <p className="text-3xl font-extrabold text-white mt-2">{value}</p>
                  </div>
                  <Icon className={`text-3xl ${color}`} />
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <GlassCard className="p-6" hover={false}>
              <h2 className="text-lg font-semibold mb-4 text-white">System Usage Breakdown</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1e1b4b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard className="p-6" hover={false}>
              <h2 className="text-lg font-semibold mb-4 text-white">Contract Chunk Sizes</h2>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#1e1b4b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                    <Bar dataKey="chunks" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-16 text-slate-500 text-sm">Upload a contract to see metrics.</div>
              )}
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Analytics;