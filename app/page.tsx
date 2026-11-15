import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { dashboardStats } from "@/data/dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <section className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">

            {/* Page introduction */}
            <div className="mb-8">
              <p className="text-sm text-muted">
                Here's what's happening with your business today.
              </p>
            </div>

            {/* KPI Summary */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardStats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  description={stat.description}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Revenue Analytics */}
            <div className="mt-8">
              <RevenueChart />
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
