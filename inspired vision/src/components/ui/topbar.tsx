"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function Topbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-14 bg-card/70 backdrop-blur-lg border-b border-border flex items-center justify-between px-6 shadow-sm">
      <h2 className="text-xl font-semibold gradient-text">Admin Dashboard</h2>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <motion.button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-blue-500" />
          )}
        </motion.button>

        {/* Profile Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary shadow-md flex items-center justify-center font-bold text-primary-foreground">
          A
        </div>
      </div>
    </header>
  );
}
