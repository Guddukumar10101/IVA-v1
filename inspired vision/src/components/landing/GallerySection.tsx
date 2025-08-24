"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Sparkles, X } from "lucide-react";

const gallery = [
  { id: 1, src: "/images/gallery/classroom1.jpg", caption: "Interactive Classroom" },
  { id: 2, src: "/images/gallery/lab.jpg", caption: "Computer Lab" },
  { id: 3, src: "/images/gallery/seminar.jpg", caption: "Seminar & Workshop" },
  { id: 4, src: "/images/gallery/drill.jpg", caption: "Defence Drills" },
  { id: 5, src: "/images/gallery/library.jpg", caption: "Library" },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative py-24 px-6 lg:px-24 bg-[var(--card)]">
      <div className="max-w-7xl mx-auto text-center">
        {/* ✅ Stylish Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Icon Glow */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-4 p-5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 shadow-lg shadow-pink-400/40 w-fit"
          >
            <ImageIcon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold 
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
              bg-clip-text text-transparent drop-shadow-lg"
          >
            Academy Life & Gallery
          </motion.h2>

          {/* Underline Animation */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "160px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full mx-auto mt-4"
          />

          {/* Sparkles */}
          <Sparkles className="w-6 h-6 text-pink-500 animate-pulse mx-auto mt-3" />
        </motion.div>

        {/* ✅ Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-sm py-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                {img.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ✅ Lightbox */}
      <AnimatePresence>
        {selectedImage && (
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
              className="relative w-full max-w-5xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 
                p-2 rounded-full z-10 transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <img
                src={selectedImage}
                alt="Gallery Preview"
                className="w-full rounded-xl shadow-2xl max-h-[80vh] object-contain mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
