"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Trophy, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const achievements = [
  { name: "Rohit Sharma", src: "/images/team/Guddu.jpg", detail: "NEET 2024 – AIR 56" },
  { name: "Ananya Gupta", src: "/toppers/ananya.png", detail: "JEE Mains – 99.2%" },
  { name: "Arjun Verma", src: "/toppers/arjun.png", detail: "JEE Advanced – AIR 320" },
  { name: "Priya Singh", src: "/toppers/priya.png", detail: "NEET 2024 – 685/720" },
  { name: "Karan Patel", src: "/toppers/karan.png", detail: "Olympiad Gold Medalist" },
  { name: "Sneha Roy", src: "/toppers/sneha.png", detail: "NTSE Scholar" },
];

export function Achievements() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: { perView: 3, spacing: 24 },
    breakpoints: {
      "(max-width: 768px)": { slides: { perView: 1.1, spacing: 16 } },
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 20 } },
    },
  });

  const [isPaused, setIsPaused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (!instanceRef.current) return;
    const autoplay = setInterval(() => {
      if (!isPaused) instanceRef.current?.next();
    }, 3500);
    return () => clearInterval(autoplay);
  }, [instanceRef, isPaused]);

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;
    setTotalSlides(slider.track.details.slides.length);
    slider.on("slideChanged", (s) => setCurrentSlide(s.track.details.rel));
  }, [instanceRef]);

  return (
    <section className="relative py-28 bg-[var(--background)] overflow-hidden">
      {/* Decorative gradient blobs */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -left-20 w-96 h-96 rounded-full blur-3xl bg-[var(--primary)]/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full blur-3xl bg-[var(--accent)]/20"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Badge
              variant="secondary"
              className="mb-5 px-6 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold flex items-center gap-2 shadow-inner"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Celebrating Excellence
            </Badge>
          </motion.div>

          {/* Icon + Title Centered */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: [0, -10, 10, 0], scale: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              className="p-6 rounded-full bg-[var(--primary)]/10 shadow-lg shadow-[var(--primary)]/40"
            >
              <Trophy className="w-14 h-14 text-[var(--primary)]" />
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-[var(--gradient-primary)] animate-gradient">
              Our Top Achievers
            </h2>
          </div>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
            Meet the shining stars 🌟 who turned hard work into success, setting
            new benchmarks for excellence.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {achievements.map((student) => (
              <motion.div
                key={student.name}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="keen-slider__slide flex items-center justify-center"
              >
                <div
                  className="relative w-full max-w-sm p-6 rounded-2xl overflow-hidden 
                  backdrop-blur-md bg-[var(--card)]/80 text-[var(--card-foreground)]
                  border border-[var(--primary)]/30 shadow-xl 
                  hover:shadow-[0_0_25px_var(--primary)] transition-all duration-500"
                >
                  {/* Glow Border Effect */}
                  <motion.div
                    animate={{ opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[var(--primary)]/40 to-[var(--accent)]/40 blur-lg"
                  />

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="relative w-28 h-28 mx-auto">
                      <Image
                        src={student.src}
                        alt={student.name}
                        fill
                        className="rounded-full object-cover shadow-md ring-4 ring-[var(--primary)]/40"
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <p className="text-sm font-medium mt-1 text-[var(--accent)]">
                        {student.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute top-1/2 -left-8 -translate-y-1/2 p-3 rounded-full shadow-lg 
                       hover:scale-110 transition bg-[var(--gradient-primary)] text-white"
          >
            ◀
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute top-1/2 -right-8 -translate-y-1/2 p-3 rounded-full shadow-lg 
                       hover:scale-110 transition bg-[var(--gradient-primary)] text-white"
          >
            ▶
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === idx
                  ? "bg-[var(--primary)] scale-125 shadow-[0_0_8px_var(--primary)]"
                  : "bg-[var(--muted-foreground)]/40"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
