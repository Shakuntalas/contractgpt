const STORAGE_KEYS = {
  CONTRACTS: "cgpt_contracts",
  CHAT_SESSIONS: "cgpt_chat_sessions",
  ACTIVE_SESSION: "cgpt_active_session",
  DOCUMENT_ID: "document_id",
  STATS: "cgpt_stats",
  SETTINGS: "cgpt_settings",
};

export function getContracts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTRACTS) || "[]");
  } catch {
    return [];
  }
}

export function saveContract(contract) {
  const contracts = getContracts();
  const existing = contracts.findIndex((c) => c.document_id === contract.document_id);
  const entry = {
    ...contract,
    uploaded_at: contract.uploaded_at || new Date().toISOString(),
  };
  if (existing >= 0) {
    contracts[existing] = entry;
  } else {
    contracts.unshift(entry);
  }
  localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(contracts.slice(0, 50)));
  return entry;
}

export function getActiveDocumentId() {
  return localStorage.getItem(STORAGE_KEYS.DOCUMENT_ID);
}

export function setActiveDocumentId(id) {
  if (id) {
    localStorage.setItem(STORAGE_KEYS.DOCUMENT_ID, id);
  } else {
    localStorage.removeItem(STORAGE_KEYS.DOCUMENT_ID);
  }
}

export function getChatSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS) || "[]");
  } catch {
    return [];
  }
}

export function saveChatSession(session) {
  const sessions = getChatSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session);
  }
  localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions.slice(0, 30)));
}

export function deleteChatSession(sessionId) {
  const sessions = getChatSessions().filter((s) => s.id !== sessionId);
  localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
}

export function getActiveSessionId() {
  return localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
}

export function setActiveSessionId(id) {
  if (id) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, id);
  } else {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  }
}

export function getStats() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEYS.STATS) ||
        '{"contractsUploaded":0,"questionsAsked":0,"summariesGenerated":0}'
    );
  } catch {
    return { contractsUploaded: 0, questionsAsked: 0, summariesGenerated: 0 };
  }
}

export function incrementStat(key) {
  const stats = getStats();
  stats[key] = (stats[key] || 0) + 1;
  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  return stats;
}

export function getSettings() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEYS.SETTINGS) ||
        '{"theme":"dark","language":"en","notifications":true}'
    );
  } catch {
    return { theme: "dark", language: "en", notifications: true };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function clearAllHistory() {
  localStorage.removeItem(STORAGE_KEYS.CONTRACTS);
  localStorage.removeItem(STORAGE_KEYS.CHAT_SESSIONS);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  localStorage.removeItem(STORAGE_KEYS.DOCUMENT_ID);
  localStorage.removeItem(STORAGE_KEYS.STATS);
}

export { STORAGE_KEYS };
