"use client";

import { motion } from "framer-motion";
import { GraduationCap, Shield, BookOpen, Laptop } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "School Coaching (Class 1–12)",
    description:
      "Strong foundation for all subjects with personal guidance & modern teaching methods.",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "Sainik, Navodaya & Netarhat Prep",
    description:
      "Specialized training for entrance exams with mock tests & interview guidance.",
    icon: Shield,
  },
  {
    id: 3,
    title: "Competitive Exams (General & Defence)",
    description:
      "Preparation for SSC, Banking, Railway, Army, Navy & other defence exams.",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Computer & Programming",
    description:
      "DCA, ADCA, Web Development, Python, C++, Java & modern digital skills.",
    icon: Laptop,
  },
];

export function CoursesSection() {
  return (
    <section className="relative py-24 px-6 lg:px-24 bg-[var(--background)]">
      {/* Glow background */}
      <div className="absolute -top-40 -left-32 w-96 h-96 bg-[var(--primary)]/20 rounded-full blur-[120px]"></div>
      <div className="absolute top-40 -right-32 w-96 h-96 bg-[var(--accent)]/20 rounded-full blur-[120px]"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text 
            bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] drop-shadow-lg"
        >
          Our <span className="text-[var(--foreground)]">Courses</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg mt-6 text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed"
        >
          Explore our wide range of academic & competitive courses designed to
          <span className="font-semibold text-[var(--primary)]">
            {" "}unlock your full potential
          </span>
          .
        </motion.p>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {courses.map((course, i) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-[1px] rounded-2xl shadow-lg hover:shadow-2xl 
                  bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--highlight)]
                  transition-all duration-500"
              >
                {/* Card body */}
                <div
                  className="relative flex flex-col items-center text-center 
                    bg-[var(--card)]/90 backdrop-blur-xl 
                    p-8 rounded-2xl h-full 
                    transition-all duration-300 group-hover:scale-[1.03]"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full 
                    bg-[var(--primary)]/10 text-[var(--primary)] mb-6 group-hover:bg-[var(--accent)]/20 
                    group-hover:text-[var(--accent)] transition-colors duration-300"
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {course.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                    {course.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
