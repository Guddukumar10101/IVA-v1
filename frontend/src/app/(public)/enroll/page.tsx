"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { School, Mail, User, Phone, Home } from "lucide-react";

type DBRow = {
  id?: number | string;
  class?: string;
  class_name?: string;
  className?: string;
  board?: string;
  modeOfFee?: "monthly" | "quarterly" | "halfyearly" | "yearly" | string;
  mode_of_fee?: string;
  mode?: string;
  amount?: number | string;
  session?: string;
};

type FeeRow = {
  id?: number | string;
  className: string;
  board: string; // lowercased
  modeOfFee: "monthly" | "quarterly" | "halfyearly" | "yearly" | string;
  amount: number;
  session: string;
};

const loopTexts = [
  "Crack Defence Exams with IVA Coaching",
  "Learn from Experienced Faculty",
  "Join the Best Coaching for Sainik School Navodya, ",
  "Your Journey to Defence Starts Here",
];

// helper
const uniq = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)));

export default function EnrollPage() {
  const router = useRouter();

  // UI
  const [loopIndex, setLoopIndex] = useState(0);

  // File
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Selections
  const [session, setSession] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<string>("cbse"); // lowercase internal
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedModeOfFee, setSelectedModeOfFee] = useState<string | null>(null);
  const [paymentMode, setPaymentMode] = useState<string>("offline");

  // Data
  const [feeStructures, setFeeStructures] = useState<FeeRow[]>([]);
  const [fee, setFee] = useState<number | null>(null);

  // Rotate slogans
  useEffect(() => {
    const interval = setInterval(
      () => setLoopIndex((prev) => (prev + 1) % loopTexts.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  // Fetch & normalize DB data
  useEffect(() => {
    const fetchFeeStructures = async () => {
      try {
        const res = await fetch(
          "https://ivworlds.com/backend/controllers/FeeStructureController.php"
        );
        const result = await res.json();

        if (result?.status === "success" && Array.isArray(result.data)) {
          const normalized: FeeRow[] = result.data.map((r: DBRow, idx: number) => {
            const cls =
              (r.class ?? r.class_name ?? r.className ?? "").toString().trim();
            const board = (r.board ?? "").toString().trim().toLowerCase(); // normalize
            const mode =
              (r.modeOfFee ?? r.mode_of_fee ?? r.mode ?? "").toString().trim();
            const session = (r.session ?? "").toString().trim();
            const amountNum = Number(r.amount ?? 0);

            return {
              id: r.id ?? idx,
              className: cls,
              board,
              modeOfFee: mode,
              amount: isNaN(amountNum) ? 0 : amountNum,
              session,
            };
          });

          setFeeStructures(normalized);
        } else {
          toast.error("Failed to fetch fee structures");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while fetching fee structures!");
      }
    };

    fetchFeeStructures();
  }, []);

  // Build dropdown options from DB (pure, memoized)
  const sessionOptions = useMemo(
    () =>
      uniq(feeStructures.map((f) => f.session)).map((s, i) => ({
        id: `session-${i}-${s}`,
        value: s,
        label: s,
      })),
    [feeStructures]
  );

  const classOptions = useMemo(() => {
    // Filter classes by selected board and optional session
    const filtered = feeStructures.filter(
      (f) =>
        f.board === selectedBoard &&
        (!session || f.session === session)
    );
    return uniq(filtered.map((f) => f.className)).map((c, i) => ({
      id: `class-${i}-${c}`,
      value: c,
      label: c,
    }));
  }, [feeStructures, selectedBoard, session]);

  const modeOptions = useMemo(() => {
    // Modes available for the chosen class + board + session
    if (!selectedClass) return [];
    const filtered = feeStructures.filter(
      (f) =>
        f.board === selectedBoard &&
        f.className === selectedClass &&
        (!!session ? f.session === session : true)
    );
    return uniq(filtered.map((f) => f.modeOfFee)).map((m, i) => ({
      id: `mode-${i}-${m}`,
      value: m,
      label: m,
    }));
  }, [feeStructures, selectedBoard, selectedClass, session]);

  // Reset dependent selections when parent changes
  useEffect(() => {
    // when session changes, keep class if still valid, else clear class & mode
    if (selectedClass) {
      const stillValid = classOptions.some((o) => o.value === selectedClass);
      if (!stillValid) {
        setSelectedClass(null);
        setSelectedModeOfFee(null);
        setFee(null);
      } else {
        // class is fine; ensure mode still valid
        if (selectedModeOfFee) {
          const modeValid = modeOptions.some((o) => o.value === selectedModeOfFee);
          if (!modeValid) {
            setSelectedModeOfFee(null);
            setFee(null);
          }
        }
      }
    } else {
      setSelectedModeOfFee(null);
      setFee(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, classOptions.length, modeOptions.length]);

  useEffect(() => {
    // when board changes, clear class/mode if no longer valid
    if (selectedClass) {
      const stillValidClass = classOptions.some((o) => o.value === selectedClass);
      if (!stillValidClass) {
        setSelectedClass(null);
        setSelectedModeOfFee(null);
        setFee(null);
      } else if (selectedModeOfFee) {
        const stillValidMode = modeOptions.some(
          (o) => o.value === selectedModeOfFee
        );
        if (!stillValidMode) {
          setSelectedModeOfFee(null);
          setFee(null);
        }
      }
    } else {
      setSelectedModeOfFee(null);
      setFee(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBoard, classOptions.length, modeOptions.length]);

  // Auto-select default mode = monthly if available
  useEffect(() => {
    if (selectedClass && session) {
      const monthly = feeStructures.find(
        (f) =>
          f.board === selectedBoard &&
          f.className === selectedClass &&
          f.session === session &&
          f.modeOfFee === "monthly"
      );
      if (monthly) {
        setSelectedModeOfFee("monthly");
        setFee(Number(monthly.amount));
      } else if (selectedModeOfFee) {
        // if monthly not present but some other mode selected and valid, set fee
        const match = feeStructures.find(
          (f) =>
            f.board === selectedBoard &&
            f.className === selectedClass &&
            f.session === session &&
            f.modeOfFee === selectedModeOfFee
        );
        setFee(match ? Number(match.amount) : null);
      } else {
        setFee(null);
      }
    } else {
      setFee(null);
    }
  }, [selectedClass, session, selectedBoard, feeStructures]); // intentionally not tracking selectedModeOfFee

  // Update fee when mode changes
  useEffect(() => {
    if (selectedClass && selectedModeOfFee && session) {
      const match = feeStructures.find(
        (f) =>
          f.board === selectedBoard &&
          f.className === selectedClass &&
          f.modeOfFee === selectedModeOfFee &&
          f.session === session
      );
      setFee(match ? Number(match.amount) : null);
    } else {
      setFee(null);
    }
  }, [selectedClass, selectedModeOfFee, session, selectedBoard, feeStructures]);

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string) || "";
    const fatherName = (formData.get("fatherName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const mobile = (formData.get("mobile") as string) || "";
    const schoolName = (formData.get("school") as string) || "";
    const address = (formData.get("address") as string) || "";

    if (
      !name ||
      !fatherName ||
      !email ||
      !mobile ||
      !selectedClass ||
      !selectedModeOfFee ||
      !photo ||
      !session
    ) {
      toast.error("Please fill all required fields and upload photo!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("name", name);
    uploadData.append("fatherName", fatherName);
    uploadData.append("email", email);
    uploadData.append("mobile", mobile);
    uploadData.append("schoolName", schoolName);
    uploadData.append("board", selectedBoard); // already lowercase
    uploadData.append("class", selectedClass);
    uploadData.append("modeOfFee", selectedModeOfFee);
    uploadData.append("session", session);
    uploadData.append("address", address);
    uploadData.append("photo", photo);
    uploadData.append("paymentMode", paymentMode);

    try {
      const res = await fetch(
        "https://ivworlds.com/backend/controllers/StudentController.php",
        { method: "POST", body: uploadData }
      );
      const result = await res.json();

      if (result?.status === "success") {
        toast.success("Student enrolled successfully!");
        form.reset();
        setPhoto(null);
        setPhotoPreview(null);
        setSession(null);
        setSelectedClass(null);
        setSelectedBoard("cbse");
        setSelectedModeOfFee(null);
        setFee(null);
        setPaymentMode("offline");
        setTimeout(() => router.push("/thank-you"), 800);
      } else {
        toast.error(result?.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error, try again later!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 py-12">
      <motion.div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Illustration */}
        <motion.div className="hidden md:flex flex-col items-center justify-center text-center">
          <motion.img
            src="/student-enroll.svg"
            alt="Enroll Illustration"
            className="w-full max-w-md rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
          <div className="h-12 mt-6 pb-[90px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={loopIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                {loopTexts[loopIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="shadow-2xl border rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 transition-all">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Enroll Now
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput id="name" label="Full Name" icon={<User />} placeholder="Enter your full name" />
                <FormInput id="fatherName" label="Father's Name" icon={<User />} placeholder="Enter your father's name" />
                <FormInput id="email" label="Email" type="email" icon={<Mail />} placeholder="you@example.com" />
                <FormInput id="mobile" label="Mobile" type="tel" icon={<Phone />} placeholder="9876543210" />
                <FormInput id="address" label="Address" icon={<Home />} placeholder="Enter your address" />
                <FormInput id="school" label="School / College Name" icon={<School />} placeholder="Enter your school/college" />

                {/* Dropdowns driven by DB */}
                <SelectField
                  label="Select Session"
                  value={session ?? undefined}
                  onChange={(v: string) => setSession(v)}
                  options={sessionOptions}
                />

                <SelectField
                  label="Select Board"
                  value={selectedBoard}
                  onChange={(v: string) => setSelectedBoard(v)}
                  options={[
                    { id: "board-cbse", value: "cbse", label: "CBSE" },
                    { id: "board-jac", value: "jac", label: "JAC" },
                    { id: "board-icse", value: "icse", label: "ICSE" },
                    { id: "board-other", value: "other", label: "Other" },
                  ]}
                />

                <SelectField
                  label="Select Class"
                  value={selectedClass ?? undefined}
                  onChange={(v: string) => setSelectedClass(v)}
                  options={classOptions}
                />

                <SelectField
                  label="Mode of Fee"
                  value={selectedModeOfFee ?? undefined}
                  onChange={(v: string) => setSelectedModeOfFee(v)}
                  options={modeOptions}
                />

                <SelectField
                  label="Payment Mode"
                  value={paymentMode}
                  onChange={(v: string) => setPaymentMode(v)}
                  options={[{ id: "payment-offline", value: "offline", label: "Offline" }]}
                />

                {/* Fee Preview */}
                {fee !== null && selectedClass && selectedModeOfFee && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-2xl text-center font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 shadow-lg"
                  >
                    <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                      {selectedClass} ({selectedModeOfFee}) — ₹{fee.toLocaleString()}
                    </p>
                  </motion.div>
                )}

                {/* Photo Upload */}
                <div>
                  <Label htmlFor="photo">Upload Photo</Label>
                  <div className="flex items-center gap-4 mt-2">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border shadow" />
                    ) : (
                      <div className="w-20 h-20 rounded-full border flex items-center justify-center text-gray-400">No Photo</div>
                    )}
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPhoto(file);
                          setPhotoPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform">
                  Confirm Admission
                </Button>

                <div className="text-sm text-center text-muted-foreground pt-4">
                  Already enrolled? <Link href="/login" className="text-primary underline">Login here</Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

/* ---------- Helper Components ---------- */
function FormInput({
  id,
  label,
  icon,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <div className="absolute left-3 top-2.5 h-5 w-5 text-gray-400">{icon}</div>
        <Input id={id} name={id} type={type} placeholder={placeholder} className="pl-10" />
      </div>
    </motion.div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  options: { id: string; value: string; label: string }[];
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-1 border rounded-lg px-3 py-2 bg-white dark:bg-gray-900 shadow-sm">
          <SelectValue placeholder={`Choose ${label}`} />
        </SelectTrigger>
        <SelectContent className="z-[99999] shadow-2xl rounded-xl border bg-white dark:bg-gray-900">
          {options.map((opt, index) => (
            <SelectItem key={`${opt.id}`} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
          {options.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">No options available</div>
          )}
        </SelectContent>
      </Select>
    </motion.div>
  );
}
