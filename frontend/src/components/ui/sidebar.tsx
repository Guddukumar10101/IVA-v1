"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Users, BookOpen, DollarSign, Image, GraduationCap, Inbox, Menu, X, LogOut 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/admin/dashboard/students", icon: GraduationCap },
  // { name: "Teachers", href: "/admin/dashboard/teachers", icon: Users },
  // { name: "Courses", href: "/admin/dashboard/courses", icon: BookOpen },
  { name: "Fees", href: "/admin/dashboard/fees", icon: DollarSign },
  { name: "Fee Structure", href: "/admin/dashboard/fee-structure", icon: DollarSign },
  { name: "Gallery", href: "/admin/dashboard/gallery", icon: Image },
  // { name: "Enquiries", href: "/admin/dashboard/inquiries", icon: Inbox },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Active item: longest matching path ensures sub-routes are detected
  const activeItem = navItems
    .filter(item => pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-primary text-primary-foreground shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-card/80 backdrop-blur-lg border-r border-border p-5 flex flex-col transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <h1 className="text-2xl font-bold mb-8 gradient-text tracking-tight">Admin Panel</h1>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeItem?.href === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-md scale-[1.02] dark:bg-blue-500"
                    : "hover:bg-muted hover:scale-[1.01] dark:hover:bg-muted/80"
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-primary dark:text-primary-foreground"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 px-4 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Inspired Vision Academy
        </div>
      </aside>
    </>
  );
}
