"use client";

import { useState } from "react";
import Link from "next/link";
import HhLogo from "@/app/ui/hh-logo";
import { usePathname } from "next/navigation";
import { UserIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/wishlist", label: "Wishlist" },
    ];

    const navIcons = [
        { href: "/cart", icon: ShoppingCartIcon },
        { href: "/account", icon: UserIcon },
    ];

    return (
        <nav className="bg-black p-4">
            <div className="flex items-center justify-between">
                {/* Logo on the left */}
                <HhLogo />

                {/* Hamburger toggle (mobile only) */}
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


                {/* Desktop nav on the right */}
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
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="bg-hhorange-300 text-black rounded hover:bg-hhorange-500 flex items-center justify-center h-10 w-10"
                                        >
                                            <Icon className="h-6 w-6" />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>
                </div>
            </div>


            {/* Mobile nav dropdown */}
            {isOpen && (
                <div className="md:hidden mt-4">
                    {/* Tabs in mobile menu */}
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

                    {/* Icons in mobile menu */}
                    <div className="flex space-x-2 mt-4 justify-end">
                        <ul className="flex space-x-2 justify-end text-white font-medium">
                            {navIcons.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="bg-hhorange-300 text-black rounded hover:bg-hhorange-500 flex items-center justify-center h-10 w-10"
                                        >
                                            <Icon className="h-6 w-6" />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}
