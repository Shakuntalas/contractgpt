import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  getSettings,
  saveSettings,
  getStats,
  incrementStat,
  getContracts,
  saveContract,
  getActiveDocumentId,
  setActiveDocumentId,
  getChatSessions,
  saveChatSession,
  deleteChatSession as removeSession,
  getActiveSessionId,
  setActiveSessionId,
  clearAllHistory,
} from "../utils/storage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [settings, setSettingsState] = useState(getSettings);
  const [stats, setStats] = useState(getStats);
  const [contracts, setContracts] = useState(getContracts);
  const [documentId, setDocumentIdState] = useState(getActiveDocumentId);
  const [chatSessions, setChatSessions] = useState(getChatSessions);
  const [activeSessionId, setActiveSessionIdState] = useState(getActiveSessionId);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings.theme]);

  const updateSettings = useCallback((partial) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...partial };
      saveSettings(next);
      return next;
    });
  }, []);

  const setDocumentId = useCallback((id) => {
    setActiveDocumentId(id);
    setDocumentIdState(id);
  }, []);

  const addContract = useCallback((contract) => {
    const saved = saveContract(contract);
    setContracts(getContracts());
    setDocumentId(saved.document_id);
    setStats(incrementStat("contractsUploaded"));
    return saved;
  }, [setDocumentId]);

  const bumpStat = useCallback((key) => {
    setStats(incrementStat(key));
  }, []);

  const upsertChatSession = useCallback((session) => {
    saveChatSession(session);
    setChatSessions(getChatSessions());
    setActiveSessionIdState(session.id);
    setActiveSessionId(session.id);
  }, []);

  const deleteChatSession = useCallback((sessionId) => {
    removeSession(sessionId);
    setChatSessions(getChatSessions());
    if (activeSessionId === sessionId) {
      setActiveSessionIdState(null);
      setActiveSessionId(null);
    }
  }, [activeSessionId]);

  const clearHistory = useCallback(() => {
    clearAllHistory();
    setContracts([]);
    setChatSessions([]);
    setDocumentIdState(null);
    setActiveSessionIdState(null);
    setStats({ contractsUploaded: 0, questionsAsked: 0, summariesGenerated: 0 });
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        stats,
        bumpStat,
        contracts,
        addContract,
        documentId,
        setDocumentId,
        chatSessions,
        upsertChatSession,
        deleteChatSession,
        activeSessionId,
        setActiveSessionId: (id) => {
          setActiveSessionId(id);
          setActiveSessionIdState(id);
        },
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
