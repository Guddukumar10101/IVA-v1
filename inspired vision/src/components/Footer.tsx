"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--card)] text-[var(--foreground)] border-t border-[var(--border)] py-14 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Logo and About */}
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            IVA Coaching
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed text-sm md:text-base">
            IVA Coaching is dedicated to empowering students with quality
            education, expert faculty, and personalized guidance. Our mission is
            to build strong foundations and help students achieve excellence in
            school, boards, and competitive entrance tests.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-[var(--muted-foreground)]">
            {[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: "Faculty", href: "/faculty" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="relative inline-block font-medium transition-all duration-300
                             after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0
                             after:bg-gradient-to-r after:from-blue-600 after:to-indigo-600
                             hover:after:w-full after:transition-all after:duration-500
                             hover:text-[var(--primary)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info & Social */}
        <div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-[var(--muted-foreground)] mb-5">
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Phone size={18} /> +91 98765 43210
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <Mail size={18} /> info@ivacoaching.com
            </li>
            <li className="flex justify-center md:justify-start items-center gap-2">
              <MapPin size={18} /> 2nd Floor, Knowledge Plaza, New Delhi
            </li>
          </ul>

          {/* Social Media */}
          <div className="flex justify-center md:justify-start gap-4 text-[var(--muted-foreground)] mb-6">
            {[
              { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
              { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
              { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
              { icon: <Youtube size={20} />, label: "YouTube", href: "#" },
            ].map(({ icon, label, href }) => (
              <motion.a
                whileHover={{ scale: 1.15 }}
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-full transition-all duration-300 
                           hover:text-white
                           hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600"
              >
                {icon}
              </motion.a>
            ))}
          </div>

          <div className="flex justify-center md:justify-start">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--muted-foreground)]">
        © {new Date().getFullYear()} IVA Coaching Institute. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
