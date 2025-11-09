"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    const token = localStorage.getItem("token");

    // ✅ Agar token ya admin data missing → redirect immediately
    if (!adminData || !token) {
      setLoading(false);
      router.replace("/login"); // replace to avoid back navigation
      return;
    }

    // ✅ Agar data available → parse and set
    try {
      const parsedAdmin = JSON.parse(adminData);
      setUser(parsedAdmin);
    } catch {
      localStorage.clear();
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  return { user, loading };
}
