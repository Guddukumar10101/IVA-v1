"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

// ✅ Lazy load ReactPlayer for Next.js
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// ✅ Testimonial type
interface Testimonial {
  name: string;
  photo: string;
  result: string;
  quote: string;
  video?: string; // optional
}

const testimonials: Testimonial[] = [
  {
    name: "Rohit Sharma",
    photo: "/images/students/rohit.jpg",
    result: "NEET 2024 – AIR 56",
    quote:
      "Inspired Vision Academy changed my life. The mentorship and tests kept me on track!",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    name: "Priya Kumari",
    photo: "/images/students/priya.jpg",
    result: "JEE Advanced 2024 – AIR 123",
    quote:
      "The faculty here is top-notch. They not only taught but also motivated me every single day!",
  },
  {
    name: "Aman Verma",
    photo: "/images/students/aman.jpg",
    result: "Sainik School Entrance Topper",
    quote:
      "The test series and personal mentorship gave me confidence to crack the exam.",
    video: "https://vimeo.com/76979871",
  },
];

export function TestimonialsSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section className="relative py-24 px-6 lg:px-24 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="p-4 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] shadow-lg mb-4"
          >
            <Sparkles className="w-10 h-10 text-white drop-shadow-md" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-[var(--gradient-primary)] drop-shadow-lg">
            What Our Students Say
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "200px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 mt-3 rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] shadow-md"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-[var(--muted-foreground)] max-w-2xl mx-auto text-lg"
          >
            Hear from toppers and achievers who trusted Inspired Vision Academy.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[var(--card)] p-6 rounded-2xl shadow-xl border border-[var(--border)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[var(--primary)] mx-auto shadow-md"
                />

                {t.video && (
                  <button
                    onClick={() => t.video && setSelectedVideo(t.video)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full transition"
                  >
                    <Play className="w-8 h-8 text-white" />
                  </button>
                )}
              </div>

              <p className="italic text-[var(--muted-foreground)] mb-4">“{t.quote}”</p>
              <h4 className="text-lg font-bold text-[var(--foreground)]">{t.name}</h4>
              <span className="text-sm text-[var(--primary)] font-medium">{t.result}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 p-2 rounded-full z-10 transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* ReactPlayer */}
              <ReactPlayer
                url={selectedVideo}
                controls
                width="100%"
                height="100%"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
