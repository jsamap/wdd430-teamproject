"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Profile",
    href: "/admin/profile",
  },
  {
    label: "Products",
    href: "/admin/products",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[#e7e0d4] bg-white/80 backdrop-blur md:flex md:flex-col">
      <div className="border-b border-[#e7e0d4] px-6 py-6">
        <Link href="/" className="block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7b4f]">
            Handcrafted Haven
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Admin Panel
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage profile and products
          </p>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-[#3e2f23] text-white shadow-sm"
                      : "text-gray-700 hover:bg-[#f4efe6] hover:text-[#3e2f23]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[#e7e0d4] px-6 py-5">
        <div className="rounded-2xl bg-[#f7f1e8] p-4">
          <p className="text-sm font-semibold text-[#3e2f23]">
            Artisan Dashboard
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Update your shop details and manage handmade items easily.
          </p>
        </div>
      </div>
    </aside>
  );
}