"use client";

import { useState } from "react";
import Link from "next/link";
import HhLogo from "@/app/ui/hh-logo";
import { usePathname } from "next/navigation";
import {
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";

const LOGIN_PATH = "/auth/login";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const role = (session?.user as { role?: string })?.role;
  const isLoggedIn = status === "authenticated" && !!session?.user;

  /** Profile / account icon destination by role (buyers cannot use /admin routes). */
  const profileHref = !isLoggedIn
    ? LOGIN_PATH
    : role === "admin"
      ? "/admin"
      : role === "seller"
        ? "/seller/profile"
        : "/wishlist";

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    ...(role === "admin" ? [{ href: "/admin", label: "Admin" }] : []),
    ...(role === "seller" ? [{ href: "/seller", label: "Seller area" }] : []),
    { href: "/wishlist", label: "Wishlist" },
  ];

  const navIcons = [
    { href: "/carts", icon: ShoppingCartIcon, label: "Cart" },
    { href: profileHref, icon: UserIcon, label: "Account" },
  ];

  async function handleSignOut() {
    setIsOpen(false);
    await signOut({ callbackUrl: LOGIN_PATH });
  }

  return (
    <nav className="bg-black p-4">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="shrink-0">
          <HhLogo />
        </Link>

        {/* Mobile: cart, account, auth, menu */}
        <div className="flex items-center gap-2 md:hidden">
          {navIcons.map((item) => {
            const Icon = item.icon;
            const isCart = item.href === "/carts";
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                id={isCart ? "cart-icon" : undefined}
                className="flex h-10 w-10 items-center justify-center rounded bg-hhorange-300 text-black hover:bg-hhorange-500"
              >
                <Icon className="h-6 w-6" />
              </Link>
            );
          })}
          {isLoggedIn && (
            <button
              type="button"
              onClick={handleSignOut}
              className="flex h-10 w-10 items-center justify-center rounded bg-hhorange-300 text-black hover:bg-hhorange-500"
              aria-label="Log out"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded text-white md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop */}
              <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6 text-white font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "border-b-2 border-hhorange-300"
                      : "hover:text-hhorange-300"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {!isLoggedIn && (
              <li>
                <Link href="/auth/register" className="hover:text-hhorange-300">
                  Register
                </Link>
              </li>
            )}
          </ul>

          <ul className="flex items-center gap-2">
            {navIcons.map((item) => {
              const Icon = item.icon;
              const isCart = item.href === "/carts";
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    id={isCart ? "cart-icon-desktop" : undefined}
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded bg-hhorange-300 text-black hover:bg-hhorange-500"
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                </li>
              );
            })}
            {isLoggedIn && (
              <li>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex h-10 w-10 items-center justify-center rounded bg-hhorange-300 text-black hover:bg-hhorange-500"
                  aria-label="Log out"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile dropdown: extra links + register */}
      {isOpen && (
        <div className="mt-4 border-t border-gray-700 pt-4 md:hidden">
          <ul className="flex flex-col gap-2 text-center text-white">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "block rounded bg-hhblue-300 px-3 py-2 text-black"
                      : "block rounded px-3 py-2 hover:bg-hhorange-300 hover:text-black"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {!isLoggedIn && (
              <li>
                <Link
                  href="/auth/register"
                  className="block rounded px-3 py-2 hover:bg-hhorange-300 hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button
                  type="button"
                  className="mx-auto mt-2 block w-full max-w-xs rounded bg-hhorange-300 px-4 py-2 font-medium text-black"
                  onClick={handleSignOut}
                >
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
