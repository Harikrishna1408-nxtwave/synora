"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, MessageSquare, Clock3, Brain, User, Bot, Loader2, Menu, X } from "lucide-react";
import SuggestedPrompts from "./SuggestedPrompts";

interface Chat {
  id: string;
  title: string;
  createdAt: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export default function ChatClient() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const promptProcessed = useRef(false);

  // 1. Fetch recent chats on load
  useEffect(() => {
    const init = async () => {
      const activeId = await fetchChats(true);
      const params = new URLSearchParams(window.location.search);
      const prompt = params.get("prompt");
      if (prompt && !promptProcessed.current) {
        promptProcessed.current = true;
        handleSendMessage(prompt, activeId);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };
    init();
  }, []);

  // 2. Fetch messages when activeChatId changes
  useEffect(() => {
    if (activeChatId) {
      fetchMessages(activeChatId);
    } else {
      setMessages([]);
    }
  }, [activeChatId]);

  // 3. Scroll to bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchChats = async (selectFirst = true): Promise<string | null> => {
    try {
      const res = await fetch("/api/chats");
      if (res.ok) {
        const data = await res.json();
        setChats(data);
        if (selectFirst && data.length > 0 && !activeChatId) {
          setActiveChatId(data[0].id);
          return data[0].id;
        }
        return activeChatId;
      }
    } catch (err) {
      console.error("Error loading chats:", err);
    }
    return null;
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const res = await fetch(`/api/chat?chatId=${chatId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  const handleNewChat = async () => {
    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });
      if (res.ok) {
        const newChat = await res.json();
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(newChat.id);
        setMessages([]);
        setIsSidebarOpen(false); // Close mobile sidebar if open
      }
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  const handleSendMessage = async (textToSend?: string, chatIdOverride?: string | null) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    let currentChatId = chatIdOverride !== undefined ? chatIdOverride : activeChatId;

    // If no active chat, create one first
    if (!currentChatId) {
      try {
        const res = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "New Chat" }),
        });
        if (res.ok) {
          const newChat = await res.json();
          setChats((prev) => [newChat, ...prev]);
          currentChatId = newChat.id;
          setActiveChatId(newChat.id);
        } else {
          return;
        }
      } catch (err) {
        console.error("Error creating chat for message:", err);
        return;
      }
    }

    // Set optimistic message
    const tempUserMsg: Message = {
      id: `temp-user-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: currentChatId, content: text }),
      });

      if (response.ok) {
        const data = await response.json();
        // Replace user message with db version, add assistant message
        setMessages((prev) => 
          prev.filter(m => m.id !== tempUserMsg.id).concat(data.userMessage, data.assistantMessage)
        );
        // Refresh chat list to fetch updated titles (since first message renames "New Chat")
        fetchChats(false);
      } else {
        const errorData = await response.json();
        const tempBotErrorMsg: Message = {
          id: `temp-bot-${Date.now()}`,
          role: "assistant",
          content: `⚠️ Error: ${errorData.error || "Failed to generate response."}`,
        };
        setMessages((prev) => [...prev, tempBotErrorMsg]);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "Today";
    }
  };

  // Premium Markdown and Format Parser for Messages
  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
      // Parse bold **text** and inline `code`
      const parts = [];
      const currentText = line;
      const formatRegex = /(\*\*.*?\*\*|`.*?`)/g;
      let match;
      let lastIndex = 0;

      while ((match = formatRegex.exec(currentText)) !== null) {
        const matchText = match[0];
        const matchIndex = match.index;

        if (matchIndex > lastIndex) {
          parts.push(currentText.substring(lastIndex, matchIndex));
        }

        if (matchText.startsWith("**") && matchText.endsWith("**")) {
          const boldInner = matchText.slice(2, -2);
          parts.push(
            <strong key={matchIndex} className="font-extrabold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
              {boldInner}
            </strong>
          );
        } else if (matchText.startsWith("`") && matchText.endsWith("`")) {
          const codeInner = matchText.slice(1, -1);
          parts.push(
            <code key={matchIndex} className="rounded bg-slate-950 border border-slate-800 px-1.5 py-0.5 text-xs font-mono text-indigo-300">
              {codeInner}
            </code>
          );
        }

        lastIndex = formatRegex.lastIndex;
      }

      if (lastIndex < currentText.length) {
        parts.push(currentText.substring(lastIndex));
      }

      // Detect bullet points
      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-5 list-disc pl-1 py-1 text-slate-300 leading-relaxed">
            {parts}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="mb-2.5 last:mb-0 text-slate-300 leading-relaxed font-medium">
          {parts}
        </p>
      );
    });
  };

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-6 md:flex-row">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800/80 bg-[#0f172a]/95 p-6 shadow-xl backdrop-blur-md transition-all duration-300 md:static md:z-0 md:flex md:w-64 md:rounded-3xl md:border-0 md:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between md:hidden mb-6">
          <span className="font-bold text-slate-200">Chat History</span>
          <button onClick={() => setIsSidebarOpen(false)} className="rounded-lg p-2 hover:bg-slate-800">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewChat}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 font-semibold text-white transition-all shadow-md shadow-indigo-500/10 hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/20"
        >
          <Plus className="h-5 w-5" />
          New Chat
        </motion.button>

        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Recent Conversations
        </h2>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {chats.map((chat) => {
            const isActive = chat.id === activeChatId;
            return (
              <motion.button
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all border ${
                  isActive 
                    ? "bg-indigo-950/40 border-indigo-900/35 text-indigo-300 font-medium" 
                    : "hover:bg-slate-900/40 text-slate-400 hover:text-slate-200 border-transparent"
                }`}
              >
                <MessageSquare className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-xs font-semibold">{chat.title}</p>
                  <span className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock3 className="h-3 w-3 text-slate-500" />
                    {formatDate(chat.createdAt)}
                  </span>
                </div>
              </motion.button>
            );
          })}
          {chats.length === 0 && (
            <p className="text-center text-sm text-slate-500 py-8">No chats created yet.</p>
          )}
        </div>
      </motion.aside>

      {/* Main Chat Work Area */}
      <div className="flex flex-1 flex-col gap-6">
        
        {/* Chat Header */}
        <header className="flex items-center justify-between rounded-3xl bg-[#0f172a]/60 p-5 shadow-none border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-2 hover:bg-slate-800 md:hidden"
            >
              <Menu className="h-5 w-5 text-slate-300" />
            </button>
            
            <div className="rounded-2xl bg-indigo-950/45 p-2.5 border border-indigo-900/20">
              <Brain className="h-6 w-6 text-indigo-400" />
            </div>

            <div>
              <h1 className="text-base font-bold text-white leading-tight">
                Synora AI
              </h1>
              <p className="text-[11px] text-slate-400">
                Your AI-powered Digital Twin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-emerald-950/40 border border-emerald-900/30 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Twin Active
            </span>
          </div>
        </header>

        {/* Message Feed container */}
        <div className="flex flex-1 flex-col justify-between rounded-3xl bg-[#0f172a]/20 shadow-none border border-slate-800/80 backdrop-blur-md p-6 overflow-hidden">
          
          {/* Scrollable Message Box */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 min-h-0">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center p-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-full bg-indigo-950/30 border border-indigo-900/20 p-6 text-indigo-400 mb-4 animate-pulse"
                >
                  <Brain className="h-12 w-12" />
                </motion.div>
                <h3 className="text-base font-bold text-slate-200">Start a conversation with your Digital Twin</h3>
                <p className="mt-2 max-w-sm text-xs text-slate-500 leading-relaxed">
                  Ask Synora to summarize your day, review email draft actions, check Git logs, or sync plans.
                </p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((message) => {
                  const isUser = message.role === "user";
                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex max-w-[80%] gap-3.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${
                          isUser ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" : "bg-slate-900 border border-slate-800 text-indigo-400"
                        }`}>
                          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>

                        <div className={`rounded-2xl px-4 py-3 text-xs shadow border ${
                          isUser 
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 border-transparent text-white rounded-tr-none shadow-indigo-500/10" 
                            : "bg-[#131b2e]/60 border-slate-800/60 text-slate-200 rounded-tl-none leading-relaxed"
                        }`}>
                          {isUser ? message.content : renderMessageContent(message.content)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex max-w-[80%] gap-3.5 flex-row">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
                    <Bot className="h-4 w-4 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-slate-800/60 bg-[#131b2e]/40 px-4 py-3 text-xs text-slate-400 rounded-tl-none shadow-sm">
                    <Loader2 className="h-3 w-3 animate-spin text-indigo-400" />
                    Twin is processing...
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts (collapses if messages exist, keeping UI clean) */}
          {messages.length === 0 && (
            <div className="my-6">
              <SuggestedPrompts onSelectPrompt={(prompt) => handleSendMessage(prompt)} />
            </div>
          )}

          {/* Input Bar */}
          <div className="mt-4 border-t border-slate-800/85 pt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center gap-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                placeholder="Ask Synora anything..."
                className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/40 px-5 py-4 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:bg-slate-950/80 focus:ring-2 focus:ring-indigo-950/50 disabled:opacity-60"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white transition-all hover:bg-indigo-700 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 disabled:opacity-40 disabled:pointer-events-none"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
