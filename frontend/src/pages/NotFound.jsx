import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRobot, FaHome } from "react-icons/fa";
import GlassCard from "../components/ui/GlassCard";

function NotFound() {
  return (
    <div className="page-content min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <GlassCard className="p-12 text-center max-w-lg" hover={false}>
          <FaRobot className="text-7xl text-indigo-400 mx-auto mb-6" />
          <h1 className="text-7xl font-extrabold neon-text mb-2">404</h1>
          <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
          <p className="text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center gap-2">
            <FaHome /> Back to Home
          </Link>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default NotFound;
