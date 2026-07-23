import { motion } from "framer-motion";
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaFileContract, FaRobot } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";

function Notifications() {
  const { contracts } = useApp();

  const notifications = [
    {
      id: 1,
      icon: FaFileContract,
      color: "text-indigo-400",
      title: contracts.length > 0 ? `Active Document: ${contracts[0].original_filename}` : "Contract Assistant Ready",
      message: contracts.length > 0 ? "Document indexed in ChromaDB vectorstore successfully." : "Upload a PDF contract to begin analysis.",
      time: "Just now",
    },
    {
      id: 2,
      icon: FaRobot,
      color: "text-cyan-400",
      title: "Gemini 1.5 Flash Engine Connected",
      message: "AI model ready for Plain English Q&A and contract summarization.",
      time: "10 minutes ago",
    },
    {
      id: 3,
      icon: FaCheckCircle,
      color: "text-emerald-400",
      title: "Export Tools Available",
      message: "You can export summaries to PDF, TXT, or print at any time.",
      time: "1 hour ago",
    },
    {
      id: 4,
      icon: FaExclamationTriangle,
      color: "text-amber-400",
      title: "Legal Advisory Note",
      message: "ContractGPT outputs are AI-generated explanations. Always consult a licensed attorney for binding legal counsel.",
      time: "System Notice",
    },
  ];

  return (
    <div className="page-content min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl glass border border-indigo-500/30 text-indigo-400">
              <FaBell className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Notifications</h1>
              <p className="text-slate-400 text-sm">System updates and contract activity alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard key={item.id} className="p-6 flex items-start gap-4" hover={false}>
                  <Icon className={`text-2xl ${item.color} shrink-0 mt-1`} />
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-white text-base">{item.title}</h2>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">{item.message}</p>
                    <span className="text-xs text-slate-500 mt-2 block">{item.time}</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Notifications;