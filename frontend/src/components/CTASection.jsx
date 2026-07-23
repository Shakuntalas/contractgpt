import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center glass gradient-border rounded-3xl p-12 neon-glow"
      >
        <h2 className="text-4xl font-bold mb-4">Ready to Analyze Your Contract?</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Upload a PDF and get AI-powered insights in seconds. No signup required.
        </p>
        <Link to="/upload" className="btn-primary text-lg px-10 py-4 inline-flex">
          Start Free Analysis <FaArrowRight />
        </Link>
      </motion.div>
    </section>
  );
}

export default CTASection;
