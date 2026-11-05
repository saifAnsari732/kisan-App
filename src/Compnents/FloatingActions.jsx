import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { 
  Bot, 
  X, 
  Send, 
  CheckCircle2, 
  Download, 
  RefreshCw, 
  FileText, 
  Phone, 
  MapPin, 
  User, 
  Package, 
  Briefcase,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const INITIAL_GREETING = {
  sender: "bot",
  text: "Namaste! 🙏 Kisan Choice Assistant me aapka swagat hai. Kripya batayein aapko kis vishay me sahayata chahiye?",
  step: "purpose",
  options: [
    { label: "🏢 Distributorship / Dealership", value: "Distributorship / Dealership" },
    { label: "📦 Bulk Wholesale Order", value: "Bulk Wholesale Order" },
    { label: "🛒 Retail / Ghar ke liye Order", value: "Retail / Ghar ke liye Order" },
    { label: "📋 Product Catalog & Rate List", value: "Product Catalog & Rate List" }
  ]
};

const PRODUCT_OPTIONS = [
  { label: "🟡 Kachi Ghani Mustard Oil", value: "Kachi Ghani Mustard Oil" },
  { label: "🪔 Pooja Oil (पूजा तेल)", value: "Pooja Oil" },
  { label: "🌾 Refined Soyabean Oil", value: "Refined Soyabean Oil" },
  { label: "🌻 Refined Sunflower Oil", value: "Refined Sunflower Oil" },
  { label: "🥥 Coconut / Groundnut / Alsi Oil", value: "Coconut / Groundnut / Alsi Oil" },
  { label: "🛍️ All Edible Oils (Combo)", value: "All Edible Oils (Combo)" }
];

const QUANTITY_OPTIONS = [
  { label: "📦 Retail (1L, 2L, 5L Packs)", value: "Retail (1L, 2L, 5L Packs)" },
  { label: "🛢️ 15L Tins & Bulk Cartons", value: "15L Tins & Bulk Cartons" },
  { label: "🚛 Commercial Bulk (500L - 2000L+)", value: "Commercial Bulk (500L - 2000L+)" },
  { label: "📄 Sample / Rate Sheet Only", value: "Sample / Rate Sheet Only" }
];

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [currentStep, setCurrentStep] = useState("purpose"); // 'purpose' | 'product' | 'quantity' | 'name' | 'phone' | 'city' | 'completed'
  const [inputText, setInputText] = useState("");
  const [formData, setFormData] = useState({
    purpose: "",
    product: "",
    quantity: "",
    name: "",
    phone: "",
    city: ""
  });
  const [lastSavedInquiry, setLastSavedInquiry] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save inquiry to JSON in localStorage and attempt server sync
  const saveInquiryToJson = async (completedData) => {
    try {
      const inquiryRecord = {
        id: `KC-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short"
        }),
        ...completedData
      };

      // 1. Save to browser LocalStorage
      const existingInquiries = JSON.parse(localStorage.getItem("kisan_inquiries_data") || "[]");
      const updatedList = [inquiryRecord, ...existingInquiries];
      localStorage.setItem("kisan_inquiries_data", JSON.stringify(updatedList, null, 2));

      setLastSavedInquiry(inquiryRecord);

      // 2. Try saving to backend API if available
      try {
        await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inquiryRecord)
        });
      } catch (err) {
        // Backend offline or running purely on static host; LocalStorage handles persistence safely
        console.log("Local inquiry recorded (offline / static host fallback)");
      }

      return inquiryRecord;
    } catch (e) {
      console.error("Error saving inquiry:", e);
      return null;
    }
  };

  // Download all or current inquiry as a JSON file
  const downloadInquiriesJSON = (singleRecord = null) => {
    try {
      const allData = JSON.parse(localStorage.getItem("kisan_inquiries_data") || "[]");
      const dataToExport = singleRecord || (allData.length > 0 ? allData : [lastSavedInquiry]);

      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = singleRecord 
        ? `kisan_inquiry_${singleRecord.id || "data"}.json` 
        : `kisan_all_inquiries_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("JSON file downloaded successfully! 📁");
    } catch (err) {
      toast.error("Download failed, please try again.");
    }
  };

  // Handle Option selection from clickable buttons
  const handleSelectOption = (step, option) => {
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: option.label }]);

    if (step === "purpose") {
      const updated = { ...formData, purpose: option.value };
      setFormData(updated);
      setCurrentStep("product");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Kripya batayein aap kis product me ruchi rakhte hain?",
            step: "product",
            options: PRODUCT_OPTIONS
          }
        ]);
      }, 350);
    } else if (step === "product") {
      const updated = { ...formData, product: option.value };
      setFormData(updated);
      setCurrentStep("quantity");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Aapki lagbhag kitni quantity / volume ki aavashyakta hai?",
            step: "quantity",
            options: QUANTITY_OPTIONS
          }
        ]);
      }, 350);
    } else if (step === "quantity") {
      const updated = { ...formData, quantity: option.value };
      setFormData(updated);
      setCurrentStep("name");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Bahut badhiya! Aapse sampark karne ke liye, kripya apna Shubhnaam (Full Name) batayein:"
          }
        ]);
      }, 350);
    }
  };

  // Handle text input submission (Name, Phone, City)
  const handleSendText = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    // Append user input
    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInputText("");

    if (currentStep === "name") {
      const updated = { ...formData, name: trimmed };
      setFormData(updated);
      setCurrentStep("phone");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Shukriya ${trimmed} ji! Kripya apna 10-digit WhatsApp / Mobile Number enter karein:`
          }
        ]);
      }, 350);
    } else if (currentStep === "phone") {
      const cleanedPhone = trimmed.replace(/\D/g, "");
      if (cleanedPhone.length < 10) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "⚠️ Kripya valid 10-digit mobile number enter karein (e.g. 9876543210):"
            }
          ]);
        }, 300);
        return;
      }

      const updated = { ...formData, phone: cleanedPhone };
      setFormData(updated);
      setCurrentStep("city");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Aap kis City aur State (e.g. Lucknow, Uttar Pradesh) se hain?"
          }
        ]);
      }, 350);
    } else if (currentStep === "city") {
      const completedData = { ...formData, city: trimmed };
      setFormData(completedData);
      setCurrentStep("completed");

      // Save to JSON
      const savedRecord = await saveInquiryToJson(completedData);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Aapki inquiry safaltapoorvak darj ho gayi hai aur JSON file me add ho chuki hai! ✅",
            isSummary: true,
            summaryData: savedRecord || completedData
          }
        ]);
      }, 400);
    } else if (currentStep === "completed") {
      // If user types anything after completion
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Aapka data pehle se save hai. Agar aap nayi inquiry karna chahte hain, to 'Nayi Inquiry Karein' button dabayein."
          }
        ]);
      }, 300);
    }
  };

  // Reset conversational flow for a new inquiry
  const handleResetFlow = () => {
    setFormData({
      purpose: "",
      product: "",
      quantity: "",
      name: "",
      phone: "",
      city: ""
    });
    setCurrentStep("purpose");
    setMessages([INITIAL_GREETING]);
    setInputText("");
  };

  // Open WhatsApp with pre-filled inquiry details
  const openWhatsAppWithData = (data = null) => {
    const d = data || lastSavedInquiry || formData;
    const textMsg = encodeURIComponent(
      `*Namaste Kisan Choice Team!* 🙏\nMaine website se inquiry submit ki hai:\n\n` +
      `👤 *Name:* ${d.name || "Customer"}\n` +
      `📱 *Mobile:* ${d.phone || "N/A"}\n` +
      `📍 *Location:* ${d.city || "India"}\n` +
      `🏢 *Requirement:* ${d.purpose || "Product Inquiry"}\n` +
      `🛢️ *Product:* ${d.product || "Edible Oils"}\n` +
      `📦 *Quantity:* ${d.quantity || "Retail"}\n\n` +
      `Kripya mujhe jald se jald details aur quotation bhejein. Dhanyavaad!`
    );
    window.open(`https://wa.me/916390059995?text=${textMsg}`, "_blank");
  };

  const openGeneralWhatsApp = () => {
    window.open("https://wa.me/916390059995", "_blank");
  };

  const getPlaceholder = () => {
    if (currentStep === "name") return "Enter your Full Name...";
    if (currentStep === "phone") return "Enter 10-digit Mobile Number...";
    if (currentStep === "city") return "Enter City & State (e.g. Lucknow, UP)...";
    if (currentStep === "completed") return "Inquiry submitted! Tap New Inquiry to reset...";
    return "Please select from the options above...";
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3 md:gap-4 font-sans">
      
      {/* Interactive Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="w-[calc(100vw-2.5rem)] sm:w-[380px] md:w-[410px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,81,50,0.3)] border border-emerald-100 overflow-hidden flex flex-col mb-2 relative"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B3D2E] via-emerald-800 to-[#0F5132] text-white p-5 flex justify-between items-center z-10 relative shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-200 border border-white/20 shadow-md">
                  <Bot size={26} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[17px] tracking-wide text-white flex items-center gap-2">
                    Kisan Choice Assistant
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-200 flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Quick Inquiry & Data Collector
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)} 
                className="hover:bg-white/20 p-2 rounded-xl transition-all duration-300 text-white hover:scale-105 active:scale-95"
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 h-[380px] overflow-y-auto flex flex-col gap-3.5 bg-slate-50/70 scrollbar-thin scrollbar-thumb-emerald-200">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} w-full`}
                >
                  {/* Bubble text */}
                  <div
                    className={`max-w-[88%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-xs ${
                      msg.sender === "user"
                        ? "bg-[#0B3D2E] text-white rounded-br-xs shadow-emerald-900/10"
                        : "bg-white border border-emerald-100 text-slate-800 rounded-bl-xs shadow-slate-200/50"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Clickable Choice Options */}
                  {msg.options && (
                    <div className="flex flex-col gap-2 mt-2.5 w-full pl-1">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(msg.step, opt)}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200/80 hover:border-emerald-500 text-slate-800 hover:text-emerald-900 text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-xs hover:shadow-sm flex items-center justify-between group active:scale-[0.99]"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight size={15} className="text-emerald-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Completion Summary Card */}
                  {msg.isSummary && msg.summaryData && (
                    <div className="w-full mt-3 bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm text-left">
                      <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm mb-3 border-b border-emerald-100 pb-2">
                        <CheckCircle2 size={18} className="text-emerald-600" />
                        <span>Saved Inquiry Details (JSON)</span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <User size={13} className="text-emerald-600 shrink-0" />
                          <span className="text-slate-400">Name:</span>
                          <span className="font-bold text-slate-900">{msg.summaryData.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-emerald-600 shrink-0" />
                          <span className="text-slate-400">Phone:</span>
                          <span className="font-bold text-slate-900">{msg.summaryData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-emerald-600 shrink-0" />
                          <span className="text-slate-400">Location:</span>
                          <span className="font-bold text-slate-900">{msg.summaryData.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase size={13} className="text-emerald-600 shrink-0" />
                          <span className="text-slate-400">Requirement:</span>
                          <span className="font-bold text-slate-900">{msg.summaryData.purpose}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package size={13} className="text-emerald-600 shrink-0" />
                          <span className="text-slate-400">Product:</span>
                          <span className="font-bold text-slate-900">{msg.summaryData.product}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                        <button
                          onClick={() => downloadInquiriesJSON(msg.summaryData)}
                          className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0B3D2E] font-bold text-xs flex items-center justify-center gap-2 border border-emerald-300 transition-colors"
                        >
                          <Download size={14} /> Download Inquiry JSON
                        </button>
                        
                        <button
                          onClick={() => openWhatsAppWithData(msg.summaryData)}
                          className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                        >
                          <FaWhatsapp size={14} /> Send Directly on WhatsApp
                        </button>

                        <button
                          onClick={handleResetFlow}
                          className="w-full py-1.5 px-3 rounded-xl text-slate-500 hover:text-slate-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <RefreshCw size={12} /> Nayi Inquiry Karein
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Area (Active during Name, Phone, City steps) */}
            <div className="p-3 bg-white border-t border-emerald-100 flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type={currentStep === "phone" ? "tel" : "text"}
                  value={inputText}
                  disabled={["purpose", "product", "quantity"].includes(currentStep)}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendText()}
                  placeholder={getPlaceholder()}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-10 py-3 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendText}
                  disabled={!inputText.trim() || ["purpose", "product", "quantity"].includes(currentStep)}
                  className="absolute right-1.5 top-1.5 p-2 bg-[#0B3D2E] hover:bg-[#125841] text-white rounded-xl transition-all disabled:opacity-0 disabled:scale-75 disabled:pointer-events-none scale-100 shadow-sm"
                  title="Send"
                  aria-label="Send"
                >
                  <Send size={15} strokeWidth={2.5} />
                </button>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleResetFlow}
                className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
                title="Reset / Start Over"
                aria-label="Reset chat"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="flex flex-col gap-3 relative">
        
        {/* Chat Assistant Toggle Button (Voice Mode completely removed) */}
        <div className="relative group">
          {!chatOpen && (
            <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-pulse blur-md"></span>
          )}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`w-[56px] h-[56px] md:w-[62px] md:h-[62px] rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(15,81,50,0.4)] transition-all duration-300 focus:outline-none z-10 relative ${
              chatOpen 
                ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/30 rotate-90" 
                : "bg-gradient-to-tr from-[#0B3D2E] via-emerald-700 to-teal-600 hover:scale-105 active:scale-95"
            }`}
            title="Kisan Choice Inquiry Assistant"
            aria-label="Open chat assistant"
          >
            {chatOpen ? (
              <X size={26} strokeWidth={2.5} className="-rotate-90" />
            ) : (
              <Bot size={28} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* WhatsApp Direct Connect Button */}
        <button
          onClick={openGeneralWhatsApp}
          className="flex w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full items-center justify-center bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          title="Chat directly on WhatsApp"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="w-[26px] h-[26px] md:w-[30px] md:h-[30px]" />
          <span className="sr-only">WhatsApp</span>
        </button>
      </div>
    </div>
  );
}