// src/app/admin/students/page.tsx

"use client";

import { useEffect, useState } from "react";
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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, UserPlus, Search, FileDown } from "lucide-react";

const API_URL = "https://ivworlds.com/backend/controllers/StudentController.php";

interface Student {
  id: number;
  name: string;
  fatherName: string;
  mobile: string;
  email: string;
  schoolName: string;
  board: string;
  class: string;
  modeOfFee: string;
  session: string;
  address: string;
  photo?: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState<Partial<Student>>({});

  // ✅ Fetch Students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
      setFiltered(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Unique classes for dropdown
  const uniqueClasses = Array.from(new Set(students.map((s) => s.class))).filter(Boolean);

  // ✅ Combined search + class filter
  useEffect(() => {
    let result = students;

    if (selectedClass) {
      result = result.filter((s) => s.class === selectedClass);
    }

    if (search) {
      result = result.filter((s) =>
        [s.name, s.fatherName, s.mobile, s.class, s.session]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, students, selectedClass]);

  // ✅ Handle form changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Add / Update Student
  const handleSave = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v as string));

    try {
      if (editing) {
        fd.append("id", String(editing.id));
        await fetch(API_URL, { method: "POST", body: fd });
      } else {
        await fetch(API_URL, { method: "POST", body: fd });
      }
      setOpen(false);
      setForm({});
      setEditing(null);
      fetchStudents();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // ✅ Delete Student
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this student?")) return;
    try {
      await fetch(API_URL, {
        method: "DELETE",
        body: new URLSearchParams({ id: String(id) }),
      });
      fetchStudents();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ Export to CSV
  const handleExport = () => {
    const headers = [
      "ID",
      "Name",
      "Father Name",
      "Mobile",
      "Email",
      "School",
      "Board",
      "Class",
      "Mode of Fee",
      "Session",
      "Address",
    ];

    const rows = filtered.map((s) => [
      s.id,
      s.name,
      s.fatherName,
      s.mobile,
      s.email,
      s.schoolName,
      s.board,
      s.class,
      s.modeOfFee,
      s.session,
      s.address,
    ]);

    const csvContent =
      [headers, ...rows]
        .map((r) =>
          r
            .map((val) => `"${String(val).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="m-4 shadow-2xl rounded-2xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-bold">
          🎓 Student Management
        </CardTitle>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <FileDown className="mr-2 h-4 w-4" /> Export All
          </Button>
          <Button onClick={() => setOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* 🔍 Search + Class Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center flex-grow min-w-[200px]">
            <Search className="h-4 w-4 mr-2 text-gray-500" />
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Classes</option>
            {uniqueClasses.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* 📋 Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead>Name</TableHead>
                <TableHead>Father</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Board</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.fatherName}</TableCell>
                    <TableCell>{s.mobile}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>{s.session}</TableCell>
                    <TableCell>{s.modeOfFee}</TableCell>
                    <TableCell>{s.board}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditing(s);
                            setForm(s);
                            setOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(s.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* ➕ Add/Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "✏️ Edit Student" : "➕ Add Student"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-2">
            <Input name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} />
            <Input name="fatherName" placeholder="Father Name" value={form.fatherName || ""} onChange={handleChange} />
            <Input name="mobile" placeholder="Mobile" value={form.mobile || ""} onChange={handleChange} />
            <Input name="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
            <Input name="schoolName" placeholder="School Name" value={form.schoolName || ""} onChange={handleChange} />
            <Input name="board" placeholder="Board" value={form.board || ""} onChange={handleChange} />
            <Input name="class" placeholder="Class" value={form.class || ""} onChange={handleChange} />
            <Input name="modeOfFee" placeholder="Mode of Fee" value={form.modeOfFee || ""} onChange={handleChange} />
            <Input name="session" placeholder="Session" value={form.session || ""} onChange={handleChange} />
            <Input name="address" placeholder="Address" value={form.address || ""} onChange={handleChange} />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? "Update" : "Save"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
