"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <div
      onClick={toggleTheme}
      className="w-14 h-7 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full p-0.5 cursor-pointer shadow-inner relative"
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow absolute top-0.5"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isDark ? (
          <Moon size={12} className="text-yellow-500" />
        ) : (
          <Sun size={12} className="text-green-600" />
        )}
      </motion.div>
    </div>
  );
}
