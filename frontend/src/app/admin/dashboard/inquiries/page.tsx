"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, PlusCircle, Mail } from "lucide-react";

interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  reply?: string;
  createdAt: string;
}

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Inquiry | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  // Fetch inquiries
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://ivworlds.com/backend/controllers/InquiryController.php");
      const data = await res.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Create / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const payload = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("http://ivworlds.com/backend/controllers/InquiryController.php", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message);

    setForm({ name: "", phone: "", email: "", message: "" });
    setEditing(null);
    fetchInquiries();
  };

  // Delete inquiry
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    const res = await fetch("http://ivworlds.com/backend/controllers/InquiryController.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    alert(data.message);
    fetchInquiries();
  };

  // Reply to inquiry
  const handleReply = async (id: number, email: string) => {
    const reply = prompt("Enter your reply message:");
    if (!reply) return;

    const res = await fetch("http://ivworlds.com/backend/controllers/InquiryController.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, email, reply }),
    });

    const data = await res.json();
    alert(data.message);
    fetchInquiries();
  };

  return (
    <section className="p-6 lg:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2"
        >
          <PlusCircle className="w-8 h-8 text-blue-600" />
          Inquiries Management
        </motion.h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg mb-10 grid gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg p-3 w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            className="border rounded-lg p-3 w-full"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3 w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            placeholder="Message"
            rows={3}
            className="border rounded-lg p-3 w-full"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {editing ? "Update Inquiry" : "Add Inquiry"}
          </button>
        </form>

        {/* Inquiry Table */}
        {loading ? (
          <p>Loading inquiries...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4 hidden md:table-cell">Email</th>
                  <th className="p-4 hidden md:table-cell">Message</th>
                  <th className="p-4 hidden md:table-cell">Reply</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{inq.name}</td>
                    <td className="p-4">{inq.phone}</td>
                    <td className="p-4 hidden md:table-cell">{inq.email}</td>
                    <td className="p-4 hidden md:table-cell">{inq.message}</td>
                    <td className="p-4 hidden md:table-cell">
                      {inq.reply ? (
                        <span className="text-green-700 font-medium">{inq.reply}</span>
                      ) : (
                        <span className="text-gray-400 italic">No reply yet</span>
                      )}
                    </td>
                    <td className="p-4 flex gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          setEditing(inq);
                          setForm({
                            name: inq.name,
                            phone: inq.phone,
                            email: inq.email,
                            message: inq.message,
                          });
                        }}
                        className="p-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleReply(inq.id, inq.email)}
                        className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
                      >
                        <Mail className="w-4 h-4" /> Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
