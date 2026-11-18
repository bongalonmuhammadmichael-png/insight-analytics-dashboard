"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Package,
  Receipt,
  ChartNoAxesCombined,
  Settings,
  PanelLeftClose,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Reports", href: "/reports", icon: ChartNoAxesCombined },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-sidebar px-5 py-6 text-white">
      {/* Brand */}
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-wide">INSIGHT</h1>
            <p className="text-xs text-slate-400">Analytics Platform</p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Collapse sidebar"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <PanelLeftClose size={19} />
        </button>
      </div>

      {/* Navigation heading */}
      <div className="mb-4 px-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </p>
      </div>

      {/* Navigation links */}
      <nav aria-label="Main navigation" className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-indigo-950/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-700 pt-5">
        <Link
          href="/settings"
          aria-current={pathname === "/settings" ? "page" : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
            pathname === "/settings" ||
            pathname.startsWith("/settings/")
              ? "bg-primary text-white"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Settings size={19} />
          <span>Settings</span>
        </Link>

        {/* User profile */}
        <button
          type="button"
          className="mt-5 flex w-full items-center gap-3 rounded-xl bg-slate-800/70 p-3 text-left transition hover:bg-slate-800"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold">
            MB
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Mustafa</p>
            <p className="truncate text-xs text-slate-400">
              Administrator
            </p>
          </div>

          <ChevronDown size={17} className="text-slate-400" />
        </button>
      </div>
    </aside>
  );
}
