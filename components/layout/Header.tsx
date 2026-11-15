"use client";

import {
  Search,
  Bell,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-6 border-b border-border bg-card px-8 py-4">
      {/* Page heading */}
      <div className="min-w-0">
        <p className="text-sm text-muted">
          Welcome back, Mustafa 👋
        </p>

        <h1 className="mt-1 text-xl font-bold text-foreground">
          Overview
        </h1>
      </div>

      {/* Header actions */}
      <div className="flex items-center gap-4">
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
        <button
          type="button"
          className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground transition hover:bg-background lg:flex"
        >
          <CalendarDays size={17} className="text-muted" />
          <span>Last 30 days</span>
          <ChevronDown size={15} className="text-muted" />
        </button>

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
