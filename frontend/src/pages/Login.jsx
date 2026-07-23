import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaEnvelope, FaLock } from "react-icons/fa";
import GlassCard from "../components/ui/GlassCard";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="page-content min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <GlassCard className="p-8" hover={false}>
          <div className="text-center mb-8">
            <FaRobot className="text-5xl text-indigo-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-slate-400 mt-2 text-sm">Sign in to ContractGPT</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Email</label>
              <div className="flex items-center glass rounded-xl px-4 py-3 gap-3">
                <FaEnvelope className="text-slate-500" />
                <input type="email" placeholder="you@example.com" className="flex-1 bg-transparent outline-none text-white placeholder-slate-500" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Password</label>
              <div className="flex items-center glass rounded-xl px-4 py-3 gap-3">
                <FaLock className="text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none text-white placeholder-slate-500"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" onChange={() => setShowPassword(!showPassword)} className="accent-indigo-500" />
              Show password
            </label>
            <button type="submit" className="btn-primary w-full justify-center py-3">Sign In</button>
          </form>

          <p className="text-center mt-6 text-slate-400 text-sm">
            No account? <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Register</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default Login;
