import { motion } from "framer-motion";
import { FaRobot, FaShieldAlt, FaFileContract } from "react-icons/fa";
import UploadSection from "../components/UploadSection";
import GlassCard from "../components/ui/GlassCard";

function Upload() {
  return (
    <div className="page-content min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Upload Your <span className="neon-text">Contract</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Drop your PDF and our AI will embed, analyze, and prepare it for chat and summary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-8" hover={false}>
              <UploadSection />
            </GlassCard>
          </div>

          <div className="space-y-4">
            {[
              { icon: FaRobot, title: "AI Analysis", desc: "Gemini AI reviews clauses, highlights risks, and generates summaries.", color: "text-indigo-400" },
              { icon: FaShieldAlt, title: "Secure Processing", desc: "Documents processed on your server. Private and secure.", color: "text-emerald-400" },
              { icon: FaFileContract, title: "PDF Support", desc: "Upload PDF contracts up to 20 MB for instant analysis.", color: "text-violet-400" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <GlassCard key={title} className="p-5">
                <Icon className={`text-2xl ${color} mb-3`} />
                <h3 className="font-semibold text-white mb-1">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
