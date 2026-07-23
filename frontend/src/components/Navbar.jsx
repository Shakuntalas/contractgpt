import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaBars, FaTimes, FaChevronDown, FaBell, FaUser, FaShieldAlt, FaBalanceScale, FaLightbulb, FaBookOpen, FaChartBar } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/upload", label: "Upload" },
  { to: "/chat", label: "AI Chat" },
  { to: "/summary", label: "Summary" },
  { to: "/dashboard", label: "Dashboard" },
];

const TOOL_LINKS = [
  { to: "/heatmap", label: "Risk Heatmap", icon: FaShieldAlt, desc: "Visual clause risk breakdown" },
  { to: "/compare", label: "Compare Contracts", icon: FaBalanceScale, desc: "Side-by-side AI comparison" },
  { to: "/explainer", label: "Clause Explainer", icon: FaLightbulb, desc: "Instant plain-English translation" },
  { to: "/library", label: "Clause Library", icon: FaBookOpen, desc: "Standard legal clause guide" },
  { to: "/analytics", label: "Analytics", icon: FaChartBar, desc: "Contract metrics & history" },
];

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="no-print sticky top-0 z-50 glass-strong border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group" aria-label="ContractGPT Home">
            <motion.div whileHover={{ rotate: 10 }} className="text-indigo-400">
              <FaRobot className="text-3xl" />
            </motion.div>
            <span className="text-xl font-bold neon-text">ContractGPT</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === to
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  TOOL_LINKS.some(t => t.to === location.pathname)
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                AI Tools <FaChevronDown className={`text-xs transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 glass border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-2xl"
                  >
                    {TOOL_LINKS.map(({ to, label, icon: Icon, desc }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setToolsOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition ${
                          location.pathname === to ? "bg-indigo-500/20 text-indigo-200" : "hover:bg-white/5 text-slate-300"
                        }`}
                      >
                        <Icon className="text-indigo-400 text-lg mt-0.5 shrink-0" />
                        <div>
                          <div className="font-medium text-sm text-white">{label}</div>
                          <div className="text-xs text-slate-400">{desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/notifications" className="p-2 text-slate-400 hover:text-white transition" aria-label="Notifications">
              <FaBell size={18} />
            </Link>
            <Link to="/profile" className="p-2 text-slate-400 hover:text-white transition" aria-label="Profile">
              <FaUser size={18} />
            </Link>
            <Link to="/upload" className="btn-primary text-sm py-2 px-4">
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-slate-300 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden pb-4 space-y-1"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === to ? "bg-indigo-500/20 text-indigo-300" : "text-slate-400"
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="pt-2 border-t border-white/10">
              <div className="px-4 text-xs font-semibold text-slate-500 uppercase mb-1">AI Tools</div>
              {TOOL_LINKS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${
                    location.pathname === to ? "bg-indigo-500/20 text-indigo-300" : "text-slate-400"
                  }`}
                >
                  <Icon className="text-indigo-400" />
                  {label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex gap-2 px-4">
              <Link to="/settings" onClick={() => setMobileOpen(false)} className="btn-ghost flex-1 text-center py-2 text-sm">Settings</Link>
              <Link to="/upload" onClick={() => setMobileOpen(false)} className="btn-primary flex-1 text-center py-2 text-sm">Get Started</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
