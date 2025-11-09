"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Achievements } from "@/components/landing/Achivements";
import { CoursesSection } from "@/components/landing/CoursesSection";
import {TestimonialsSection} from "@/components/landing/TestimonialsSection";
import { FacultySection } from "@/components/landing/FacultySection";

import { HighlightedCTA } from "@/components/landing/HighlightedCTASections";
import { FAQSection } from "@/components/landing/FAQSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import GallerySection from "@/components/landing/GallerySection";

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <HeroSection />
      <Achievements/>
      <FeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
      <FacultySection />
      <GallerySection/>
      <HighlightedCTA/>
      <FAQSection/>
      <ContactSection/>
      <FinalCTA/>
    </main>
  );
}
