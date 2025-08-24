"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-yellow-400 dark:to-orange-500 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center text-white">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold mb-4"
        >
          Admissions Open – Join IVA Coaching Today!
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto"
        >
          Unlock your potential with expert faculty, personalized guidance, and
          a proven track record of success. Start your journey today!
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/apply"
            className="px-8 py-4 rounded-xl bg-white text-blue-600 dark:text-yellow-500 font-semibold text-lg shadow-lg hover:scale-105 transition"
          >
            Apply Now
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
