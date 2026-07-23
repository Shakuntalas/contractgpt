import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Startup Founder", text: "ContractGPT saved us hours reviewing our vendor agreements. The risk detection caught an auto-renewal clause we would have missed.", avatar: "SC" },
  { name: "Michael Torres", role: "Legal Operations", text: "The chat feature is incredible. I can ask specific questions about payment terms and get answers with page references instantly.", avatar: "MT" },
  { name: "Emily Watson", role: "Freelance Consultant", text: "Finally, a tool that explains legal jargon in plain English. The summary reports are professional enough to share with clients.", avatar: "EW" },
];

function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3">What Users <span className="neon-text">Say</span></h2>
          <p className="text-slate-400">Trusted by professionals who review contracts daily</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, text, avatar }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-sm font-bold">
                    {avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{name}</div>
                    <div className="text-slate-500 text-xs">{role}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
