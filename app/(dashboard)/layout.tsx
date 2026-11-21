import type { ReactNode } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main application area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        {/* Page content */}
        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </section>
      </div>
    </main>
  );
}
