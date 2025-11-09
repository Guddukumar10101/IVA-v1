"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Edit, X, Image as ImageIcon, Save, Upload } from "lucide-react";

type GalleryItem = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt?: string;
};

const API_BASE = "https://ivworlds.com/backend/controllers";

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Add form
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Lightbox
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [lightboxCaption, setLightboxCaption] = useState<string>("");

  // Edit modal
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);

  const isAddDisabled = useMemo(() => !caption || !file, [caption, file]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/GalleryController.php`, { cache: "no-store" });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Fetch gallery failed:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // -------- Add Photo ----------
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleAdd = async () => {
    if (!caption || !file) return;

    try {
      // 1) upload file
      const fd = new FormData();
      fd.append("file", file);
      const uploadRes = await fetch(`${API_BASE}/GalleryUpload.php`, { method: "POST", body: fd });
      const upload = await uploadRes.json();
      if (upload.status !== "success") {
        alert(upload.message || "Upload failed");
        return;
      }

      // 2) save to DB
      const saveRes = await fetch(`${API_BASE}/GalleryController.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: upload.url, caption }),
      });
      const save = await saveRes.json();
      if (save.status === "success") {
        setCaption("");
        setFile(null);
        setPreview(null);
        await fetchAll();
      } else {
        alert(save.message || "Save failed");
      }
    } catch (e) {
      console.error(e);
      alert("Server error while adding photo");
    }
  };

  // -------- Delete ----------
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this photo?")) return;
    try {
      const res = await fetch(`${API_BASE}/GalleryController.php?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.status === "success") {
        await fetchAll();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (e) {
      console.error(e);
      alert("Server error while deleting photo");
    }
  };

  // -------- Edit ----------
  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setEditCaption(item.caption);
    setEditFile(null);
    setEditPreview(null);
  };

  const onEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setEditFile(f);
    setEditPreview(f ? URL.createObjectURL(f) : null);
  };

  const saveEdit = async () => {
    if (!editing) return;

    try {
      let finalUrl = editing.imageUrl;

      // if new file chosen, upload first
      if (editFile) {
        const fd = new FormData();
        fd.append("file", editFile);
        const uploadRes = await fetch(`${API_BASE}/GalleryUpload.php`, { method: "POST", body: fd });
        const upload = await uploadRes.json();
        if (upload.status !== "success") {
          alert(upload.message || "Upload failed");
          return;
        }
        finalUrl = upload.url;
      }

      const res = await fetch(`${API_BASE}/GalleryController.php?id=${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: finalUrl, caption: editCaption }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setEditing(null);
        setEditFile(null);
        setEditPreview(null);
        await fetchAll();
      } else {
        alert(data.message || "Update failed");
      }
    } catch (e) {
      console.error(e);
      alert("Server error while updating photo");
    }
  };

  // -------- UI --------
  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-black">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 shadow-md">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Manage Gallery
          </h1>
        </div>

        {/* Add Card */}
        <Card className="shadow-2xl rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-800/90">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Add a Photo</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-2">
              <Label>Caption</Label>
              <Input
                placeholder="Enter caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Choose Image</Label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="text-sm px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700"
                    title="Clear"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-28 w-auto rounded-xl border object-cover"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-1">
              <Button
                onClick={handleAdd}
                disabled={isAddDisabled}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                title={isAddDisabled ? "Caption & image required" : "Add Photo"}
              >
                <PlusCircle className="w-4 h-4" /> Add Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* List */}
        <Card className="shadow-2xl rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-800/90">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              {loading ? "Loading..." : `Gallery (${items.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-300 py-8">No photos yet</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {items.map((it) => (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative rounded-xl overflow-hidden border dark:border-gray-700 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setLightboxUrl(it.imageUrl);
                        setLightboxCaption(it.caption || "");
                      }}
                      className="block w-full"
                      title="Open"
                    >
                      <img
                        src={it.imageUrl}
                        alt={it.caption}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='16'>Image not available</text></svg>";
                        }}
                      />
                    </button>

                    <div className="p-2 text-sm line-clamp-2 min-h-[40px]">{it.caption}</div>

                    <div className="flex gap-2 p-2 pt-0">
                      <Button
                        size="sm"
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={() => openEdit(it)}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => handleDelete(it.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxUrl(null)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 p-2 rounded-full"
                title="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <img
                src={lightboxUrl}
                alt="Preview"
                className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              {lightboxCaption && (
                <div className="mt-3 text-center text-white/90">{lightboxCaption}</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">Edit Photo</h3>
                <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setEditing(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label>Caption</Label>
                  <Input value={editCaption} onChange={(e) => setEditCaption(e.target.value)} />
                </div>

                <div>
                  <Label>Replace Image (optional)</Label>
                  <div className="flex items-center gap-2">
                    <input type="file" accept="image/*" onChange={onEditFileChange} />
                    {(editPreview || editing?.imageUrl) && (
                      <div className="flex items-center gap-2">
                        <img
                          src={editPreview || editing?.imageUrl}
                          alt="preview"
                          className="h-20 w-28 object-cover rounded-lg border"
                        />
                        {editPreview && (
                          <button
                            className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
                            onClick={() => { setEditFile(null); setEditPreview(null); }}
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <Button variant="secondary" onClick={() => setEditing(null)}>
                    Cancel
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={saveEdit}>
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
