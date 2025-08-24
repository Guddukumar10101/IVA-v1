"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const mentors = [
  {
    name: "Dr. Anil Kumar",
    photo: "/images/faculty/anil.jpg",
    subject: "Physics",
    experience: "12+ Years",
    tagline: "Ex-IITian | Expert Mentor",
    bio: "Specialized in JEE/NEET Physics with proven track record of producing top ranks.",
  },
  {
    name: "Neha Sharma",
    photo: "/images/faculty/neha.jpg",
    subject: "Chemistry",
    experience: "10+ Years",
    tagline: "Doctor | Research Scholar",
    bio: "Known for simplifying Organic Chemistry & mentoring Olympiad students.",
  },
  {
    name: "Rajesh Gupta",
    photo: "/images/faculty/rajesh.jpg",
    subject: "Mathematics",
    experience: "15+ Years",
    tagline: "Maths Wizard | Author",
    bio: "Authored multiple competitive books, mentored JEE Advanced toppers.",
  },
  {
    name: "Priya Verma",
    photo: "/images/faculty/priya.jpg",
    subject: "Biology",
    experience: "8+ Years",
    tagline: "Biologist | NEET Specialist",
    bio: "Expert in Human Physiology and Genetics, NEET-focused guidance.",
  },
];

export function FacultySection() {
  return (
    <section className="relative py-24 px-6 lg:px-24 bg-gradient-to-b from-[var(--background)] to-[var(--card)]">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* ✅ Updated Heading with Stylish Icon & Animation */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 12 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-4 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] 
            shadow-lg mb-4"
          >
            <GraduationCap className="w-12 h-12 text-white drop-shadow-md" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent 
          bg-clip-text bg-[var(--gradient-primary)] drop-shadow-lg">
            Meet Our Mentors
          </h2>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "220px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 mt-3 rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] shadow-md"
          />
        </motion.div>

        <p className="mt-6 text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Our highly experienced faculty members are the backbone of our success —
          guiding, mentoring, and inspiring every student to achieve their dreams.
        </p>

        {/* ✅ Mentor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-16">
          {mentors.map((mentor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl 
              border border-white/20 hover:shadow-2xl transition-all duration-500 
              group overflow-hidden"
            >
              {/* Mentor Image */}
              <div className="relative">
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover border-4 
                  border-[var(--primary)] shadow-md transition-transform 
                  duration-500 group-hover:scale-110"
                />
              </div>

              {/* Mentor Info */}
              <h4 className="mt-4 text-xl font-bold text-[var(--foreground)]">
                {mentor.name}
              </h4>
              <p className="text-[var(--primary)] text-sm font-medium">
                {mentor.subject} • {mentor.experience}
              </p>
              <p className="text-xs mt-1 italic text-[var(--muted-foreground)]">
                {mentor.tagline}
              </p>

              {/* Hover Bio Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent 
              text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 
              flex items-end justify-center p-6 text-sm">
                <p className="text-center">{mentor.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
