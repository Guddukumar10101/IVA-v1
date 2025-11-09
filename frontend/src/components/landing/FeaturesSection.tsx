"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const features = [
  "Experienced & Dedicated Faculty",
  "Personalized Mentorship & Guidance",
  "Comprehensive Study Material",
  "Regular Tests & Performance Tracking",
  "Doubt Solving Sessions & 1:1 Support",
  "Top Results in NEET & JEE",
  "Modern Classrooms & Digital Learning",
  "Motivational Seminars & Workshops",
  "Scholarships & Financial Assistance",
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 px-6 lg:px-24 overflow-hidden bg-[var(--background)]">
      {/* 🔮 Animated glowing orbs */}
      <div className="absolute -top-40 -left-32 w-96 h-96 bg-[var(--primary)]/25 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute top-40 -right-32 w-96 h-96 bg-[var(--accent)]/25 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold 
            text-transparent bg-clip-text 
            bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] 
            drop-shadow-[0_0_25px_rgba(0,0,0,0.35)]"
        >
          Why Choose Inspired Vision Academy?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg mt-6 text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.25)]"
        >
          We don’t just prepare students for exams — we prepare them for{" "}
          <span className="font-semibold text-[var(--primary)] drop-shadow-[0_0_12px_rgba(0,0,0,0.3)]">
            life-changing success
          </span>
          .
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 text-left">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-[1px] rounded-2xl 
                bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)] 
                shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Card body */}
              <div
                className="relative flex items-start gap-4 
                  bg-[var(--card)]/90 backdrop-blur-xl 
                  p-6 rounded-2xl h-full 
                  transition-all duration-300 group-hover:scale-[1.03]"
              >
                <CheckCircle
                  className="text-[var(--primary)] group-hover:text-[var(--accent)] 
                    transition-colors duration-300 mt-1 flex-shrink-0"
                  size={28}
                />
                <span className="text-[var(--foreground)] font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
