"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  Search,
  Bell,
  CalendarDays,
  ChevronDown,
  Check,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import { useDashboardFilter } from "@/components/providers/DashboardFilterProvider";

const dateOptions = [
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "Last 90 days", value: "90days" },
  { label: "All time", value: "all" },
] as const;

const pageTitles: Record<string, string> = {
  "/": "Overview",
  "/customers": "Customers",
  "/products": "Products",
  "/transactions": "Transactions",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function Header() {
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);

  const pathname = usePathname();

  const { selectedRange, setSelectedRange, rangeLabel } =
    useDashboardFilter();

  const pageTitle = pageTitles[pathname] ?? "INSIGHT";

  return (
    <header className="flex min-h-20 items-center justify-between gap-2 border-b border-border bg-card pl-16 pr-4 py-4 sm:gap-4 sm:pl-16 sm:pr-6 lg:gap-6 lg:px-8">
      {/* Page heading */}
      <div className="min-w-0">
        <p className="hidden text-sm text-muted sm:block">
          Welcome back, Mustafa 👋
        </p>

        <h1 className="mt-1 text-xl font-bold text-foreground">
          {pageTitle}
        </h1>
      </div>

      {/* Header actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Search */}
        <div className="hidden w-64 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 md:flex">
          <Search size={18} className="shrink-0 text-muted" />

          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />

          <kbd className="rounded border border-border px-1.5 py-0.5 text-xs text-muted">
            /
          </kbd>
        </div>

        {/* Date selector */}
        <div className="relative hidden lg:block">
          <button
            type="button"
            aria-label="Select dashboard date range"
            aria-expanded={isDateMenuOpen}
            onClick={() =>
              setIsDateMenuOpen((previous) => !previous)
            }
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground transition hover:bg-background"
          >
            <CalendarDays size={17} className="text-muted" />

            <span>{rangeLabel}</span>

            <ChevronDown
              size={15}
              className={`text-muted transition-transform ${
                isDateMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDateMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xl">
              {dateOptions.map((option) => {
                const isSelected =
                  selectedRange === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSelectedRange(option.value);
                      setIsDateMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-foreground transition hover:bg-background"
                  >
                    <span>{option.label}</span>

                    {isSelected && (
                      <Check
                        size={16}
                        className="text-indigo-500"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition hover:bg-background"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
        </button>

        {/* Profile */}
        <button
          type="button"
          className="hidden items-center gap-2 border-l border-border pl-4 sm:flex"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            MB
          </div>

          <div className="hidden text-left xl:block">
            <p className="text-sm font-semibold text-foreground">
              Mustafa
            </p>

            <p className="text-xs text-muted">
              Administrator
            </p>
          </div>

          <ChevronDown size={15} className="text-muted" />
        </button>
      </div>
    </header>
  );
}
