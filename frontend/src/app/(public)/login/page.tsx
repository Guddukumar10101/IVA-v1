"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const loopTexts = [
  "Crack Defence Exams with IVA Coaching",
  "Learn from Experienced Faculty",
  "Join the Best Coaching for CDS, NDA & AFCAT",
  "Your Journey to Defence Starts Here",
];

export default function LoginPage() {
  const [loopIndex, setLoopIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoopIndex((prev) => (prev + 1) % loopTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://ivworlds.com/backend/controllers/AdminLoginController.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (data.status === "success") {
        // ✅ Save admin data and JWT token
        localStorage.setItem("admin", JSON.stringify(data.admin));
        localStorage.setItem("token", data.token);

        // ✅ Redirect to dashboard
        router.push("/admin/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed, check console");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col items-center justify-center text-center"
        >
          <img
            src="/student-login.svg"
            alt="Student Illustration"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
          <div className="h-12 mt-6 pb-[90px] relative overflow-hidden cursor-pointer">
            <AnimatePresence mode="wait">
              <motion.p
                key={loopIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent max-w-xs"
              >
                {loopTexts[loopIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Section (Form) */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="shadow-xl border border-border rounded-2xl backdrop-blur-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-all">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleLogin}>
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div>
                  <Label htmlFor="email" className="text-base">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 border focus:ring-2 focus:ring-blue-500 transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-base">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="mt-1 border focus:ring-2 focus:ring-blue-500 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2 text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] transition shadow-lg"
                >
                  Login
                </Button>

                <div className="relative py-2 text-center text-sm text-muted-foreground">
                  <span className="px-2 bg-card">or</span>
                </div>

                <div className="text-sm text-center text-muted-foreground pt-2">
                  New to Inspired Vision Academy?{" "}
                  <Link
                    href="/enroll"
                    className="text-primary underline hover:brightness-110 transition"
                  >
                    Enroll Now
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
