import { Link } from "react-router-dom";
import { FaRobot, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="no-print relative z-10 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaRobot className="text-3xl text-indigo-400" />
              <span className="text-2xl font-bold neon-text">ContractGPT</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              AI-powered legal contract analysis. Upload, chat, summarize, and understand
              complex agreements in seconds.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["/upload", "Upload"],
                ["/chat", "AI Chat"],
                ["/summary", "Summary"],
                ["/dashboard", "Dashboard"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 hover:text-indigo-300 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">AI Tools</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["/heatmap", "Risk Heatmap"],
                ["/compare", "Contract Compare"],
                ["/explainer", "Clause Explainer"],
                ["/library", "Clause Library"],
                ["/analytics", "Analytics"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 hover:text-indigo-300 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Connect</h3>
            <p className="text-slate-400 text-sm mb-4">support@contractgpt.ai</p>
            <div className="flex gap-4 text-xl text-slate-400">
              {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-indigo-400 transition" aria-label="Social link">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} ContractGPT. All rights reserved. AI analysis is not legal advice.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
