"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Loader2 } from "lucide-react";

// API URLs
const STUDENTS_API = "https://ivworlds.com/backend/controllers/StudentController.php";
const FEES_API = "https://ivworlds.com/backend/controllers/StudentFeeController.php";
const FEE_STRUCTURE_API = "https://ivworlds.com/backend/controllers/FeeStructureController.php";

type Student = {
  id: number;
  name: string;
  fatherName?: string;
  mobile?: string;
  email?: string;
  class?: string;
  session?: string;
};

type FeeRecord = {
  id: number;
  student_id: number;
  session: string;
  month: string;
  total_fee: number | string;
  paid_amount: number | string;
  due_amount: number | string;
  payment_mode: string;
  payment_type: string;
  created_at?: string;
  updated_at?: string;
};

type FeeStructure = {
  id: number;
  class_name: string;
  session: string;
  amount_monthly: number;
  amount_quarterly: number;
  amount_halfyearly: number;
  amount_yearly: number;
};

export default function StudentFeeAdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentLoading, setStudentLoading] = useState(false);

  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [feesLoading, setFeesLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeRecord | null>(null);

  const [feeStructure, setFeeStructure] = useState<FeeStructure[]>([]);

  const [addForm, setAddForm] = useState({
    month: "",
    session: "",
    total_fee: 0,
    paid_amount: 0,
    payment_mode: "monthly",
    payment_type: "offline",
  });

  const [editForm, setEditForm] = useState({
    total_fee: 0,
    paid_amount: 0,
  });

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [selectedMonth, setSelectedMonth] = useState("");

  // Fetch students & fee structure
  useEffect(() => {
    fetchStudents();
    fetchFeeStructure();
  }, []);

  async function fetchStudents() {
    setStudentLoading(true);
    try {
      const res = await fetch(STUDENTS_API);
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : data.data || []);
    } catch(err) { console.error(err); toast.error("Failed to fetch students"); }
    finally { setStudentLoading(false); }
  }

  async function fetchFeeStructure() {
    try {
      const res = await fetch(FEE_STRUCTURE_API);
      const data = await res.json();
      setFeeStructure(data.data || []);
    } catch(err) { console.error(err); }
  }

  // Fetch fees when student selected
  useEffect(() => {
    if(selectedStudent) fetchFeeRecords(selectedStudent.id);
    else setFees([]);
  }, [selectedStudent]);

  async function fetchFeeRecords(student_id: number) {
    setFeesLoading(true);
    try {
      const res = await fetch(`${FEES_API}?student_id=${student_id}`);
      const data = await res.json();
      if(data.status==="success"){
        const recs = (data.data || []).map((f: FeeRecord) => ({
          ...f,
          total_fee: Number(f.total_fee || 0),
          paid_amount: Number(f.paid_amount || 0),
          due_amount: Number(f.due_amount || 0),
        }));
        setFees(recs);
      } else setFees([]);
    } catch(err) { console.error(err); }
    finally { setFeesLoading(false); }
  }

  // Auto total fee based on session/class/payment_mode
  useEffect(() => {
    if(!selectedStudent || !addForm.session) return;
    const cls = selectedStudent.class;
    const fs = feeStructure.find(f=> f.class_name===cls && f.session===addForm.session);
    if(!fs) return;
    switch(addForm.payment_mode){
      case "monthly": setAddForm(p=>({...p,total_fee: fs.amount_monthly})); break;
      case "quarterly": setAddForm(p=>({...p,total_fee: fs.amount_quarterly})); break;
      case "halfyearly": setAddForm(p=>({...p,total_fee: fs.amount_halfyearly})); break;
      case "yearly": setAddForm(p=>({...p,total_fee: fs.amount_yearly})); break;
    }
  }, [addForm.session, addForm.payment_mode, selectedStudent, feeStructure]);

  const filteredStudents = useMemo(() => {
    if(!studentSearch) return students;
    const q = studentSearch.toLowerCase();
    return students.filter(s => [s.name,s.class,s.fatherName,s.mobile,s.email].join(" ").toLowerCase().includes(q));
  }, [students, studentSearch]);

  // Add Fee
  async function handleAddFeeSubmit(e?: React.FormEvent){
    if(e) e.preventDefault();
    if(!selectedStudent){ toast.error("Select student"); return; }

    const duplicate = fees.find(f=>f.month===addForm.month && f.session===addForm.session);
    if(duplicate){ toast.error("Fee for this month & session already exists"); return; }

    const payload = {
      student_id: selectedStudent.id,
      session: addForm.session || selectedStudent.session,
      month: addForm.month,
      total_fee: Number(addForm.total_fee),
      paid_amount: Number(addForm.paid_amount),
      payment_mode: addForm.payment_mode,
      payment_type: addForm.payment_type
    };
    try {
      const res = await fetch(FEES_API, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)});
      const data = await res.json();
      if(data.status==="success"){
        toast.success("Fee added");
        setAddOpen(false);
        setAddForm({month:"",session:"",total_fee:0,paid_amount:0,payment_mode:"monthly",payment_type:"offline"});
        fetchFeeRecords(selectedStudent.id);
      } else toast.error(data.message||"Failed");
    } catch(err){ console.error(err); toast.error("Server error"); }
  }

  // Edit Fee
  function openEditModal(f: FeeRecord){
    setEditingFee(f);
    setEditForm({ total_fee: Number(f.total_fee), paid_amount: Number(f.paid_amount) });
    setEditOpen(true);
  }

  async function handleEditSubmit(e?: React.FormEvent){
    if(e) e.preventDefault();
    if(!editingFee) return;
    const payload = { id:editingFee.id, total_fee:editForm.total_fee, paid_amount:editForm.paid_amount };
    try {
      const res = await fetch(FEES_API, { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)});
      const data = await res.json();
      if(data.status==="success"){ toast.success("Updated"); setEditOpen(false); fetchFeeRecords(selectedStudent!.id); }
      else toast.error(data.message||"Failed");
    } catch(err){ console.error(err); toast.error("Server error"); }
  }

  async function handleDeleteFee(id:number){
    if(!confirm("Delete this fee record?")) return;
    try {
      const res = await fetch(FEES_API,{ method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id})});
      const data = await res.json();
      if(data.status==="success"){ toast.success("Deleted"); fetchFeeRecords(selectedStudent!.id); }
      else toast.error(data.message||"Failed");
    } catch(err){ console.error(err); toast.error("Server error"); }
  }

  // 💰 Compute monthly summary
  const filteredFees = useMemo(() => {
    if (!selectedMonth) return fees;
    return fees.filter(f => f.month === selectedMonth);
  }, [fees, selectedMonth]);

  const totalPaid = useMemo(() => {
    return filteredFees.reduce((sum, f) => sum + Number(f.paid_amount || 0), 0);
  }, [filteredFees]);

  const totalDue = useMemo(() => {
    return filteredFees.reduce((sum, f) => sum + Number(f.due_amount || 0), 0);
  }, [filteredFees]);

  return (
    <div className="min-h-screen p-6 bg-slate-50 dark:bg-slate-900">
      <ToastContainer position="top-right" autoClose={2500}/>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Student Fee Management</h1>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400"/>
              <input className="pl-10 w-72 border rounded px-3 py-2 dark:bg-slate-800 dark:text-white" placeholder="Search student..." value={studentSearch} onChange={e=>setStudentSearch(e.target.value)}/>
            </div>
            <Button onClick={()=>setAddOpen(true)}><Plus className="mr-2"/>Add Payment</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Student List */}
          <Card>
            <CardHeader><CardTitle>Students</CardTitle></CardHeader>
            <CardContent className="max-h-[60vh] overflow-auto p-2">
              {studentLoading ? <Loader2 className="animate-spin mx-auto"/> :
                filteredStudents.map(s=>(
                  <button key={s.id} onClick={()=>setSelectedStudent(s)} className={`w-full text-left p-3 rounded-lg mb-1 ${selectedStudent?.id===s.id?"bg-indigo-600 text-white":"bg-white dark:bg-slate-800 dark:text-white"}`}>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-sm">{s.class} • {s.session}</div>
                    <div className="text-xs">Father: {s.fatherName}</div>
                  </button>
                ))
              }
            </CardContent>
          </Card>

          {/* Right Panel */}
          <div className="col-span-1 lg:col-span-3 space-y-4">
            {selectedStudent && 
            <Card>
              <CardHeader><CardTitle>Student Details</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h2 className="font-bold text-lg">{selectedStudent.name}</h2>
                    <div>Father: {selectedStudent.fatherName}</div>
                    <div>Class: {selectedStudent.class} • Session: {selectedStudent.session}</div>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <Button onClick={()=>fetchFeeRecords(selectedStudent.id)}>Refresh</Button>
                    <Button variant="outline" onClick={()=>setAddOpen(true)}>Add Payment</Button>
                  </div>
                </div>
              </CardContent>
            </Card>}

            {/* 📊 Fee Table + Summary */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <CardTitle>Fee History</CardTitle>

                  {/* 🗓 Month Selector */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Select Month:</label>
                    <select
                      className="border rounded px-2 py-1 dark:bg-slate-800 dark:text-white"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">All Months</option>
                      {months.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>

              {/* 💰 Summary Section */}
              <div className="mx-6 mb-4 bg-green-100 dark:bg-green-900 p-3 rounded-lg flex justify-between items-center">
                <div className="font-semibold text-slate-800 dark:text-slate-100">
                  {selectedMonth ? `Summary for ${selectedMonth}` : "Summary for All Months"}
                </div>
                <div className="flex gap-6">
                  <div className="text-green-700 dark:text-green-300 font-medium">Total Paid: ₹{totalPaid.toFixed(2)}</div>
                  <div className="text-red-600 dark:text-red-400 font-medium">Total Due: ₹{totalDue.toFixed(2)}</div>
                </div>
              </div>

              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Session</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Paid</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feesLoading ? (
                      <TableRow><TableCell colSpan={9} className="text-center py-8"><Loader2 className="animate-spin mx-auto"/></TableCell></TableRow>
                    ) : filteredFees.length === 0 ? (
                      <TableRow><TableCell colSpan={9} className="text-center py-6">No records found</TableCell></TableRow>
                    ) : (
                      filteredFees.map(f=>(
                        <TableRow key={f.id}>
                          <TableCell>{f.month}</TableCell>
                          <TableCell>{f.session}</TableCell>
                          <TableCell>₹{Number(f.total_fee).toFixed(2)}</TableCell>
                          <TableCell className="text-green-600">₹{Number(f.paid_amount).toFixed(2)}</TableCell>
                          <TableCell className={Number(f.due_amount)>0?"text-red-600":""}>₹{Number(f.due_amount).toFixed(2)}</TableCell>
                          <TableCell>{f.payment_mode}</TableCell>
                          <TableCell>{f.payment_type}</TableCell>
                          <TableCell>{f.updated_at? new Date(f.updated_at).toLocaleString():"—"}</TableCell>
                          <TableCell className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={()=>openEditModal(f)}><Edit/></Button>
                            <Button size="sm" variant="destructive" onClick={()=>handleDeleteFee(f.id)}><Trash2/></Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      {/* Add Payment Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Add Payment</DialogTitle></DialogHeader>
          <form className="space-y-3" onSubmit={handleAddFeeSubmit}>
            <div>
              <label>Month</label>
              <select value={addForm.month} onChange={e=>setAddForm(p=>({...p, month:e.target.value}))} className="w-full border rounded px-3 py-2 dark:bg-slate-800 dark:text-white">
                <option value="">Select month</option>
                {months.map(m=><option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label>Session</label>
              <select value={addForm.session} onChange={e=>setAddForm(p=>({...p, session:e.target.value}))} className="w-full border rounded px-3 py-2 dark:bg-slate-800 dark:text-white">
                <option value="">Select session</option>
                {Array.from(new Set(feeStructure.map(f=>f.session))).map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label>Total Fee</label>
                <Input type="number" value={addForm.total_fee} onChange={e=>setAddForm(p=>({...p, total_fee:Number(e.target.value)}))} className="dark:bg-slate-800 dark:text-white"/>
              </div>
              <div>
                <label>Paid Amount</label>
                <Input type="number" value={addForm.paid_amount} onChange={e=>setAddForm(p=>({...p, paid_amount:Number(e.target.value)}))} className="dark:bg-slate-800 dark:text-white"/>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button variant="outline" onClick={()=>setAddOpen(false)}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Edit Payment</DialogTitle></DialogHeader>
          <form className="space-y-3" onSubmit={handleEditSubmit}>
            <div>
              <label>Total Fee</label>
              <Input type="number" value={editForm.total_fee} onChange={e=>setEditForm(p=>({...p,total_fee:Number(e.target.value)}))}/>
            </div>
            <div>
              <label>Paid Amount</label>
              <Input type="number" value={editForm.paid_amount} onChange={e=>setEditForm(p=>({...p,paid_amount:Number(e.target.value)}))}/>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Update</Button>
              <Button variant="outline" onClick={()=>setEditOpen(false)}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
