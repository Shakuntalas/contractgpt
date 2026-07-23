import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  FaCog, FaMoon, FaSun, FaBell, FaTrash, FaDownload, FaSave, FaGlobe,
} from "react-icons/fa";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";
import { buildSummaryText, downloadTextFile } from "../utils/download";
import { getActiveDocumentId } from "../utils/storage";
import { getSummary } from "../api/api";

function Settings() {
  const { settings, updateSettings, clearHistory, stats, contracts } = useApp();

  const themes = [
    { id: "dark", label: "Dark", icon: FaMoon },
    { id: "light", label: "Light", icon: FaSun },
    { id: "glass", label: "Glass", icon: FaCog },
  ];

  const handleSave = () => {
    toast.success("Settings saved!");
  };

  const handleExport = async () => {
    const docId = getActiveDocumentId();
    if (!docId) {
      toast.warning("No active contract to export.");
      return;
    }
    try {
      const summary = await getSummary(docId);
      downloadTextFile(buildSummaryText(summary), "contractgpt-export.txt");
      toast.success("Summary exported!");
    } catch {
      const exportData = { settings, stats, contracts, exported_at: new Date().toISOString() };
      downloadTextFile(JSON.stringify(exportData, null, 2), "contractgpt-data.json");
      toast.success("Data exported!");
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Delete all history? This cannot be undone.")) {
      clearHistory();
      toast.success("History cleared.");
    }
  };

  return (
    <div className="page-content min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-8">
            <FaCog className="text-4xl text-indigo-400" />
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-slate-400 text-sm">Customize your ContractGPT experience</p>
            </div>
          </div>

          <GlassCard className="p-6 mb-4" hover={false}>
            <h2 className="font-semibold text-white mb-4">Theme</h2>
            <div className="grid grid-cols-3 gap-3">
              {themes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => updateSettings({ theme: id })}
                  className={`p-4 rounded-xl border transition flex flex-col items-center gap-2 ${
                    settings.theme === id
                      ? "border-indigo-500 bg-indigo-500/20 text-indigo-200"
                      : "border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <Icon className="text-xl" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 mb-4" hover={false}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaBell className="text-yellow-400" />
                <div>
                  <h2 className="font-semibold text-white">Notifications</h2>
                  <p className="text-slate-500 text-sm">Receive AI update toasts</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => updateSettings({ notifications: e.target.checked })}
                className="w-5 h-5 accent-indigo-500"
              />
            </div>
          </GlassCard>

          <GlassCard className="p-6 mb-4" hover={false}>
            <div className="flex items-center gap-3 mb-3">
              <FaGlobe className="text-cyan-400" />
              <h2 className="font-semibold text-white">Language</h2>
            </div>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </GlassCard>

          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <FaSave /> Save Settings
            </button>
            <button onClick={handleExport} className="btn-ghost flex items-center gap-2">
              <FaDownload /> Export Data
            </button>
            <button onClick={handleClearHistory} className="btn-ghost flex items-center gap-2 text-red-400 border-red-400/30 hover:bg-red-500/10">
              <FaTrash /> Delete History
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Settings;
