"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Home, BookOpen, Users, Info, Phone } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: <Home size={18} className="mr-2" /> },
  // { href: "/courses", label: "Courses", icon: <BookOpen size={18} className="mr-2" /> },
  // { href: "/faculty", label: "Faculty", icon: <Users size={18} className="mr-2" /> },

  { href: "/contact", label: "Contact", icon: <Phone size={18} className="mr-2" /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-gray-200 shadow-md 
             transition-colors bg-white/80 backdrop-blur dark:bg-gray-900"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Coaching Logo / Brand */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Inspired Vision Academy
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center font-medium px-3 py-2 rounded-md transition-all duration-200 ${
                isActive(href)
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800/50"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          {/* Theme Toggle */}
          <div className="ml-4">
            <ThemeToggle />
          </div>

          {/* Auth Buttons */}
          <div className="ml-4 flex gap-2">
            <Link
              href="/login"
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                pathname === "/login"
                  ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow"
                  : "text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90"
              }`}
            >
              Admin Login
            </Link>
            <Link
              href="/enroll"
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                pathname === "/enroll"
                  ? "border-indigo-600 text-white bg-indigo-600/90 shadow"
                  : "border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/25"
              }`}
            >
              Enroll Now
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-3 py-2 rounded-md font-medium transition-all ${
                isActive(href)
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                  : "text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800/50"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          <div className="pt-3 flex items-center justify-between">
            <ThemeToggle />
            <Link
              href="/login"
              className={`text-sm font-medium ${
                pathname === "/login"
                  ? "text-indigo-600 underline"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Admin Login
            </Link>
            <Link
              href="/enroll"
              className={`text-sm font-medium ${
                pathname === "/enroll"
                  ? "text-indigo-600 underline"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
