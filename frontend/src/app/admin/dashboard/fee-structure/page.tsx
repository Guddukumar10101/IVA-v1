"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import Select from "react-select";
import { motion } from "framer-motion";
import { CSVLink } from "react-csv";

interface FeeStructure {
  id?: number;
  class: string;
  board: string;
  modeOfFee: "monthly" | "quarterly" | "halfyearly" | "yearly";
  amount: number;
  session: string;
}

const boardOptions = [
  { value: "CBSE", label: "CBSE" },
  { value: "ICSE", label: "ICSE" },
  { value: "STATE", label: "STATE" },
  { value: "OTHER", label: "OTHER" },
];

const modeOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "halfyearly", label: "Half Yearly" },
  { value: "yearly", label: "Yearly" },
];

const getSessionOptions = () => {
  const currentYear = new Date().getFullYear();
  const sessions = [];
  for (let i = 0; i < 5; i++) {
    const start = currentYear + i;
    const end = start + 1;
    sessions.push({ value: `${start}-${end}`, label: `${start}-${end}` });
  }
  return sessions;
};

export default function FeeStructurePage() {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [editing, setEditing] = useState<FeeStructure | null>(null);
  const [formData, setFormData] = useState<FeeStructure>({
    class: "",
    board: "OTHER",
    modeOfFee: "monthly",
    amount: 0,
    session: "",
  });

  const [filterClass, setFilterClass] = useState("");
  const [filterMode, setFilterMode] = useState<string | null>(null);
  const [filterSession, setFilterSession] = useState<string | null>(null);

  // Detect dark mode
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const fetchFeeStructures = async () => {
    try {
      const res = await fetch("https://ivworlds.com/backend/controllers/FeeStructureController.php");
      const data = await res.json();
      if (data.status === "success") setFeeStructures(data.data || []);
      else toast.error(data.message);
    } catch {
      toast.error("Server error fetching fee structures");
    }
  };

  useEffect(() => { fetchFeeStructures(); }, []);

  const handleChange = (key: keyof FeeStructure, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.class || !formData.amount || !formData.session) {
      toast.error("Fill all required fields"); return;
    }
    try {
      const method = editing ? "PUT" : "POST";
      const res = await fetch("http://ivworlds.com/backend/controllers/FeeStructureController.php", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing ? { ...formData, id: editing.id } : formData),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success(data.message);
        setFormData({ class: "", board: "OTHER", modeOfFee: "monthly", amount: 0, session: "" });
        setEditing(null);
        fetchFeeStructures();
      } else toast.error(data.message);
    } catch { toast.error("Server error"); }
  };

  const handleEdit = (fs: FeeStructure) => { setEditing(fs); setFormData(fs); }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete?")) return;
    try {
      const res = await fetch("http://ivworlds.com/backend/controllers/FeeStructureController.php", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.status === "success") { toast.success(data.message); fetchFeeStructures(); }
      else toast.error(data.message);
    } catch { toast.error("Server error"); }
  };

  const filteredData = feeStructures.filter(fs =>
    fs.class.toLowerCase().includes(filterClass.toLowerCase()) &&
    (!filterMode || fs.modeOfFee === filterMode) &&
    (!filterSession || fs.session === filterSession)
  );

  const csvHeaders = [
    { label: "Class", key: "class" },
    { label: "Board", key: "board" },
    { label: "Mode", key: "modeOfFee" },
    { label: "Amount", key: "amount" },
    { label: "Session", key: "session" },
  ];

  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: isDark ? "#1f2937" : "white",
      borderColor: state.isFocused ? "#6366F1" : isDark ? "#374151" : "#d1d5db",
      boxShadow: state.isFocused ? `0 0 0 1px #6366F1` : "none",
      color: isDark ? "#f9fafb" : "#111827",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: isDark ? "#1f2937" : "white",
      zIndex: 9999,
    }),
    menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#6366F1" : state.isFocused ? (isDark ? "#374151" : "#E0E7FF") : "inherit",
      color: state.isSelected ? "#fff" : isDark ? "#f9fafb" : "#111827",
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-6">

        {/* Form Card */}
        <Card className="shadow-2xl rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {editing ? "Edit Fee Structure" : "Add Fee Structure"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div><Label>Class</Label><Input value={formData.class} onChange={e => handleChange("class", e.target.value)} placeholder="10th" /></div>
            <div><Label>Board</Label>
              <Select
                options={boardOptions}
                value={boardOptions.find(b => b.value === formData.board)}
                onChange={v => handleChange("board", v?.value)}
                menuPortalTarget={document.body}
                styles={selectStyles}
              />
            </div>
            <div><Label>Mode</Label>
              <Select
                options={modeOptions}
                value={modeOptions.find(m => m.value === formData.modeOfFee)}
                onChange={v => handleChange("modeOfFee", v?.value)}
                menuPortalTarget={document.body}
                styles={selectStyles}
              />
            </div>
            <div><Label>Amount</Label><Input type="number" value={formData.amount} onChange={e => handleChange("amount", parseFloat(e.target.value))} placeholder="1000" /></div>
            <div><Label>Session</Label>
              <Select
                options={getSessionOptions()}
                value={getSessionOptions().find(s => s.value === formData.session)}
                onChange={v => handleChange("session", v?.value)}
                menuPortalTarget={document.body}
                styles={selectStyles}
              />
            </div>
            <div>
              <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                {editing ? <Edit size={18} /> : <PlusCircle size={18} />} {editing ? "Update" : "Add"}
              </Button>
            </div>
          </CardContent>
        </Card>

     {/* Filter + Export */}
<Card className="shadow-xl rounded-2xl p-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

    {/* Class Dropdown */}
    <div>
      <Label>Class</Label>
      <Select
        isClearable
        placeholder="All Classes"
        options={[...new Set(feeStructures.map(fs => fs.class))].map(cls => ({
          value: cls,
          label: cls,
        }))}
        value={filterClass ? { value: filterClass, label: filterClass } : null}
        onChange={v => setFilterClass(v?.value || "")}
        menuPortalTarget={document.body}
        styles={selectStyles}
      />
    </div>

    {/* Mode Dropdown */}
    <div>
      <Label>Mode</Label>
      <Select
        options={modeOptions}
        isClearable
        placeholder="All Modes"
        value={modeOptions.find(m => m.value === filterMode) || null}
        onChange={v => setFilterMode(v?.value || null)}
        menuPortalTarget={document.body}
        styles={selectStyles}
      />
    </div>

    {/* Session Dropdown */}
    <div>
      <Label>Session</Label>
      <Select
        options={getSessionOptions()}
        isClearable
        placeholder="All Sessions"
        value={getSessionOptions().find(s => s.value === filterSession) || null}
        onChange={v => setFilterSession(v?.value || null)}
        menuPortalTarget={document.body}
        styles={selectStyles}
      />
    </div>

  </div>

  {/* Reset + Export */}
  <div className="flex gap-2 mt-4 md:mt-0">
    <Button
      onClick={() => {
        setFilterClass("");
        setFilterMode(null);
        setFilterSession(null);
      }}
      className="bg-gray-400 text-white hover:bg-gray-500"
    >
      Reset Filters
    </Button>
    <CSVLink data={filteredData} headers={csvHeaders} filename="fee-structures.csv">
      <Button className="bg-green-500 hover:bg-green-600 text-white">
        Export CSV
      </Button>
    </CSVLink>
  </div>
</Card>

        {/* Table Card */}
        <Card className="shadow-2xl rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 p-4 md:p-6 overflow-x-auto">
          <CardHeader><CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Fee Structures</CardTitle></CardHeader>
          <CardContent>
            <table className="w-full table-auto border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-blue-100 dark:bg-gray-700">
                  <th className="px-4 py-2 border">Class</th>
                  <th className="px-4 py-2 border">Board</th>
                  <th className="px-4 py-2 border">Mode</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Session</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length ? filteredData.map(fs => (
                  <tr key={fs.id} className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-2 border">{fs.class}</td>
                    <td className="px-4 py-2 border">{fs.board}</td>
                    <td className="px-4 py-2 border">{fs.modeOfFee}</td>
                    <td className="px-4 py-2 border">₹{fs.amount.toLocaleString()}</td>
                    <td className="px-4 py-2 border">{fs.session}</td>
                    <td className="px-4 py-2 border flex gap-2 flex-wrap">
                      <Button size="sm" onClick={() => handleEdit(fs)} className="bg-yellow-500 hover:bg-yellow-600"><Edit size={16} /></Button>
                      <Button size="sm" onClick={() => handleDelete(fs.id!)} className="bg-red-500 hover:bg-red-600"><Trash2 size={16} /></Button>
                    </td>
                  </tr>
                )) : <tr><td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-300">No fee structures found</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>

      </motion.div>
    </div>
  );
}
