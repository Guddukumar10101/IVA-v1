"use client";

import Sidebar from "@/components/ui/sidebar";
import Topbar from "@/components/ui/topbar";
import useAuth from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // auth check ho raha hai
  if (!user) return null; // hook me already redirect ho raha hai

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
