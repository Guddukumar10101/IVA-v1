"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const loopTexts = [
  "Compare Grocery Prices Instantly",
  "Save More on Every Order",
  "Track Offers Across Stores",
  "Welcome to Easy Mart",
];

export default function LoginPage() {
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoopIndex((prev) => (prev + 1) % loopTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Column with image + rotating text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col items-center justify-center text-center"
        >
          <img
            src="/hero-grocery.svg"
            alt="Grocery Illustration"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />

          <div className="h-12 mt-6 relative overflow-hidden cursor-pointer">
            <AnimatePresence mode="wait">
              <motion.p
                key={loopIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-lg md:text-xl font-semibold gradient-text max-w-xs"
              >
                {loopTexts[loopIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="shadow-xl border border-border rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[oklch(92%_0.12_140)] to-[oklch(82%_0.11_100)] dark:from-[oklch(35%_0.14_140)] dark:to-[oklch(25%_0.12_100)] transition-all">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center gradient-text">
                Login to Easy Mart
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 border border-[oklch(70%_0.08_120)] dark:border-[oklch(55%_0.08_130)] focus:ring-2 focus:ring-[oklch(70%_0.16_120)] dark:focus:ring-[oklch(60%_0.14_130)] transition"
                  />
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="text-base">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1 border border-[oklch(70%_0.08_120)] dark:border-[oklch(55%_0.08_130)] focus:ring-2 focus:ring-[oklch(70%_0.16_120)] dark:focus:ring-[oklch(60%_0.14_130)] transition"
                  />
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full mt-2 text-black font-semibold bg-gradient-to-r from-[oklch(70%_0.14_140)] to-[oklch(78%_0.12_100)] hover:brightness-110 hover:scale-[1.01] transition shadow-lg cursor-pointer"
                >
                  Login
                </Button>

                {/* Divider */}
                <div className="relative py-2 text-center text-sm text-muted-foreground">
                  <span className="px-2 bg-card">or</span>
                </div>

                {/* Google Login */}
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 hover:shadow-md hover:border-[oklch(60%_0.1_120)] transition text-base border-[oklch(70%_0.1_120)] dark:border-[oklch(45%_0.12_120)] cursor-pointer"
                >
                  <FcGoogle className="w-5 h-5" />
                  Sign in with Google
                </Button>

                {/* Register Link */}
                <div className="text-sm text-center text-muted-foreground pt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary underline hover:brightness-110 transition"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
