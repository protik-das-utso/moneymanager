"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Dashboard",     href: "/dashboard",     icon: "/icons/dashboardIcon.png"   },
    { label: "Transactions",  href: "/transactions",  icon: "/icons/transactionIcon.png" },
    { label: "Analytics",     href: "/analytics",     icon: "/icons/analyticsIcon.png"   },
    { label: "Goals",         href: "/goals",         icon: "/icons/goalsIcon.png"        },
    { label: "Categories",    href: "/categories",    icon: "/icons/categoryIcon.png"     },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="bg-[#1E293B] h-full flex flex-col px-4 py-6">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 mb-8">
                <div className="p-3 bg-[#6366F1] rounded-lg">
                <Image
                    src="/icons/logoIcon.png"
                    alt="MoneyManager Logo"
                    width={20}
                    height={20}
                />
                </div>
                <span className="text-white font-bold text-lg leading-tight">
                    MoneyManager
                </span>
            </div>

            {/* Main nav */}
            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map(({ label, href, icon }) => {
                    const isActive = pathname === href || pathname.startsWith(href + "/");
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                                ${isActive
                                    ? "bg-[#334155] text-white"
                                    : "text-[#94A3B8] hover:bg-[#2D3E53] hover:text-white"
                                }`}
                        >
                            <Image
                                src={icon}
                                alt={label}
                                width={20}
                                height={20}
                                className={isActive ? "opacity-100" : "opacity-60"}
                            />
                            <span className="text-sm font-medium">{label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Settings at bottom */}
            <div>
                <Link
                    href="/settings"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                        ${pathname === "/settings" || pathname.startsWith("/settings/")
                            ? "bg-[#334155] text-white"
                            : "text-[#94A3B8] hover:bg-[#2D3E53] hover:text-white"
                        }`}
                >
                    <Image
                        src="/icons/settingsIcon.png"
                        alt="Settings"
                        width={20}
                        height={20}
                        className={
                            pathname === "/settings" || pathname.startsWith("/settings/")
                                ? "opacity-100"
                                : "opacity-60"
                        }
                    />
                    <span className="text-sm font-medium">Settings</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;