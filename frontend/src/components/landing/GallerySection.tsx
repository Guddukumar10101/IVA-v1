"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type GalleryImage = {
  id: number;
  imageUrl: string;
  caption: string;
};

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch gallery images
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(
          "https://ivworlds.com/backend/controllers/GalleryController.php"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setGallery(data);
        } else {
          setError("Invalid response from server");
        }
      } catch (err) {
        console.error("❌ Gallery fetch error:", err);
        setError("Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // ✅ Disable background scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "auto";
  }, [selectedIndex]);

  // ✅ Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, gallery]);

  // ✅ Navigation
  const prevImage = () => {
    if (selectedIndex !== null && gallery.length > 0) {
      setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length);
    }
  };
  const nextImage = () => {
    if (selectedIndex !== null && gallery.length > 0) {
      setSelectedIndex((selectedIndex + 1) % gallery.length);
    }
  };

  // ✅ Fallback image
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder-image.jpg"; // add this to your /public folder
  };

  return (
    <section className="relative py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-4 p-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 shadow-lg w-fit"
          >
            <ImageIcon className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Academy Life & Gallery
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "180px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full mx-auto mt-4"
          />

          <Sparkles className="w-6 h-6 text-pink-500 animate-pulse mx-auto mt-3" />
        </motion.div>

        {/* ✅ Gallery Grid */}
        {loading ? (
          <p className="text-gray-500 text-lg animate-pulse">Loading gallery...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : gallery.length === 0 ? (
          <p className="text-gray-500 text-lg">📸 No images found in gallery.</p>
        ) : (
          <div
            className="
              columns-2 sm:columns-3 md:columns-4 lg:columns-5 
              gap-4 space-y-4
            "
          >
            {gallery.map((img, i) => (
              <motion.div
                key={img.id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl break-inside-avoid"
                onClick={() => setSelectedIndex(i)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.caption || "Gallery Image"}
                  onError={handleImageError}
                  loading="lazy"
                  className="w-full rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white text-sm sm:text-base font-medium px-2">
                    {img.caption || "Untitled"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && gallery[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 
                p-2 rounded-full z-10 transition"
              >
                <X className="w-7 h-7 text-white" />
              </button>

              {/* Prev */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 
                p-2 rounded-full z-10 transition"
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 
                p-2 rounded-full z-10 transition"
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>

              {/* Image */}
              <img
                src={gallery[selectedIndex].imageUrl}
                alt="Gallery Preview"
                onError={handleImageError}
                className="w-full rounded-xl shadow-2xl max-h-[85vh] object-contain mx-auto"
              />

              <p className="text-center text-gray-200 mt-4 text-sm sm:text-base">
                {gallery[selectedIndex].caption || ""}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
