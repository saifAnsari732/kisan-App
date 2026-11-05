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
  Building2,
  ChevronRight,
  Copy,
  Check,
  Warehouse,
  Truck,
  Mail,
  FileCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

// Initial Greeting with 4 Master Branches
const INITIAL_GREETING = {
  sender: "bot",
  text: "Namaste! 🙏 Kisan Choice Assistant me aapka swagat hai. Kripya batayein aapko kis vishay me poori jankari chahiye?",
  step: "branch_select",
  options: [
    { label: "🏢 Distributorship / Dealership Application", value: "dealership" },
    { label: "📦 Bulk Wholesale & Commercial Supply", value: "wholesale" },
    { label: "🛒 Retail & Kitchen Household Order", value: "retail" },
    { label: "📋 Product Catalog & Trade Rate Sheet", value: "catalog" }
  ]
};

// Comprehensive Branch Configurations with In-depth Questions
const BRANCH_CONFIGS = {
  dealership: {
    categoryTitle: "Distributorship & Dealership Application",
    badge: "B2B Partner",
    steps: [
      {
        key: "tier",
        label: "Dealership Level",
        botPrompt: "Aap kis level ki Dealership / Agency lena chahte hain?",
        type: "options",
        options: [
          { label: "⭐ District Super Stockist (DSS)", value: "District Super Stockist (DSS)" },
          { label: "🌾 Rural Super Stockist (RSS)", value: "Rural Super Stockist (RSS)" },
          { label: "🏙️ City Retail Distributor", value: "City Retail Distributor" },
          { label: "🚚 C&F / Regional Partner", value: "C&F / Regional Partner" }
        ]
      },
      {
        key: "investmentBudget",
        label: "Investment Capital",
        botPrompt: "Aapka anumaanit investment budget kitna hai?",
        type: "options",
        options: [
          { label: "💰 ₹2 Lakh - ₹5 Lakh", value: "₹2 Lakh - ₹5 Lakh" },
          { label: "💼 ₹5 Lakh - ₹10 Lakh", value: "₹5 Lakh - ₹10 Lakh" },
          { label: "🏢 ₹10 Lakh - ₹25 Lakh+", value: "₹10 Lakh - ₹25 Lakh+" },
          { label: "📄 Pehle Scheme aur Margin samajhna hai", value: "Understanding ROI & Margins First" }
        ]
      },
      {
        key: "godownSpace",
        label: "Godown / Storage Capacity",
        botPrompt: "Aapke paas storage / godown ki kitni capacity hai?",
        type: "options",
        options: [
          { label: "🏬 300 - 500 sq.ft (Shop + Store)", value: "300 - 500 sq.ft" },
          { label: "🏭 1,000 - 2,500 sq.ft (Warehouse)", value: "1,000 - 2,500 sq.ft" },
          { label: "🏗️ 3,000+ sq.ft (Large Godown)", value: "3,000+ sq.ft" },
          { label: "📍 Rent par lene ki planning hai", value: "Planning to Rent" }
        ]
      },
      {
        key: "deliveryVehicles",
        label: "Delivery Logistics",
        botPrompt: "Retailers tak delivery ke liye aapke paas kya suvidha hai?",
        type: "options",
        options: [
          { label: "🚛 Own Mini-Truck / Pickup (Tata Ace / Bolero)", value: "Own Mini-Truck / Pickup" },
          { label: "🛺 3-Wheeler Loader / Auto", value: "3-Wheeler Loader / Auto" },
          { label: "📦 Third-Party Local Transport", value: "Third-Party Local Transport" },
          { label: "🆕 New Vehicle lene ki yojana hai", value: "Planning to Acquire" }
        ]
      },
      {
        key: "productRange",
        label: "Primary Products",
        botPrompt: "Aap apne market me kaunse oil products launch karna chahte hain?",
        type: "options",
        options: [
          { label: "🟡 Kachi Ghani Mustard Oil (Flagship)", value: "Kachi Ghani Mustard Oil" },
          { label: "🪔 Pooja Oil & Refined Oil Range", value: "Pooja Oil & Refined Range" },
          { label: "🛍️ All Products (Full FMCG Portfolio)", value: "Complete Portfolio" }
        ]
      },
      {
        key: "fmcgExperience",
        label: "Market Experience",
        botPrompt: "Aapka FMCG / Grocery distribution me kitna anubhav hai?",
        type: "options",
        options: [
          { label: "🏆 5+ Years experienced in Edible Oils", value: "5+ Years (Edible Oils)" },
          { label: "📈 1 - 3 Years in FMCG / Kirana Distribution", value: "1 - 3 Years (FMCG)" },
          { label: "🌱 New Business / First-time Entrepreneur", value: "New Entrepreneur" }
        ]
      },
      {
        key: "firmName",
        label: "Firm / Enterprise Name",
        botPrompt: "Aapki Firm, Agency ya Dukan ka naam kya hai?",
        type: "input",
        placeholder: "e.g. Shree Ram Trading Co."
      },
      {
        key: "gstNumber",
        label: "GST / Udyam Number",
        botPrompt: "Aapka GSTIN ya Udyam Registration Number (Optional):",
        type: "input",
        optional: true,
        placeholder: "Enter GSTIN or type 'NA'..."
      },
      {
        key: "applicantName",
        label: "Applicant Name",
        botPrompt: "Kripya apna Shubhnaam (Applicant Full Name) batayein:",
        type: "input",
        placeholder: "Enter Full Name..."
      },
      {
        key: "mobileNumber",
        label: "WhatsApp / Calling Phone",
        botPrompt: "Apna 10-digit WhatsApp / Mobile Number enter karein:",
        type: "input",
        inputType: "tel",
        placeholder: "Enter 10-digit Mobile Number..."
      },
      {
        key: "emailAddress",
        label: "Email Address",
        botPrompt: "Aapka Email Address (Official communication ke liye - Optional):",
        type: "input",
        inputType: "email",
        optional: true,
        placeholder: "e.g. name@example.com (or type NA)..."
      },
      {
        key: "targetDistrictState",
        label: "Target District & State",
        botPrompt: "Aap kis District, State aur Pincode me agency lena chahte hain?",
        type: "input",
        placeholder: "e.g. Gorakhpur, Uttar Pradesh - 273001"
      }
    ]
  },

  wholesale: {
    categoryTitle: "Bulk Wholesale & Commercial Supply",
    badge: "Wholesale & HoReCa",
    steps: [
      {
        key: "businessType",
        label: "Establishment Type",
        botPrompt: "Aap kiske liye bulk me oil purchase karna chahte hain?",
        type: "options",
        options: [
          { label: "🍽️ Hotel, Restaurant & Catering (HoReCa)", value: "Hotel / Restaurant / Catering" },
          { label: "🏭 Food Processing / Namkeen & Snacks Unit", value: "Namkeen & Snacks Factory" },
          { label: "🏬 Wholesale Mandi Trader / Superstore", value: "Wholesale Mandi Trader" },
          { label: "🏢 Institutional Canteen / NGO / Trust", value: "Institutional Canteen" }
        ]
      },
      {
        key: "bulkProduct",
        label: "Selected Oil Grade",
        botPrompt: "Aapko kaunsa oil bulk me chahiye?",
        type: "options",
        options: [
          { label: "🟡 Kachi Ghani Mustard Oil (15L / Bulk)", value: "Kachi Ghani Mustard Oil" },
          { label: "🌾 Refined Soyabean Oil (15L Tins/Cartons)", value: "Refined Soyabean Oil" },
          { label: "🌻 Refined Sunflower / Palmolein Oil", value: "Sunflower / Palmolein Oil" },
          { label: "🔀 Mixed Multi-Product Full Load", value: "Mixed Multi-Product Load" }
        ]
      },
      {
        key: "packFormat",
        label: "Packaging Format",
        botPrompt: "Aapko kis packaging me supply chahiye?",
        type: "options",
        options: [
          { label: "🛢️ 15 Litre / 15 Kg Tin", value: "15L / 15Kg Tin" },
          { label: "📦 15 Litre Jerry Can / Bag-in-Box", value: "15L Can / Jar" },
          { label: "🛢️ 200 Litre Industrial Barrel / Drum", value: "200L Drum" },
          { label: "🚛 Tanker / Bulk Loose Supply", value: "Tanker / Bulk Loose" }
        ]
      },
      {
        key: "monthlyVolume",
        label: "Monthly Volume Demand",
        botPrompt: "Aapki anumaanit monthly requirement kitni rehti hai?",
        type: "options",
        options: [
          { label: "📦 50 to 100 Tins / Cartons", value: "50 - 100 Tins/Cartons" },
          { label: "🛢️ 200 to 500 Tins / Cartons", value: "200 - 500 Tins/Cartons" },
          { label: "🚛 Full Truck Load (FTL / 10 - 15 Tonnes)", value: "Full Truck Load (FTL)" },
          { label: "📄 Trial Sample / Pehle Quotation Chahiye", value: "Trial Sample / Quotation" }
        ]
      },
      {
        key: "deliveryFrequency",
        label: "Supply Schedule",
        botPrompt: "Supply dispatch schedule kya prefer karenge?",
        type: "options",
        options: [
          { label: "📅 Weekly Regular Dispatch", value: "Weekly Regular" },
          { label: "🗓️ Bi-Weekly / Fortnightly Dispatch", value: "Bi-Weekly" },
          { label: "📦 Monthly Scheduled Order", value: "Monthly Scheduled" },
          { label: "⚡ Urgent One-Time Bulk Requirement", value: "Urgent One-Time" }
        ]
      },
      {
        key: "businessName",
        label: "Business / Hotel / Factory Name",
        botPrompt: "Aapke Business, Restaurant ya Unit ka naam kya hai?",
        type: "input",
        placeholder: "e.g. Royal Sweets & Namkeen"
      },
      {
        key: "gstNumber",
        label: "GST Number",
        botPrompt: "Aapka Business GSTIN Number (Tax Invoice ke liye - Optional):",
        type: "input",
        optional: true,
        placeholder: "Enter GSTIN or type 'NA'..."
      },
      {
        key: "contactPerson",
        label: "Contact Person & Role",
        botPrompt: "Kripya Contact Person ka naam aur designation batayein:",
        type: "input",
        placeholder: "e.g. Amit Verma (Purchase Manager)"
      },
      {
        key: "mobileNumber",
        label: "Mobile / WhatsApp Number",
        botPrompt: "Official WhatsApp / Calling Number enter karein:",
        type: "input",
        inputType: "tel",
        placeholder: "Enter 10-digit Mobile Number..."
      },
      {
        key: "deliveryLocation",
        label: "Unloading Mandi / Factory Address",
        botPrompt: "Factory ya Godown ka complete Delivery Address aur City batayein:",
        type: "input",
        placeholder: "e.g. Plot 12, Industrial Area, Lucknow - 226012"
      }
    ]
  },

  retail: {
    categoryTitle: "Retail & Kitchen Household Order",
    badge: "Household Consumer",
    steps: [
      {
        key: "retailProduct",
        label: "Selected Cooking Oil",
        botPrompt: "Aap ghar ke liye kaunsa tel order karna chahte hain?",
        type: "options",
        options: [
          { label: "🟡 Kisan Choice Kachi Ghani Mustard (कच्ची घानी)", value: "Kachi Ghani Mustard Oil" },
          { label: "🪔 Kisan Choice Pooja Oil (पूजा व दीप के लिए)", value: "Pooja Oil" },
          { label: "🌾 Refined Soyabean Oil (हल्का व सुपाच्य)", value: "Refined Soyabean Oil" },
          { label: "🌻 Refined Sunflower Oil (Heart Friendly)", value: "Refined Sunflower Oil" },
          { label: "🥗 Monthly Family Kitchen Combo (Mustard + Pooja + Refined)", value: "Monthly Kitchen Combo" }
        ]
      },
      {
        key: "packSize",
        label: "Preferred Packaging",
        botPrompt: "Aapko kaunsi pack size chahiye?",
        type: "options",
        options: [
          { label: "🍾 1 Litre Bottle / Pouch (Trial Pack)", value: "1 Litre Pack" },
          { label: "🏺 2 Litre / 5 Litre Can", value: "2L / 5L Can" },
          { label: "🛢️ 15 Litre Kitchen Tin (Bachat Pack)", value: "15 Litre Kitchen Tin" },
          { label: "🎁 All-in-One Family Combo Pack", value: "All-in-One Family Combo" }
        ]
      },
      {
        key: "orderQuantity",
        label: "Quantity",
        botPrompt: "Aapko kitni bottle / tin chahiye?",
        type: "options",
        options: [
          { label: "🔢 1 to 2 Units", value: "1 - 2 Units" },
          { label: "🔢 3 to 5 Units", value: "3 - 5 Units" },
          { label: "📦 1 Full Kitchen Carton / Tin", value: "1 Full Carton/Tin" },
          { label: "📦 Monthly Regular Subscription", value: "Monthly Regular Subscription" }
        ]
      },
      {
        key: "deliveryPreference",
        label: "Delivery Mode",
        botPrompt: "Aap delivery kaise prefer karenge?",
        type: "options",
        options: [
          { label: "🚚 Direct Doorstep Home Delivery", value: "Doorstep Home Delivery" },
          { label: "🏪 Nearest Kisan Choice Retail Store Pickup", value: "Nearest Store Pickup" }
        ]
      },
      {
        key: "customerName",
        label: "Customer Name",
        botPrompt: "Kripya apna Shubhnaam (Full Name) batayein:",
        type: "input",
        placeholder: "Enter Full Name..."
      },
      {
        key: "mobileNumber",
        label: "Mobile / WhatsApp Number",
        botPrompt: "Apna 10-digit WhatsApp / Calling Number batayein:",
        type: "input",
        inputType: "tel",
        placeholder: "Enter 10-digit Mobile Number..."
      },
      {
        key: "houseAddress",
        label: "House / Flat Address",
        botPrompt: "Apna House No., Street, aur Landmark batayein:",
        type: "input",
        placeholder: "e.g. Flat 302, Green Valley Apts, Near City Hospital"
      },
      {
        key: "pincodeCity",
        label: "City, State & Pincode",
        botPrompt: "Aapka City, State aur Pincode:",
        type: "input",
        placeholder: "e.g. Lucknow, Uttar Pradesh - 226010"
      }
    ]
  },

  catalog: {
    categoryTitle: "Product Catalog & Trade Rate Sheet",
    badge: "Brochure & Rates",
    steps: [
      {
        key: "catalogType",
        label: "Catalog Variant",
        botPrompt: "Aapko kiska Catalog & Rate List chahiye?",
        type: "options",
        options: [
          { label: "🛍️ Consumer Product Catalog & Brochure", value: "Consumer Product Catalog" },
          { label: "📋 Trade & Wholesale Rate Sheet", value: "Trade & Wholesale Rate Sheet" },
          { label: "💼 Distributorship Margin & ROI Guide", value: "Distributor Margin Guide" },
          { label: "📑 Complete Company Portfolio (Full PDF)", value: "Complete Company Portfolio" }
        ]
      },
      {
        key: "inquirerProfile",
        label: "Inquirer Profile",
        botPrompt: "Aapka primary profile kya hai?",
        type: "options",
        options: [
          { label: "🏪 Retail Grocery / Kirana Store Owner", value: "Retail Kirana Store Owner" },
          { label: "🏬 Wholesaler / Semi-Wholesale Trader", value: "Wholesaler / Trader" },
          { label: "💼 Prospective Distributor / Investor", value: "Prospective Distributor" },
          { label: "🏡 Household Family Consumer", value: "Household Family Consumer" }
        ]
      },
      {
        key: "receiveMode",
        label: "Delivery Medium",
        botPrompt: "Aap catalog kis madhyam se receive karna chahte hain?",
        type: "options",
        options: [
          { label: "📱 Instant WhatsApp Delivery (PDF File)", value: "Instant WhatsApp" },
          { label: "📧 Official Email Dispatch", value: "Official Email" },
          { label: "📥 Direct Website Instant Download", value: "Direct Download" }
        ]
      },
      {
        key: "recipientName",
        label: "Recipient Name",
        botPrompt: "Kripya apna Shubhnaam (Name) batayein:",
        type: "input",
        placeholder: "Enter your Name..."
      },
      {
        key: "mobileNumber",
        label: "WhatsApp Number",
        botPrompt: "Apna WhatsApp Number enter karein jaha PDF bhejna hai:",
        type: "input",
        inputType: "tel",
        placeholder: "Enter 10-digit WhatsApp Number..."
      },
      {
        key: "emailAddress",
        label: "Email Address",
        botPrompt: "Aapka Email Address (Optional):",
        type: "input",
        inputType: "email",
        optional: true,
        placeholder: "e.g. name@example.com (or Skip)..."
      },
      {
        key: "cityState",
        label: "City & State",
        botPrompt: "Aap kis City aur State se hain?",
        type: "input",
        placeholder: "e.g. Kanpur, Uttar Pradesh"
      }
    ]
  }
};

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  
  // Tracking active branch and step index
  const [activeBranch, setActiveBranch] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [collectedData, setCollectedData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [lastSavedRecord, setLastSavedRecord] = useState(null);
  const [copied, setCopied] = useState(false);
  const [emailStatus, setEmailStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

  const messagesEndRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save finalized inquiry to JSON (LocalStorage + backend endpoint)
  const saveCompletedInquiry = async (finalData, branchKey) => {
    try {
      const branchConfig = BRANCH_CONFIGS[branchKey];
      const record = {
        inquiryId: `KC-${branchKey.toUpperCase().slice(0, 4)}-${Date.now().toString().slice(-6)}`,
        category: branchConfig.categoryTitle,
        branch: branchKey,
        badge: branchConfig.badge,
        timestamp: new Date().toISOString(),
        formattedDate: new Date().toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short"
        }),
        status: "Verified Lead",
        details: finalData
      };

      // 1. Browser LocalStorage persistence
      const existing = JSON.parse(localStorage.getItem("kisan_inquiries_data") || "[]");
      const updated = [record, ...existing];
      localStorage.setItem("kisan_inquiries_data", JSON.stringify(updated, null, 2));

      setLastSavedRecord(record);

      // 2. Server persistence if backend is available
      try {
        await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record)
        });
      } catch (err) {
        console.log("Saved to LocalStorage (backend offline/static hosting)");
      }

      return record;
    } catch (e) {
      console.error("Failed to save inquiry:", e);
      return null;
    }
  };

  // Download inquiry as a structured JSON file
  const downloadJSONFile = (record = null) => {
    try {
      const target = record || lastSavedRecord;
      if (!target) return;

      const blob = new Blob([JSON.stringify(target, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `kisan_full_lead_${target.inquiryId}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Detailed JSON file downloaded! 📁");
    } catch (err) {
      toast.error("Download failed, please try again.");
    }
  };

  // Copy raw JSON to clipboard
  const copyJSONToClipboard = (record = null) => {
    const target = record || lastSavedRecord;
    if (!target) return;
    navigator.clipboard.writeText(JSON.stringify(target, null, 2));
    setCopied(true);
    toast.success("JSON copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  // Send collected data via Web3Forms API directly (Zero backend required)
  const sendEmailInquiry = async (record = null) => {
    const target = record || lastSavedRecord;
    if (!target) return;

    setEmailStatus("sending");

    // Format human-readable details
    const formattedDetails = {};
    Object.entries(target.details || {}).forEach(([k, v]) => {
      const stepConfig = BRANCH_CONFIGS[target.branch]?.steps?.find((s) => s.key === k);
      const label = stepConfig?.label || k.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
      formattedDetails[label] = v;
    });

    const web3Key = import.meta.env.VITE_WEB3FORMS_KEY;

    try {
      // If Web3Forms Access Key is provided in .env, send background HTTP POST
      if (web3Key && web3Key.trim().length > 5) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: web3Key.trim(),
            subject: `Kisan Choice New ${target.category} [${target.inquiryId}]`,
            from_name: "Kisan Choice AI Assistant",
            Category: target.category,
            Inquiry_ID: target.inquiryId,
            Submitted_At: target.submittedAt,
            ...formattedDetails
          })
        });

        const resData = await response.json();
        if (resData.success) {
          setEmailStatus("success");
          toast.success("Inquiry data email par bhej diya gaya hai! ✉️");
          setTimeout(() => setEmailStatus("idle"), 4000);
          return;
        }
      }

      // Seamless direct fallback: open pre-filled mailto
      const emailLines = [
        `Kisan Choice New ${target.category} Inquiry (${target.inquiryId})`,
        `Submitted At: ${target.submittedAt}`,
        `----------------------------------------`,
        ...Object.entries(formattedDetails).map(([k, v]) => `${k}: ${v}`),
        `----------------------------------------`,
        `Generated by Kisan Choice AI Assistant`
      ];

      const mailtoUrl = `mailto:info@kisangroups.in?subject=${encodeURIComponent(
        `Kisan Choice Inquiry - ${target.category} [${target.inquiryId}]`
      )}&body=${encodeURIComponent(emailLines.join("\n"))}`;

      window.open(mailtoUrl, "_blank");
      setEmailStatus("success");
      toast.success("Email client me inquiry data pre-fill ho gaya! ✉️");
    } catch (err) {
      console.error("Email send error:", err);
      setEmailStatus("error");
      toast.error("Email send nahi ho paya. Kripya WhatsApp par send karein.");
    } finally {
      setTimeout(() => setEmailStatus("idle"), 4000);
    }
  };

  // Move to next step in the current branch
  const advanceToNextStep = async (newCollectedData, nextIndex) => {
    const branchConfig = BRANCH_CONFIGS[activeBranch];
    
    // Check if branch steps are finished
    if (nextIndex >= branchConfig.steps.length) {
      setIsCompleted(true);
      const saved = await saveCompletedInquiry(newCollectedData, activeBranch);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Aapki ${branchConfig.categoryTitle} ki complete profile safaltapoorvak JSON me darj ho gayi hai! ✅`,
            isSummary: true,
            record: saved || { details: newCollectedData, category: branchConfig.categoryTitle }
          }
        ]);
      }, 350);
      return;
    }

    // Otherwise, show the next step question
    setActiveStepIndex(nextIndex);
    const nextStep = branchConfig.steps[nextIndex];

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: nextStep.botPrompt,
          stepKey: nextStep.key,
          stepType: nextStep.type,
          options: nextStep.options || null,
          optional: nextStep.optional || false
        }
      ]);
    }, 300);
  };

  // Handle User clicking an option chip
  const handleSelectOption = (option) => {
    // 1. Initial Branch Selection
    if (!activeBranch) {
      const branchKey = option.value;
      setActiveBranch(branchKey);
      setMessages((prev) => [...prev, { sender: "user", text: option.label }]);

      const firstStep = BRANCH_CONFIGS[branchKey].steps[0];
      setActiveStepIndex(0);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: firstStep.botPrompt,
            stepKey: firstStep.key,
            stepType: firstStep.type,
            options: firstStep.options || null,
            optional: firstStep.optional || false
          }
        ]);
      }, 350);
      return;
    }

    // 2. Step inside the active branch
    const currentStepConfig = BRANCH_CONFIGS[activeBranch].steps[activeStepIndex];
    const updatedData = { ...collectedData, [currentStepConfig.key]: option.value };
    setCollectedData(updatedData);

    setMessages((prev) => [...prev, { sender: "user", text: option.label }]);
    advanceToNextStep(updatedData, activeStepIndex + 1);
  };

  // Handle User text submission
  const handleSendText = () => {
    const trimmed = inputText.trim();
    if (!trimmed || !activeBranch || isCompleted) return;

    const currentStepConfig = BRANCH_CONFIGS[activeBranch].steps[activeStepIndex];

    // Phone number validation if step is mobileNumber
    if (currentStepConfig.inputType === "tel") {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 10) {
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: trimmed },
          { sender: "bot", text: "⚠️ Kripya ek valid 10-digit mobile number enter karein (e.g. 9876543210):" }
        ]);
        setInputText("");
        return;
      }
    }

    const updatedData = { ...collectedData, [currentStepConfig.key]: trimmed };
    setCollectedData(updatedData);
    setInputText("");

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    advanceToNextStep(updatedData, activeStepIndex + 1);
  };

  // Skip optional step
  const handleSkipStep = () => {
    if (!activeBranch || isCompleted) return;
    const currentStepConfig = BRANCH_CONFIGS[activeBranch].steps[activeStepIndex];
    const updatedData = { ...collectedData, [currentStepConfig.key]: "Not Provided / NA" };
    setCollectedData(updatedData);
    setInputText("");

    setMessages((prev) => [...prev, { sender: "user", text: "Skipped / NA" }]);
    advanceToNextStep(updatedData, activeStepIndex + 1);
  };

  // Reset entire flow
  const handleReset = () => {
    setActiveBranch(null);
    setActiveStepIndex(0);
    setCollectedData({});
    setIsCompleted(false);
    setInputText("");
    setMessages([INITIAL_GREETING]);
  };

  // Generate WhatsApp inquiry text
  const openWhatsAppWithInquiry = (record = null) => {
    const rec = record || lastSavedRecord;
    const d = rec?.details || collectedData;
    const cat = rec?.category || "Inquiry";

    let messageLines = [
      `*Namaste Kisan Choice Team!* 🙏`,
      `Website se nayi *${cat}* submit hui hai:`,
      `--------------------------------------`
    ];

    Object.entries(d).forEach(([k, v]) => {
      // Find matching human label
      const stepConfig = activeBranch 
        ? BRANCH_CONFIGS[activeBranch]?.steps?.find((s) => s.key === k)
        : null;
      const formattedKey = stepConfig?.label || k.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
      messageLines.push(`• *${formattedKey}:* ${v}`);
    });

    messageLines.push(`--------------------------------------`);
    messageLines.push(`Kripya is inquiry par follow-up karein. Dhanyavaad!`);

    const textEncoded = encodeURIComponent(messageLines.join("\n"));
    window.open(`https://wa.me/916390059995?text=${textEncoded}`, "_blank");
  };

  const openGeneralWhatsApp = () => {
    window.open("https://wa.me/916390059995", "_blank");
  };

  // Input placeholder based on step
  const getInputPlaceholder = () => {
    if (!activeBranch) return "Please choose an option above...";
    if (isCompleted) return "Inquiry saved! Tap Reset to start new...";
    const cur = BRANCH_CONFIGS[activeBranch]?.steps[activeStepIndex];
    if (cur?.type === "input") return cur.placeholder || "Type your answer here...";
    return "Please choose an option above...";
  };

  const isInputDisabled = () => {
    if (!activeBranch || isCompleted) return true;
    const cur = BRANCH_CONFIGS[activeBranch]?.steps[activeStepIndex];
    return cur?.type !== "input";
  };

  const currentStep = activeBranch ? BRANCH_CONFIGS[activeBranch]?.steps[activeStepIndex] : null;
  const totalSteps = activeBranch ? BRANCH_CONFIGS[activeBranch]?.steps?.length : 0;
  const progressPercent = activeBranch && totalSteps > 0 
    ? Math.round(((activeStepIndex + 1) / totalSteps) * 100) 
    : 0;

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
            className="w-[calc(100vw-2rem)] sm:w-[410px] md:w-[440px] bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,81,50,0.35)] border border-emerald-100 overflow-hidden flex flex-col mb-2 relative"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B3D2E] via-emerald-800 to-[#0F5132] text-white p-5 flex justify-between items-center z-10 relative shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-200 border border-white/20 shadow-md shrink-0">
                  <Bot size={26} strokeWidth={2} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-extrabold text-[16px] tracking-wide text-white truncate">
                    Kisan Choice Assistant
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-200 flex items-center gap-1.5 uppercase tracking-wider truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                    {activeBranch ? BRANCH_CONFIGS[activeBranch].badge : "Detailed Data Collector"}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)} 
                className="hover:bg-white/20 p-2 rounded-xl transition-all duration-300 text-white hover:scale-105 active:scale-95 shrink-0"
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Smart Progress Bar when in an active branch */}
            {activeBranch && !isCompleted && (
              <div className="bg-emerald-950/20 px-5 py-2 border-b border-emerald-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <span>Step {activeStepIndex + 1} of {totalSteps}</span>
                  <span className="text-gray-400 font-normal">({currentStep?.label || "Input"})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold text-emerald-700">{progressPercent}%</span>
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages Body */}
            <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3.5 bg-slate-50/70 scrollbar-thin scrollbar-thumb-emerald-200">
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
                    className={`max-w-[88%] px-4 py-3 rounded-2xl text-[13.5px] sm:text-[14px] leading-relaxed shadow-xs ${
                      msg.sender === "user"
                        ? "bg-[#0B3D2E] text-white rounded-br-xs shadow-emerald-900/10 font-medium"
                        : "bg-white border border-emerald-100 text-slate-800 rounded-bl-xs shadow-slate-200/50"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Dynamic Clickable Options for this Step */}
                  {msg.options && (
                    <div className="flex flex-col gap-2 mt-2.5 w-full pl-1">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(opt)}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200/80 hover:border-emerald-500 text-slate-800 hover:text-emerald-900 text-xs sm:text-[13px] font-semibold transition-all duration-200 shadow-xs hover:shadow-sm flex items-center justify-between group active:scale-[0.99]"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight size={15} className="text-emerald-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Optional Step Skip Button */}
                  {msg.optional && !isCompleted && (
                    <div className="mt-2 pl-1">
                      <button
                        onClick={handleSkipStep}
                        className="text-[11px] font-bold text-slate-500 hover:text-emerald-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                      >
                        Skip this step (Optional) →
                      </button>
                    </div>
                  )}

                  {/* Comprehensive Summary Card when flow completes */}
                  {msg.isSummary && msg.record && (
                    <div className="w-full mt-3 bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm text-left">
                      <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5 mb-3">
                        <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                          <span>{msg.record.badge} Profile (JSON Record)</span>
                        </div>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {msg.record.inquiryId}
                        </span>
                      </div>

                      {/* Display each detailed field */}
                      <div className="space-y-2 text-xs text-slate-700 max-h-48 overflow-y-auto pr-1">
                        {Object.entries(msg.record.details || {}).map(([fieldKey, val]) => {
                          const stepObj = BRANCH_CONFIGS[activeBranch]?.steps?.find((s) => s.key === fieldKey);
                          const readableLabel = stepObj?.label || fieldKey
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (s) => s.toUpperCase());
                          
                          return (
                            <div key={fieldKey} className="flex items-start gap-2 border-b border-slate-50 pb-1.5">
                              <span className="text-slate-400 font-semibold shrink-0 min-w-[110px]">
                                {readableLabel}:
                              </span>
                              <span className="font-bold text-slate-900 break-words flex-1">
                                {val}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Direct PDF Catalog Download if user came via catalog flow */}
                      {msg.record.branch === "catalog" && (
                        <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                            <FileText size={16} className="text-amber-700" />
                            <span>Kisan Choice Product Catalog</span>
                          </div>
                          <a
                            href="/new-catalog.pdf"
                            download="KisanChoice_Catalog.pdf"
                            className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] shadow-xs"
                          >
                            Open PDF
                          </a>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => downloadJSONFile(msg.record)}
                            className="w-full py-2 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0B3D2E] font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-300 transition-colors"
                          >
                            <Download size={13} /> Download JSON
                          </button>

                          <button
                            onClick={() => copyJSONToClipboard(msg.record)}
                            className="w-full py-2 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
                          >
                            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                            {copied ? "Copied!" : "Copy JSON"}
                          </button>
                        </div>
                        
                        {/* 📧 Send to Email Button (Web3Forms API / Email) */}
                        <button
                          onClick={() => sendEmailInquiry(msg.record)}
                          disabled={emailStatus === "sending"}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#0B3D2E] hover:bg-[#145a44] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
                        >
                          <Mail size={15} />
                          {emailStatus === "sending"
                            ? "Email Bheja Ja Raha Hai..."
                            : emailStatus === "success"
                            ? "Email Bhej Diya Gaya! ✓"
                            : "Send Full Data to Email"}
                        </button>

                        <button
                          onClick={() => openWhatsAppWithInquiry(msg.record)}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                        >
                          <FaWhatsapp size={15} /> Send Full Data on WhatsApp
                        </button>

                        <button
                          onClick={handleReset}
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

            {/* Input Form Area */}
            <div className="p-3 bg-white border-t border-emerald-100 flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type={
                    activeBranch && BRANCH_CONFIGS[activeBranch]?.steps[activeStepIndex]?.inputType === "tel"
                      ? "tel"
                      : activeBranch && BRANCH_CONFIGS[activeBranch]?.steps[activeStepIndex]?.inputType === "email"
                      ? "email"
                      : "text"
                  }
                  value={inputText}
                  disabled={isInputDisabled()}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendText()}
                  placeholder={getInputPlaceholder()}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-10 py-3 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendText}
                  disabled={!inputText.trim() || isInputDisabled()}
                  className="absolute right-1.5 top-1.5 p-2 bg-[#0B3D2E] hover:bg-[#125841] text-white rounded-xl transition-all disabled:opacity-0 disabled:scale-75 disabled:pointer-events-none scale-100 shadow-sm"
                  title="Send"
                  aria-label="Send"
                >
                  <Send size={15} strokeWidth={2.5} />
                </button>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
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
        
        {/* Chat Assistant Toggle Button */}
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