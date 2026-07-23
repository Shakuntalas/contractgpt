import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaFileContract, FaComments, FaShieldAlt } from "react-icons/fa";
import GlassCard from "./ui/GlassCard";

function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-md" aria-hidden="true">
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="200" cy="200" r="150"
        fill="none" stroke="url(#heroGrad)" strokeWidth="1" opacity="0.3"
        animate={{ r: [150, 160, 150] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <rect x="120" y="100" width="160" height="200" rx="12" fill="rgba(99,102,241,0.15)" stroke="url(#heroGrad)" strokeWidth="2" />
      <line x1="150" y1="140" x2="250" y2="140" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
      <line x1="150" y1="170" x2="230" y2="170" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="150" y1="195" x2="240" y2="195" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="150" y1="220" x2="220" y2="220" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="200" cy="280" r="30" fill="url(#heroGrad)" opacity="0.8" />
      <path d="M190 275 L200 290 L215 265" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <motion.g animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        <circle cx="320" cy="120" r="25" fill="rgba(6,182,212,0.2)" stroke="#22d3ee" strokeWidth="2" />
        <text x="320" y="126" textAnchor="middle" fill="#22d3ee" fontSize="20">AI</text>
      </motion.g>
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-indigo-300 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered Legal Intelligence
          </motion.span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Understand Contracts{" "}
            <span className="neon-text">Instantly</span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
            Upload any legal contract. Chat with AI about clauses, risks, and obligations.
            Get executive summaries in seconds — not hours.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/upload" className="btn-primary text-lg px-8 py-4 neon-glow">
              Upload Contract <FaArrowRight />
            </Link>
            <Link to="/chat" className="btn-ghost text-lg px-8 py-4">
              Try AI Chat
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 mt-12 text-sm text-slate-500">
            {[
              [FaShieldAlt, "Secure Processing"],
              [FaFileContract, "PDF Analysis"],
              [FaComments, "Natural Language Q&A"],
            ].map(([Icon, label]) => (
              <span key={label} className="flex items-center gap-2">
                <Icon className="text-indigo-400" /> {label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <GlassCard className="p-8 w-full max-w-md" hover={false}>
            <HeroIllustration />
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[["99%", "Accuracy"], ["<30s", "Analysis"], ["24/7", "Available"]].map(([val, label]) => (
                <div key={label} className="text-center p-3 rounded-xl bg-white/5">
                  <div className="text-xl font-bold neon-text">{val}</div>
                  <div className="text-xs text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
