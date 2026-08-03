import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Mic, MicOff, Volume2, X, Bot, Send, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

// =====================================================================
// PASTE YOUR GEMINI API KEY HERE (get one free at https://aistudio.google.com/app/apikey)
// Falls back to VITE_GEMINI_API_KEY from your .env file if this is left empty.
// =====================================================================
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

const GREETING_TEXT =
  "Namaste! Main Kisan Choice se baat kar rahi hoon. Main aapki kaise madad kar sakti hoon?";

// FIX: Gemini sometimes replies in Markdown (**bold**, # headings, | tables |)
// even when told not to. Since the chat UI renders msg.text as plain text
// (no markdown parser) and this text is also read aloud by TTS, any stray
// markdown symbols show up literally on screen and get spoken out loud
// ("asterisk asterisk..."). This strips common markdown before we ever
// display or speak the reply, as a safety net on top of the prompt rule.
function sanitizeReply(text) {
  return text
    .replace(/\|/g, " ")                 // table pipes
    .replace(/^-{3,}$/gm, "")            // markdown horizontal rules
    .replace(/^#{1,6}\s*/gm, "")         // headings
    .replace(/\*\*(.*?)\*\*/g, "$1")     // bold
    .replace(/\*(.*?)\*/g, "$1")         // italics
    .replace(/`{1,3}([^`]*)`{1,3}/g, "$1") // code
    .replace(/^\s*[-*•]\s+/gm, "")       // bullet markers
    .replace(/^\s*\d+\.\s+/gm, "")       // numbered list markers
    .replace(/\n{3,}/g, "\n\n")          // collapse extra blank lines
    .trim();
}

export default function FloatingActions() {
  const [isListening, setIsListening] = useState(false);
  const isListeningRef = useRef(false); // guards against double start()/stop() race conditions

  const [chatOpenState, setChatOpenState] = useState(false);
  const chatOpenRef = useRef(false);
  const setChatOpen = (isOpen) => {
    chatOpenRef.current = isOpen;
    setChatOpenState(isOpen);
  };
  const chatOpen = chatOpenState;

  const [showModeSelector, setShowModeSelector] = useState(false);
  const [chatMode, setChatMode] = useState("chat"); // "voice" or "chat"

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste! Main Kisan Choice se baat kar rahi hoon. Main aapki kaise madad kar sakti hoon?", isGreeting: true }
  ]);
  const [botSpeaking, setBotSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState("");

  const messagesEndRef = useRef(null);

  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const voicesRef = useRef([]);
  const audioRef = useRef(null);
  useEffect(() => {
    // Initialize Web Speech API (speech-to-text)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "hi-IN"; // Hindi India
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
        isListeningRef.current = false;
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error !== "no-speech") {
          isListeningRef.current = false;
          setIsListening(false);
          toast.error("Microphone error: " + event.error);
        }
      };

      recognitionRef.current.onend = () => {
        isListeningRef.current = false;
        setIsListening(false);
      };
    } else {
      console.warn("Speech Recognition API not supported in this browser.");
    }

    // FIX: getVoices() often returns an empty array on first call because
    // voices load asynchronously. Warm the cache now, and again on change.
    const loadVoices = () => {
      if (synthRef.current) {
        voicesRef.current = synthRef.current.getVoices();
      }
    };
    loadVoices();
    if (synthRef.current) {
      synthRef.current.onvoiceschanged = loadVoices;
    }

    return () => {
      recognitionRef.current?.abort();
      synthRef.current?.cancel();
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Safe wrappers so we never call start()/stop() on a recognition object
  // that's already in that state (this was throwing InvalidStateError before)
  const safeStartRecognition = () => {
    if (!recognitionRef.current || isListeningRef.current) return;
    try {
      recognitionRef.current.start();
      isListeningRef.current = true;
      setIsListening(true);
    } catch (e) {
      console.log("Could not start mic", e);
    }
  };

  const safeStopRecognition = () => {
    if (!recognitionRef.current || !isListeningRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch (e) {
      console.log("Could not stop mic", e);
    }
    isListeningRef.current = false;
    setIsListening(false);
  };

  const handleUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    generateBotResponse(text);
  };

  const handleSendText = () => {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText("");

    // Stop voice if they type manually
    safeStopRecognition();
    synthRef.current?.cancel();
    setBotSpeaking(false);

    handleUserMessage(text);
  };

  const generateBotResponse = async (userText, currentMessages) => {
    setIsThinking(true);

    try {
      const response = await fetch("https://kisanapp-chatvoice.onrender.com/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true"
        },
        body: JSON.stringify({ text: userText, skip_audio: chatMode === "chat" })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Backend Error: ${response.status} ${errText}`);
      }

      const data = await response.json();
      const botText = data.reply;
      const audioBase64 = data.audio_base64;

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
      setIsThinking(false);

      if (audioBase64) {
        playBackendAudio(audioBase64);
      }
    } catch (error) {
      console.error("AI API Error:", error);
      setIsThinking(false);
      const fallbackReply = `Technical Issue: ${error.message}. Please connect via WhatsApp.`;
      setMessages((prev) => [...prev, { sender: "bot", text: fallbackReply }]);
    }
  };

  const speakResponse = (text) => {
    // Basic fallback if needed, but primarily we will play backend audio
  };

  const playBackendAudio = (base64Audio) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio("data:audio/mp3;base64," + base64Audio);
    audioRef.current = audio;
    
    audio.onplay = () => setBotSpeaking(true);
    audio.onended = () => {
      setBotSpeaking(false);
      audioRef.current = null;
      if (chatOpenRef.current) {
        safeStartRecognition();
      }
    };
    audio.onerror = (e) => {
      console.error("Audio playback error:", e);
      setBotSpeaking(false);
    };
    
    audio.play().catch(e => {
      console.error("Autoplay prevented:", e);
      setBotSpeaking(false);
    });
  };

  const turnOffBot = () => {
    if (isListening) safeStopRecognition();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setBotSpeaking(false);
    setChatOpen(false);
    setShowModeSelector(false);
    setInputText("");
    setIsListening(false);
  };

  const handleMainButtonClick = () => {
    if (chatOpen) {
      turnOffBot();
    } else if (showModeSelector) {
      setShowModeSelector(false);
    } else {
      setShowModeSelector(true);
    }
  };

  const startBotInMode = (mode) => {
    setChatMode(mode);
    setShowModeSelector(false);
    
    if (recognitionRef.current) {
      setChatOpen(true);

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (!last || last.text !== GREETING_TEXT) {
          return [...prev, { sender: "bot", text: GREETING_TEXT, isGreeting: true }];
        }
        return prev;
      });

      if (mode === "voice") {
        safeStartRecognition();
      }
    } else {
      toast.error("Your browser doesn't support AI features.");
    }
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/916390059995", "_blank");
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3 md:gap-4 font-sans">
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[calc(100vw-2.5rem)] sm:w-[360px] md:w-[380px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] shadow-emerald-500/20 border border-white/80 overflow-hidden flex flex-col mb-2 relative"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 text-white p-6 pb-7 flex justify-between items-center z-10 relative overflow-hidden rounded-b-[2rem] shadow-sm">
              {/* Decorative background shapes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-12 -left-4 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg rotate-3">
                    <Bot size={30} strokeWidth={1.5} className="-rotate-3" />
                  </div>
                  {botSpeaking && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-[18px] tracking-wide text-white drop-shadow-md">Kisan AI</span>
                  <span className="text-[12px] font-semibold text-emerald-50 flex items-center gap-1.5 uppercase tracking-widest mt-0.5">
                    {botSpeaking ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-ping"></span> Speaking</>
                    ) : isThinking ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"></span> Thinking</>
                    ) : isListening ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span> Listening</>
                    ) : (
                      <><span className="w-1.5 h-1.5 rounded-full bg-emerald-200"></span> Online</>
                    )}
                  </span>
                </div>
              </div>
              <button 
                onClick={turnOffBot} 
                className="hover:bg-white/20 p-2.5 rounded-xl transition-all duration-300 backdrop-blur-md z-10 hover:rotate-90 hover:scale-110 bg-white/10 border border-white/20 self-start"
                title="Close"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-5 h-[360px] overflow-y-auto flex flex-col gap-4 bg-gray-50/50 scrollbar-hide -mt-4 pt-8">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  key={idx}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14.5px] leading-[1.6] shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-tr from-emerald-500 to-teal-500 text-white rounded-br-sm shadow-emerald-500/20"
                        : "bg-white border border-gray-100/80 text-gray-700 rounded-bl-sm shadow-gray-200/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
                  <div className="bg-white border border-gray-100/80 px-4 py-3.5 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center h-[46px]">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </motion.div>
              )}

              {isListening && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mt-2 mb-1">
                  <div className="text-[11px] font-bold text-rose-500 flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full animate-pulse border border-rose-100 shadow-sm uppercase tracking-wider">
                    <Mic size={14} className="animate-bounce" /> Listening to you...
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={() => {
                  if (isListening) safeStopRecognition();
                  else {
                    if (audioRef.current) audioRef.current.pause();
                    setBotSpeaking(false);
                    safeStartRecognition();
                  }
                }}
                className={`p-3 rounded-2xl text-white shadow-md transition-all duration-300 ${
                  isListening 
                  ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/30 scale-105" 
                  : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200 shadow-none hover:scale-105"
                }`}
                title={isListening ? "Stop Listening" : "Tap to Speak"}
              >
                {isListening ? <MicOff size={20} strokeWidth={2} /> : <Mic size={20} strokeWidth={2.5} />}
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendText()}
                  placeholder="Ask me anything..."
                  className="w-full bg-gray-50/80 border border-gray-200/60 rounded-2xl pl-4 pr-10 py-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition-all shadow-inner"
                />
                <button
                  onClick={handleSendText}
                  disabled={!inputText.trim()}
                  className="absolute right-1.5 top-1.5 p-1.5 bg-gradient-to-tr from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-0 disabled:scale-75 disabled:pointer-events-none scale-100"
                  title="Send message"
                >
                  <Send size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 relative">
        {/* Mode Selector */}
        <AnimatePresence>
          {showModeSelector && !chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-[140px] right-0 flex flex-col gap-3 z-20"
            >
              <button
                onClick={() => startBotInMode("voice")}
                className="flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-5 py-3 rounded-full shadow-lg shadow-rose-500/30 hover:scale-105 transition-all w-44"
              >
                <div className="bg-white/20 p-2 rounded-full"><Mic size={18} /></div>
                <span className="font-semibold text-[15px]">Voice Mode</span>
              </button>
              <button
                onClick={() => startBotInMode("chat")}
                className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-full shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all w-44"
              >
                <div className="bg-white/20 p-2 rounded-full"><MessageSquare size={18} /></div>
                <span className="font-semibold text-[15px]">Chat Mode</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Bot Button */}
        <div className="relative group">
          {isListening && chatOpen && (
             <span className="absolute -inset-3 rounded-full border border-teal-400 animate-ping opacity-50"></span>
          )}
          {/* Subtle pulse for the main button when closed */}
          {!chatOpen && (
             <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-pulse blur-md"></span>
          )}
          <button
            onClick={handleMainButtonClick}
            className={`w-[60px] h-[60px] rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-500 focus:outline-none z-10 relative ${
              chatOpen 
              ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/40 rotate-90" 
              : "bg-gradient-to-tr from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/40 hover:-translate-y-1 hover:scale-105"
            }`}
            title="Kisan AI Assistant"
          >
            {chatOpen ? <X size={28} strokeWidth={2.5} className="-rotate-90" /> : <Bot size={30} strokeWidth={1.5} />}
          </button>
        </div>

        {/* WhatsApp Button */}
        <button
          onClick={openWhatsApp}
          className="flex w-[48px] h-[48px] md:w-[60px] md:h-[60px] rounded-full items-center justify-center bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus:outline-none"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp className="w-[26px] h-[26px] md:w-[32px] md:h-[32px]" />
        </button>
      </div>
    </div>
  );
}