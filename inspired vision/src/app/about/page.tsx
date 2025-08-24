"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CheckCircle, Sparkles } from "lucide-react";

const aboutSections = [
  {
    title: "Who We Are",
    description:
      "Easy Mart is your personal grocery price comparison companion. We analyze prices from top platforms like Blinkit, BigBasket, and others to ensure you always get the best deal — effortlessly.",
    image: "/who-we.png",
  },
  {
    title: "Why We Built Easy Mart",
    description:
      "We saw how much time and money people waste hopping between apps. Our mission is to streamline grocery shopping — helping you compare, save, and shop smarter, every day.",
    image: "/clients/c4.jpg",
  },
  {
    title: "Our Vision",
    description:
      "To become the go-to platform for price-conscious shoppers by delivering real-time data, intuitive tools, and a luxurious yet functional experience.",
    image: "/vision.svg",
  },
];

const values = [
  "Transparency & Trust",
  "User-First Innovation",
  "Sustainable Shopping",
  "Speed & Simplicity",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-16 md:px-16 lg:px-24 space-y-28 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center gradient-text mb-4"
      >
        About Easy Mart
      </motion.h1>

      <Separator className="bg-muted h-[1.5px] w-1/4 mx-auto rounded-full" />

      {aboutSections.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className={`flex flex-col-reverse md:flex-row items-center gap-12 ${
            idx % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold gradient-text">
              {section.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {section.description}
            </p>
          </div>

          <div className="flex-1 w-full">
          <Card className="group rounded-3xl overflow-hidden shadow-xl border border-muted bg-gradient-to-br from-[oklch(0.9_0.1_120)] to-[oklch(0.85_0.14_90)] dark:from-[oklch(0.35_0.12_120)] dark:to-[oklch(0.3_0.15_90)] transition duration-500 hover:shadow-2xl">
  <CardContent className="p-0 relative">
    <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden">
      <Image
        src={section.image}
        alt={section.title}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  </CardContent>
</Card>

          </div>
        </motion.div>
      ))}

      {/* Our Values */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-card/50 p-10 rounded-3xl border border-border backdrop-blur-xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 text-center">
          Our Core Values
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background/80 hover:shadow-lg hover:scale-[1.02] transition"
            >
              <CheckCircle className="text-primary" size={22} />
              <span className="text-lg font-medium text-foreground">{value}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-left text-lg font-semibold">
              How does Easy Mart compare prices?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We pull real-time price data from trusted sources like Blinkit, BigBasket, and more. Then, we show you a side-by-side comparison so you make the best choice — instantly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger className="text-left text-lg font-semibold">
              Is Easy Mart free to use?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes, Easy Mart is completely free. Our goal is to help every shopper make smarter grocery decisions without spending extra.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger className="text-left text-lg font-semibold">
              Will you add more grocery platforms?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Absolutely! We’re continuously expanding and aim to integrate more trusted grocery delivery services in the near future.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
          Join the Smart Grocery Revolution.
        </h3>
        <p className="text-muted-foreground mb-6 text-lg">
          Experience the luxury of effortless comparison and maximum savings.
        </p>
        <a
          href="/register"
          className="inline-block rounded-full bg-gradient-to-r from-[oklch(70%_0.14_140)] to-[oklch(78%_0.12_100)] text-black font-semibold px-6 py-3 hover:scale-[1.03] hover:brightness-110 transition shadow-md"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
}