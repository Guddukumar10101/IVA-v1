"use client";
import useAuth from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  // ✅ Jab tak auth check ho raha hai, kuch render mat karo
  if (loading) return <p>Loading...</p>;

  // ✅ Agar user null hai, return null (redirect already hook me ho gaya)
  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    window.location.href = "/login"; // admin login pe redirect
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
