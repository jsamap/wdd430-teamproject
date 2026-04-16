"use client";

import { useState, useRef } from "react";
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

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const cartIconRef = useRef<HTMLAnchorElement>(null);
    const { data: session } = useSession();

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/wishlist", label: "Wishlist" },
    ];

    const navIcons = [
        { href: "/carts", icon: ShoppingCartIcon },
        { href: "/admin/profile", icon: UserIcon },
    ];

    return (
        <nav className="bg-black p-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <HhLogo />
                </Link>

                {/* Hamburger toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white md:hidden"
                >
                    {isOpen ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>

                {/* Desktop nav */}
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
                    </ul>

                    {/* Icons */}
                    <div className="flex space-x-2">
                        <ul className="flex space-x-2 text-white font-medium">
                            {navIcons.map((item) => {
                                const Icon = item.icon;
                                const isCart = item.href === "/carts";
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            id={isCart ? "cart-icon" : undefined}
                                            className="bg-hhorange-300 text-black rounded hover:bg-hhorange-500 flex items-center justify-center h-10 w-10"
                                        >
                                            <Icon className="h-6 w-6" />
                                        </Link>
                                    </li>
                                );
                            })}

                            {/* Logout button only if authenticated */}
                            {session && (
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="bg-hhorange-300 text-black rounded hover:bg-hhorange-500 flex items-center justify-center h-10 w-10"
                                        aria-label="Logout"
                                    >
                                        <ArrowRightOnRectangleIcon className="h-6 w-6" />
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Mobile nav dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4">
                    <ul className="flex flex-col space-y-2 text-white font-medium">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={
                                        pathname === item.href
                                            ? "flex justify-center px-2 py-1 rounded bg-hhblue-300 text-black"
                                            : "flex justify-center px-2 py-1 rounded hover:bg-hhorange-300 hover:text-black"
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile icons */}
                    <div className="flex space-x-2 mt-4 justify-end">
                        <ul className="flex space-x-2 justify-end text-white font-medium">
                            {navIcons.map((item) => {
                                const Icon = item.icon;
                                const isCart = item.href === "/carts";
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            id={isCart ? "cart-icon" : undefined}
                                            className="bg-hhorange-300 text-black rounded hover:bg-hhorange-500 flex items-center justify-center h-10 w-10"
                                        >
                                            <Icon className="h-6 w-6" />
                                        </Link>
                                    </li>
                                );
                            })}

                            {/* Logout button only if authenticated */}
                            {session && (
                                <li>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            signOut();
                                        }}
                                        className="bg-hhorange-300 text-black rounded hover:bg-hhorange-500 flex items-center justify-center h-10 w-10"
                                        aria-label="Logout"
                                    >
                                        <ArrowRightOnRectangleIcon className="h-6 w-6" />
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}
