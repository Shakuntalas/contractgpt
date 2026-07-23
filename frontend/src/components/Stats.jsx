import { motion } from "framer-motion";
import { FaFileContract, FaRobot, FaUsers, FaShieldAlt } from "react-icons/fa";
import GlassCard from "./ui/GlassCard";

const STATS = [
  { icon: FaFileContract, value: "10K+", label: "Contracts Analyzed", color: "text-indigo-400" },
  { icon: FaRobot, value: "99%", label: "AI Accuracy", color: "text-violet-400" },
  { icon: FaUsers, value: "5K+", label: "Active Users", color: "text-cyan-400" },
  { icon: FaShieldAlt, value: "24/7", label: "Secure Processing", color: "text-emerald-400" },
];

function Stats() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <GlassCard className="p-12 gradient-border" hover={false}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-3">Trusted by Legal Teams</h2>
            <p className="text-slate-400">Enterprise-grade AI contract analysis at your fingertips.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ icon: Icon, value, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <Icon className={`text-4xl ${color} mx-auto mb-4`} />
                <div className="text-4xl font-extrabold neon-text">{value}</div>
                <p className="text-slate-400 mt-2">{label}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

export default Stats;
