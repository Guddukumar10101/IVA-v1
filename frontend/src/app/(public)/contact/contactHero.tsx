'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/40 to-background text-foreground font-[Work_Sans] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-green-400/30 dark:bg-green-700/20 rounded-full blur-[150px] top-10 left-10 animate-pulse" />
        <div className="absolute w-72 h-72 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[150px] bottom-10 right-10 animate-pulse" />
      </div>

      {/* Hero Section */}
      <div className="py-16 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-[Poppins] leading-tight"
          >
            Get in{' '}
            <span className="bg-gradient-to-r from-green-600 via-emerald-400 to-green-500 text-transparent bg-clip-text">
              Touch
            </span>
          </motion.h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-lg">
            Whether you're a student, parents, or partner — we are always here to help. Let’s connect today.
          </p>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border bg-card group relative"
        >
          <Image
            src="/images/contactphoto.jpg"
            alt="Contact Coaching"
            width={600}
            height={400}
            className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
        </motion.div>
      </div>

      {/* Contact Options */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-semibold font-[Poppins] mb-4"
          >
            Choose Your Preferred{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-400 text-transparent bg-clip-text">
              Communication
            </span>
          </motion.h2>

          <p className="text-lg mb-12 max-w-2xl mx-auto text-muted-foreground">
            Pick the way that suits you best — email, call, or visit us directly.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="w-7 h-7 text-green-600" />,
                title: 'Email Us',
                description: "Reach out via email and we'll respond within 24 hours.",
                contact: 'info@ivworlds.com , inspiredvisionacademy@gmail.com',
                gradient: 'from-green-100/70 to-emerald-50/70 dark:from-green-900/30 dark:to-emerald-800/30',
              },
              {
                icon: <Phone className="w-7 h-7 text-blue-600" />,
                title: 'Call Us',
                description: 'Speak with our team during business hours (7 AM – 8 PM).',
                contact: '+91 8197013384 , +91 6202677217',
                gradient: 'from-blue-100/70 to-indigo-50/70 dark:from-blue-900/30 dark:to-indigo-800/30',
              },
              {
                icon: <MapPin className="w-7 h-7 text-red-600" />,
                title: 'Visit Us',
                description: 'Drop by our institute for a one-on-one consultation.',
                contact: 'Inspired Vision Academy, Naya Toli Simaliya Near ICFAI University Daladali Chowk Ranchi,Jharkhand -835222',
                gradient: 'from-pink-100/70 to-rose-50/70 dark:from-pink-900/30 dark:to-rose-800/30',
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
                transition={{ type: 'spring', stiffness: 180, damping: 12 }}
                className={`rounded-2xl p-8 backdrop-blur-xl border border-border shadow-lg hover:shadow-2xl bg-gradient-to-br ${card.gradient}`}
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl mb-5 bg-white/80 dark:bg-white/10 shadow-inner">
                  {card.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                <div className="font-medium text-sm px-3 py-2 rounded-md bg-card/60 shadow-md inline-block">
                  {card.contact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 border-t border-border max-w-7xl mx-auto" />
    </section>
  );
}
