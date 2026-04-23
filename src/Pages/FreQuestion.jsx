import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "What products does Eco Kisan Choice offer?",
      answer:
        "Eco Kisan Agro specializes in premium edible oils including Kachi Ghani Mustard Oil, Refined Soyabean Oil, Sunflower Oil, Rice Bran Oil, Coconut Oil, Groundnut Oil, Alsi Oil, and Pooja Oil.",
    },
    {
      question: "What makes KisanChoice oils different?",
      answer:
        "Our oils are made using high-quality seeds and advanced processing methods to retain natural aroma, taste, and nutrition.",
    },
    {
      question: "Are your oils suitable for daily cooking?",
      answer:
        "Yes, our oils are perfect for everyday cooking and provide both taste and health benefits.",
    },
    {
      question: "What pack sizes are available?",
      answer:
        "We offer multiple sizes ranging from small retail packs to large bulk containers.",
    },
    {
      question: "Do you provide bulk supply?",
      answer:
        "Yes, we provide bulk supply for wholesalers, retailers, and industries.",
    },
    {
      question: "Are your products certified?",
      answer:
        "Yes, all our products go through strict quality checks and are certified.",
    },
  ];

  return (
    <div className="w-full bg-green-30 py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-10">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-green-200 rounded-xl shadow-sm overflow-hidden"
            >

              {/* Question */}
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium "
              >
                <span>{index + 1}. {item.question}</span>

                <span
                  className={`text-xl transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-4 text text-sm leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}