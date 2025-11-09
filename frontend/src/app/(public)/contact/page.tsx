"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { contactSchema } from "@/app/../schema/contactSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import ContactHero from "./contactHero";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className="relative py-0 bg-background text-foreground font-[Work_Sans] overflow-hidden">
      {/* Gradient Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-[#0f0f0f] dark:via-[#121212] dark:to-[#1a1a1a] animate-pulse-slow opacity-70 -z-10" />

      {/* Hero */}
      <ContactHero />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full text-sm shadow-sm">
          📞 Contact Our Academy
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-[Poppins] font-bold">
          Get in{" "}
          <span className="bg-gradient-to-r from-green-600 via-lime-500 to-green-400 bg-clip-text text-transparent animate-gradient-x">
            Touch
          </span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Have questions about classes, fees, or admissions? Fill the form or
          reach us directly.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-start px-4 md:px-0">
        {/* Coaching Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,128,0,0.15)] bg-white/80 dark:bg-[#181818]/80 backdrop-blur-lg border border-green-100 dark:border-green-900"
        >
          <Image
            src="/images/classroom.jpg"
            alt="Coaching"
            width={600}
            height={500}
            className="w-full h-60 object-cover"
          />
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold font-[Poppins]">
              Our Academy
            </h3>
            <p className="text-muted-foreground">
         For admissions, syllabus details or fee structure. We
              are always happy to assist students & parents.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>Inspired Vision Academy, Naya Toli Simaliya Near ICFAI University Daladali Chowk Ranchi,Jharkhand -835222</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span>+91 8197013384 , +91 6202677217</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                <span>info@ivworlds.com , inspiredvisionacademy@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Mon - Sat : 7:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Box */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 shadow-[0_8px_40px_rgba(128,255,128,0.15)] dark:shadow-[0_8px_40px_rgba(255,255,170,0.05)] bg-white/80 dark:bg-[#1f1f1f]/80 backdrop-blur-lg border border-green-100 dark:border-green-900 hover:scale-[1.01] transition-all duration-300 relative"
        >
          <div className="text-center mb-6">
            <p className="text-green-600 dark:text-green-400 font-semibold mb-2 text-sm">
              🛡️ Your data is safe with us
            </p>
            <h3 className="text-xl font-[Poppins] font-semibold">
              Reach Out Confidentially
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Your privacy is our priority — we never share your information.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your full name"
                          className="focus-visible:ring-green-500/80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="you@example.com"
                          className="focus-visible:ring-green-500/80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="+91 9876543210"
                          className="focus-visible:ring-green-500/80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="subject"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Let us know..."
                          className="focus-visible:ring-green-500/80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice Your Opinion </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Share your thoughts..."
                        className="min-h-[120px] focus-visible:ring-green-500/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white hover:from-green-700 hover:to-lime-600 transition-all shadow-lg shadow-green-500/30"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>

          {/* Success Modal */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-3xl"
            >
              <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-2xl text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-semibold">Message Sent!</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Thanks for reaching out. We’ll get back to you shortly.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
