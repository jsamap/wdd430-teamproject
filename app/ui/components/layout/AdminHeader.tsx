"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/admin/profile/edit")) return "Edit Profile";
  if (pathname.startsWith("/admin/profile")) return "Profile Administration";
  if (pathname.startsWith("/admin/products/new")) return "Add Product";
  if (pathname.startsWith("/admin/products/edit")) return "Edit Product";
  if (pathname.startsWith("/admin/products")) return "Product Administration";
  return "Admin Dashboard";
}

const mobileNavItems = [
  { label: "Profile", href: "/admin/profile" },
  { label: "Products", href: "/admin/products" },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-20 border-b border-[#e7e0d4] bg-[#f8f6f2]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Dashboard</p>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-[#d9cfbe] bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-[#f4efe6]"
            >
              Back to Site
            </Link>

            <div className="hidden rounded-xl bg-white px-4 py-2 shadow-sm sm:block">
              <p className="text-sm font-medium text-gray-900">Welcome back</p>
              <p className="text-xs text-gray-500">Handcrafted Haven Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto md:hidden">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-[#3e2f23] text-white"
                  : "bg-white text-gray-700 border border-[#e7e0d4]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}