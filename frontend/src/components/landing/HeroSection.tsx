"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Welcome to Inspired Vision Academy",
    desc: "Where dreams meet dedication. Join us to excel in academics & competitive exams.",
    img: "/hero1.svg",
    btn1: { label: "Explore Courses", href: "/courses" },
    btn2: { label: "Meet Faculty", href: "/faculty" },
  },
  {
    title: "Expert Faculty & Personalized Guidance",
    desc: "Learn from the best educators with years of experience in guiding students to success.",
    img: "/hero2.svg",
    btn1: { label: "Our Faculty", href: "/faculty" },
    btn2: { label: "About Us", href: "/about" },
  },
  {
    title: "Our Mission & Vision",
    desc: "Mission: To empower students with quality education and strong values. Vision: To be the most trusted institute nurturing leaders of tomorrow.",
    img: "/mission-vision.svg", // 👈 is naam ki image bana lo ya placeholder rakh lo
    btn1: { label: "Know More", href: "/about" },
    btn2: { label: "Join Us", href: "/contact" },
  },
  {
    title: "Shaping Leaders of Tomorrow",
    desc: "With structured courses and regular assessments, IVA ensures holistic growth of every student.",
    img: "/hero3.svg",
    btn1: { label: "Join Now", href: "/contact" },
    btn2: { label: "View Courses", href: "/courses" },
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[var(--background)] py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={
              current === index
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -100 }
            }
            transition={{ duration: 0.8 }}
            className={`grid md:grid-cols-2 gap-12 items-center ${
              current === index ? "relative" : "hidden"
            }`}
          >
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl text-[var(--muted-foreground)]">
                {slide.desc}
              </p>
              <div className="flex gap-4">
                <Link
                  href={slide.btn1.href}
                  className="px-6 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:scale-105 transition-transform"
                >
                  {slide.btn1.label}
                </Link>
                <Link
                  href={slide.btn2.href}
                  className="px-6 py-3 text-sm font-medium rounded-full border border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  {slide.btn2.label}
                </Link>
              </div>
            </div>

            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={current === index ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src={slide.img}
                alt={slide.title}
                width={600}
                height={500}
                className="w-full h-auto rounded-xl shadow-xl hover:scale-105 hover:rotate-1 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === i ? "bg-indigo-600 w-6" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}







