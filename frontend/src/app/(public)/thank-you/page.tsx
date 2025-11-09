"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 text-center max-w-md"
      >
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
          🎉 Thank You!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your enrollment was successful. We will contact you shortly.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
        >
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
}
