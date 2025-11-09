"use client";

import { motion } from "framer-motion";
import { Download, Rocket } from "lucide-react";

export function HighlightedCTA() {
  return (
    <section className="relative py-24 px-6 lg:px-20 
      bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] 
      text-white overflow-hidden">
      
      {/* Decorative BG Overlay */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* ✅ Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
        >
          Admissions Open 2025 🚀
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl font-medium max-w-2xl mx-auto text-white/90"
        >
          Join <span className="font-bold">Inspired Vision Academy</span> and start
          your journey towards success in{" "}
          <span className="underline">NEET, JEE & Defence Exams</span>.
        </motion.p>

        {/* ✅ Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row gap-6 justify-center"
        >
          
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 
            bg-[var(--accent)]/80 border-2 border-white 
            rounded-full font-semibold shadow-lg hover:bg-white hover:text-[var(--accent)] 
            hover:scale-105 transition"
          >
            <Rocket className="w-5 h-5" /> Apply Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
