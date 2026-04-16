"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/seller", label: "Dashboard" },
  { href: "/seller/profile", label: "My profile" },
  { href: "/seller/products", label: "My products" },
];

export default function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-5">
      <h2 className="mb-1 text-xl font-bold">Seller area</h2>
      <p className="mb-6 text-sm text-gray-500">Manage your shop</p>
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                active ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/products"
        className="mt-6 block text-sm text-[#6496FA] hover:underline"
      >
        View public catalog
      </Link>
    </aside>
  );
}
