import { motion } from "framer-motion";

function GlassCard({ children, className = "", hover = true, ...props }) {
  return (
    <motion.div
      className={`glass rounded-2xl ${className}`}
      whileHover={hover ? { y: -4, boxShadow: "0 20px 40px rgba(99,102,241,0.15)" } : undefined}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
