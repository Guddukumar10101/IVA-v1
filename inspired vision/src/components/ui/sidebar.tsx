"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  Image,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/admin/students", icon: GraduationCap },
  { name: "Teachers", href: "/admin/teachers", icon: Users },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Fees", href: "/admin/fees", icon: DollarSign },
  { name: "Gallery", href: "/admin/gallery", icon: Image },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-primary text-primary-foreground shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-card/70 backdrop-blur-lg border-r border-border p-5 flex flex-col transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold mb-8 gradient-text tracking-tight">
          Admin Panel
        </h1>

        <nav className="flex-1 space-y-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-gradient-to-r from-primary/30 to-secondary/30 text-primary-foreground shadow-inner scale-105"
                      : "hover:bg-muted hover:scale-105"
                  }`}
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto text-xs text-muted-foreground">
          © {new Date().getFullYear()} Your School
        </div>
      </aside>
    </>
  );
}
