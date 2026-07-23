import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRobot, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import GlassCard from "../components/ui/GlassCard";

function Register() {
  return (
    <div className="page-content min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <GlassCard className="p-8" hover={false}>
          <div className="text-center mb-8">
            <FaRobot className="text-5xl text-indigo-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-slate-400 mt-2 text-sm">Join ContractGPT today</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {[
              { icon: FaUser, label: "Name", type: "text", placeholder: "Your name" },
              { icon: FaEnvelope, label: "Email", type: "email", placeholder: "you@example.com" },
              { icon: FaLock, label: "Password", type: "password", placeholder: "••••••••" },
            ].map(({ icon: Icon, label, type, placeholder }) => (
              <div key={label}>
                <label className="text-sm font-medium text-slate-300 mb-2 block">{label}</label>
                <div className="flex items-center glass rounded-xl px-4 py-3 gap-3">
                  <Icon className="text-slate-500" />
                  <input type={type} placeholder={placeholder} className="flex-1 bg-transparent outline-none text-white placeholder-slate-500" />
                </div>
              </div>
            ))}
            <button type="submit" className="btn-primary w-full justify-center py-3">Create Account</button>
          </form>

          <p className="text-center mt-6 text-slate-400 text-sm">
            Have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign In</Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default Register;
