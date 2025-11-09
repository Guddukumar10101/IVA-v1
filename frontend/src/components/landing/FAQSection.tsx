"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do you provide hostel?",
    a: "Yes, we provide safe and well-maintained hostel facilities for both boys and girls.",
  },
  {
    q: "Can I join online classes?",
    a: "Absolutely! We offer hybrid learning options with both offline and online classes.",
  },
  {
    q: "Do you prepare for govt jobs also?",
    a: "Yes, apart from NEET/JEE/Defence, we also guide for selected government exams.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-6 lg:px-20 bg-[var(--card)]">
      <div className="max-w-4xl mx-auto">
        {/* ✅ Heading with Icon (Centered & Stylish) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3">
            <HelpCircle className="w-12 h-12 text-[var(--primary)] drop-shadow-lg" />
            <h2 className="text-3xl md:text-5xl font-extrabold 
              bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] 
              bg-clip-text text-transparent drop-shadow-md">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Got queries? We’ve got the answers you’re looking for!
          </p>
        </motion.div>

        {/* ✅ FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border border-[var(--border)] rounded-xl 
              bg-[var(--background)] shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 
                text-left font-semibold text-[var(--foreground)] 
                hover:bg-[var(--muted)] transition"
              >
                {item.q}
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[var(--primary)]" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-4 text-[var(--muted-foreground)]"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
