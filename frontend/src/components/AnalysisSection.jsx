import { FaExclamationTriangle, FaCheckCircle, FaFileAlt, FaRobot } from "react-icons/fa";
import GlassCard from "./ui/GlassCard";

function AnalysisSection() {
  const cards = [
    { icon: FaExclamationTriangle, title: "Risky Clauses", value: "03", color: "text-red-400" },
    { icon: FaCheckCircle, title: "Safe Clauses", value: "15", color: "text-emerald-400" },
    { icon: FaFileAlt, title: "Total Pages", value: "08", color: "text-cyan-400" },
    { icon: FaRobot, title: "AI Confidence", value: "99%", color: "text-indigo-400" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3">AI Contract <span className="neon-text font-extrabold">Analysis</span></h2>
          <p className="text-slate-400 text-lg">Instantly understand your contracts with AI-powered insights.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map(({ icon: Icon, title, value, color }, index) => (
            <GlassCard key={index} className="p-8 text-center">
              <Icon className={`text-4xl ${color} mx-auto mb-4`} />
              <div className="text-4xl font-extrabold text-white mb-2">{value}</div>
              <p className="text-slate-400 text-sm">{title}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-8 gradient-border" hover={false}>
          <h3 className="text-2xl font-bold text-white mb-4">AI Summary Preview</h3>
          <p className="text-slate-300 leading-relaxed">
            The uploaded contract appears to have a <span className="font-bold text-emerald-400">Low Risk</span> profile.
            The AI detected a few clauses that may require review, but the overall agreement follows standard legal practices.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}

export default AnalysisSection;