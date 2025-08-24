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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { School, Mail, User, Phone, Home } from "lucide-react"; // icons

// Rotating slogans
const loopTexts = [
  "Crack Defence Exams with IVA Coaching",
  "Learn from Experienced Faculty",
  "Join the Best Coaching for NDA, CDS & AFCAT",
  "Your Journey to Defence Starts Here",
];

// Course data with fees per duration
const courses = [
  { id: "class1", name: "Class 1", fees: { monthly: 1500, quarterly: 4000, halfyearly: 7500, yearly: 14000 } },
  { id: "class2", name: "Class 2", fees: { monthly: 1600, quarterly: 4200, halfyearly: 7800, yearly: 14500 } },
  { id: "class3", name: "Class 3", fees: { monthly: 1700, quarterly: 4500, halfyearly: 8200, yearly: 15000 } },
  { id: "class4", name: "Class 4", fees: { monthly: 1800, quarterly: 4800, halfyearly: 8600, yearly: 15500 } },
  { id: "class5", name: "Class 5", fees: { monthly: 2000, quarterly: 5200, halfyearly: 9000, yearly: 16000 } },
  { id: "class6", name: "Class 6", fees: { monthly: 2200, quarterly: 5800, halfyearly: 10200, yearly: 18000 } },
  { id: "class7", name: "Class 7", fees: { monthly: 2500, quarterly: 6500, halfyearly: 11500, yearly: 20000 } },
  { id: "class8", name: "Class 8", fees: { monthly: 2800, quarterly: 7200, halfyearly: 12800, yearly: 22000 } },
  { id: "class9", name: "Class 9", fees: { monthly: 3000, quarterly: 8000, halfyearly: 14500, yearly: 26000 } },
  { id: "class10", name: "Class 10", fees: { monthly: 3200, quarterly: 8500, halfyearly: 15500, yearly: 28000 } },
  { id: "ind", name: "Individual Coaching", fees: { monthly: 4000, quarterly: 11000, halfyearly: 20000, yearly: 38000 } },
  { id: "sainik", name: "Sainik School Prep", fees: { monthly: 3500, quarterly: 10000, halfyearly: 18500, yearly: 35000 } },
  { id: "comp", name: "Computer Classes", fees: { monthly: 2500, quarterly: 7000, halfyearly: 13000, yearly: 24000 } },
];

export default function EnrollPage() {
  const [loopIndex, setLoopIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>("monthly");
  const [fee, setFee] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoopIndex((prev) => (prev + 1) % loopTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedClass) {
      const selectedCourse = courses.find((c) => c.id === selectedClass);
      if (selectedCourse) {
        setFee(selectedCourse.fees[selectedDuration as keyof typeof selectedCourse.fees]);
      }
    }
  }, [selectedClass, selectedDuration]);

  const getMonths = (duration: string) => {
    switch (duration) {
      case "monthly": return 1;
      case "quarterly": return 3;
      case "halfyearly": return 6;
      case "yearly": return 12;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Illustration */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col items-center  justify-center text-center"
        >
          <img
            src="/student-enroll.svg"
            alt="Enroll Illustration"
            className="w-full max-w-md rounded-2xl shadow-2xl"
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

        {/* Right Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="shadow-2xl border rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 transition-all">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Enroll Now
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form className="space-y-6">
                {/* Full Name */}
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input id="name" placeholder="Enter your full name" className="pl-10" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input id="email" type="email" placeholder="you@example.com" className="pl-10" />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <Label htmlFor="mobile">Mobile</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input id="mobile" type="tel" placeholder="+91 9876543210" className="pl-10" />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <Home className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input id="address" placeholder="Enter your address" className="pl-10" />
                  </div>
                </div>

                {/* School/College */}
                <div>
                  <Label htmlFor="school">School / College Name</Label>
                  <div className="relative">
                    <School className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input id="school" placeholder="Enter your school/college" className="pl-10" />
                  </div>
                </div>


{/* Board Select */}
<div>
  <Label>Select Board</Label>
  <Select>
    <SelectTrigger className="mt-1 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 shadow-sm">
      <SelectValue placeholder="Choose your board" />
    </SelectTrigger>
    <SelectContent
      className="z-[9999] shadow-2xl rounded-xl border bg-white dark:bg-gray-800"
      side="bottom"
      align="start"
    >
      <SelectItem value="cbse" className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700">
        CBSE
      </SelectItem>
      <SelectItem value="jac" className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700">
        JAC
      </SelectItem>
      <SelectItem value="icse" className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700">
        ICSE
      </SelectItem>
      <SelectItem value="other" className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700">
        Other
      </SelectItem>
    </SelectContent>
  </Select>
</div>


                {/* Class Select */}
                <div>
                  <Label>Select Class</Label>
                  <Select onValueChange={setSelectedClass}>
                    <SelectTrigger className="mt-1 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 shadow-sm">
                      <SelectValue placeholder="Choose a class" />
                    </SelectTrigger>
                    <SelectContent
                      className="z-[9999] shadow-2xl rounded-xl border bg-white dark:bg-gray-800"
                      side="bottom"
                      align="start"
                    >
                      {courses.map((course) => (
                        <SelectItem
                          key={course.id}
                          value={course.id}
                          className="cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-700"
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Select */}
                <div>
                  <Label>Select Duration</Label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="mt-1 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 shadow-sm">
                      <SelectValue placeholder="Choose duration" />
                    </SelectTrigger>
                    <SelectContent
                      className="z-[9999] shadow-2xl rounded-xl border bg-white dark:bg-gray-800"
                      side="bottom"
                      align="start"
                    >
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="halfyearly">Half Yearly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Show Fee */}
                {fee && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 rounded-xl text-center font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-800 shadow-inner"
                  >
                    {courses.find((c) => c.id === selectedClass)?.name} ({selectedDuration}) Fee: ₹
                    {fee.toLocaleString()}
                    <div className="text-sm text-muted-foreground mt-1">
                      (₹{Math.round(fee / getMonths(selectedDuration)).toLocaleString()} per month)
                    </div>
                  </motion.div>
                )}

                <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition">
                  Confirm Admission
                </Button>

                <div className="text-sm text-center text-muted-foreground pt-4">
                  Already enrolled?{" "}
                  <Link href="/login" className="text-primary underline">
                    Login here
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
