"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 px-6 lg:px-20 bg-[var(--card)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* ✅ Stylish Heading with Icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="p-4 rounded-full bg-gradient-to-tr from-[var(--primary)] to-purple-500 shadow-xl"
            >
              <MapPin className="w-12 h-12 text-white drop-shadow-xl" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-[var(--gradient-primary)] drop-shadow-md">
            Get in Touch
          </h2>
          <p className="mt-3 text-lg text-[var(--muted-foreground)]">
            We’d love to hear from you! 📩
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ✅ Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
                Our Address
              </h3>
              <p className="text-[var(--muted-foreground)] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--primary)]" />
                Inspired Vision Academy, City Center, YourTown, India
              </p>
              <p className="text-[var(--muted-foreground)] flex items-center gap-2 mt-2">
                <Phone className="w-5 h-5 text-[var(--primary)]" /> +91 98765
                43210
              </p>
              <p className="text-[var(--muted-foreground)] flex items-center gap-2 mt-2">
                <Mail className="w-5 h-5 text-[var(--primary)]" />{" "}
                info@inspiredvision.com
              </p>
            </div>

            {/* ✅ Google Maps Embed */}
            <div className="overflow-hidden rounded-2xl shadow-lg border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.123456!2d80.123456!3d26.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2sInspired%20Vision%20Academy!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* ✅ Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
          >
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">
              Inquiry Form
            </h3>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:scale-105 transition shadow-lg"
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ✅ Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 transition-transform hover:scale-110"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </section>
  );
}
