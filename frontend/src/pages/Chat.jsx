import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaRobot, FaUserCircle, FaPaperPlane, FaPlus, FaTrash,
  FaCopy, FaRedo, FaFileAlt, FaHistory,
} from "react-icons/fa";
import { chatWithContract } from "../api/api";
import { useApp } from "../context/AppContext";
import GlassCard from "../components/ui/GlassCard";
import MarkdownRenderer from "../components/ui/MarkdownRenderer";
import TypingIndicator from "../components/ui/TypingIndicator";
import { copyToClipboard } from "../utils/download";

const SUGGESTED_PROMPTS = [
  "Summarize this contract in plain English",
  "What are the payment terms?",
  "List all risky clauses",
  "Explain the termination conditions",
  "What are my obligations?",
  "Who is liable for damages?",
];

function createSession(documentId, title = "New Chat") {
  return {
    id: crypto.randomUUID(),
    document_id: documentId,
    title,
    messages: [],
    created_at: new Date().toISOString(),
  };
}

function Chat() {
  const navigate = useNavigate();
  const {
    documentId, chatSessions, upsertChatSession, deleteChatSession,
    activeSessionId, setActiveSessionId, bumpStat, contracts,
  } = useApp();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeSession = chatSessions.find((s) => s.id === activeSessionId);
  const messages = activeSession?.messages || [];

  useEffect(() => {
    if (!documentId) return;
    if (!activeSessionId || !chatSessions.find((s) => s.id === activeSessionId)) {
      const session = createSession(documentId);
      upsertChatSession(session);
    }
  }, [documentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const updateSession = useCallback((updates) => {
    if (!activeSession) return;
    upsertChatSession({ ...activeSession, ...updates });
  }, [activeSession, upsertChatSession]);

  const sendMessage = async (text, regenerate = false) => {
    const question = text.trim();
    if (!question || loading) return;

    if (!documentId) {
      toast.warning("Please upload a contract first.");
      navigate("/upload");
      return;
    }

    let session = activeSession;
    if (!session) {
      session = createSession(documentId);
      upsertChatSession(session);
    }

    const userMsg = { sender: "user", text: question, id: crypto.randomUUID() };
    let newMessages;

    if (regenerate) {
      newMessages = [...session.messages];
      const lastAiIdx = [...newMessages].reverse().findIndex((m) => m.sender === "ai");
      if (lastAiIdx >= 0) {
        newMessages.splice(newMessages.length - 1 - lastAiIdx, 1);
      }
    } else {
      newMessages = [...session.messages, userMsg];
    }

    const title = session.messages.length === 0 ? question.slice(0, 40) : session.title;
    upsertChatSession({ ...session, messages: newMessages, title });
    setMessage("");
    setLoading(true);

    try {
      const result = await chatWithContract(documentId, question);
      bumpStat("questionsAsked");
      const aiMsg = {
        sender: "ai",
        text: result.answer,
        sources: result.sources,
        id: crypto.randomUUID(),
      };
      upsertChatSession({
        ...session,
        title,
        messages: [...newMessages, aiMsg],
      });
    } catch (error) {
      toast.error(error.message || "Failed to get AI response.");
      upsertChatSession({
        ...session,
        title,
        messages: [
          ...newMessages,
          { sender: "ai", text: "❌ Failed to get AI response. Please try again.", id: crypto.randomUUID() },
        ],
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleRegenerate = () => {
    const lastUser = [...messages].reverse().find((m) => m.sender === "user");
    if (lastUser) sendMessage(lastUser.text, true);
  };

  const handleCopy = async (text) => {
    const ok = await copyToClipboard(text);
    toast[ok ? "success" : "error"](ok ? "Copied to clipboard!" : "Failed to copy.");
  };

  const handleNewChat = () => {
    if (!documentId) {
      toast.warning("Upload a contract first.");
      return;
    }
    upsertChatSession(createSession(documentId));
  };

  const contractName = contracts.find((c) => c.document_id === documentId)?.original_filename;

  if (!documentId) {
    return (
      <div className="page-content min-h-[80vh] flex items-center justify-center px-4">
        <GlassCard className="p-12 text-center max-w-lg" hover={false}>
          <FaRobot className="text-6xl text-indigo-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-3">No Contract Uploaded</h2>
          <p className="text-slate-400 mb-6">Upload a PDF contract to start chatting with AI.</p>
          <Link to="/upload" className="btn-primary">Upload Contract</Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="page-content flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            className="no-print w-72 shrink-0 glass border-r border-white/10 flex flex-col hidden md:flex"
          >
            <div className="p-4 border-b border-white/10">
              <button onClick={handleNewChat} className="btn-primary w-full justify-center text-sm py-2.5">
                <FaPlus /> New Chat
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider px-2 mb-2 flex items-center gap-1">
                <FaHistory /> Recent
              </p>
              {chatSessions.filter((s) => s.document_id === documentId).map((session) => (
                <button
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm truncate transition group flex items-center justify-between ${
                    session.id === activeSessionId
                      ? "bg-indigo-500/20 text-indigo-200"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="truncate">{session.title || "New Chat"}</span>
                  <FaTrash
                    className="opacity-0 group-hover:opacity-100 text-red-400 shrink-0 ml-2"
                    onClick={(e) => { e.stopPropagation(); deleteChatSession(session.id); }}
                  />
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <Link to="/summary" className="flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200">
                <FaFileAlt /> View Summary
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="glass border-b border-white/10 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden btn-ghost py-1 px-2 text-sm"
            aria-label="Toggle sidebar"
          >
            <FaHistory />
          </button>
          <FaRobot className="text-2xl text-indigo-400" />
          <div className="min-w-0 flex-1">
            <h1 className="font-semibold text-white truncate">ContractGPT</h1>
            <p className="text-xs text-slate-500 truncate">{contractName || "AI Contract Assistant"}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6" role="log" aria-live="polite">
          {messages.length === 0 && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center py-12">
              <FaRobot className="text-5xl text-indigo-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">How can I help with your contract?</h2>
              <p className="text-slate-400 text-sm mb-8">Ask about clauses, risks, payments, termination, or anything else.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="glass px-4 py-2 rounded-full text-sm text-slate-300 hover:text-white hover:bg-indigo-500/20 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id || msg.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 max-w-3xl ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
            >
              {msg.sender === "ai" ? (
                <FaRobot className="text-2xl text-indigo-400 mt-1 shrink-0" />
              ) : (
                <FaUserCircle className="text-2xl text-slate-400 mt-1 shrink-0" />
              )}

              <div className={`group relative max-w-[85%] ${msg.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`rounded-2xl px-5 py-4 ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "glass text-slate-200"
                  }`}
                >
                  {msg.sender === "ai" ? (
                    <>
                      <MarkdownRenderer content={msg.text} />
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10 text-xs text-left">
                          <p className="font-semibold text-indigo-300 mb-1.5 flex items-center gap-1">
                            <FaFileAlt /> Grounded Sources ({msg.sources.length}):
                          </p>
                          <div className="space-y-1.5">
                            {msg.sources.slice(0, 3).map((src, idx) => (
                              <div key={idx} className="bg-white/5 p-2 rounded-lg text-slate-300 text-xs">
                                <span className="font-semibold text-indigo-400">Page {src.page || "N/A"}:</span> "{src.excerpt}..."
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>

                {msg.sender === "ai" && (
                  <div className="flex gap-3 mt-1.5 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => handleCopy(msg.text)} className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1" aria-label="Copy response">
                      <FaCopy /> Copy
                    </button>
                    <button onClick={handleRegenerate} className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1" aria-label="Regenerate response">
                      <FaRedo /> Regenerate
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-3xl">
              <FaRobot className="text-2xl text-indigo-400 mt-1" />
              <div className="glass rounded-2xl px-5 py-4">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="no-print glass border-t border-white/10 p-4">
          <div className="max-w-3xl mx-auto flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(message)}
              placeholder="Ask anything about your contract..."
              disabled={loading}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
              aria-label="Chat message input"
            />
            <button
              onClick={() => sendMessage(message)}
              disabled={loading || !message.trim()}
              className="btn-primary px-5 py-3"
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
