"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname.startsWith(path);
  }

  return (
    <aside className="w-64 min-h-screen border-r bg-white p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <p className="text-sm text-gray-500">Handcrafted Haven</p>
      </div>

      <nav className="space-y-2">
        <Link
          href="/admin/profile"
          className={`block rounded-lg px-4 py-3 ${
            isActive("/admin/profile")
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Profile
        </Link>

        <Link
          href="/admin/products"
          className={`block rounded-lg px-4 py-3 ${
            isActive("/admin/products")
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Products
        </Link>
      </nav>
    </aside>
  );
}