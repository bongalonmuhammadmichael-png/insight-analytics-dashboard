import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import SalesByCategory from "@/components/dashboard/SalesByCategory";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import CustomerGrowthChart from "@/components/dashboard/CustomerGrowthChart";
import CustomerTypeChart from "@/components/dashboard/CustomerTypeChart";
import AcquisitionCard from "@/components/dashboard/AcquisitionCard";
import { acquisitionMetrics } from "@/data/customers";
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
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-5">
              <div className="xl:col-span-3">
                <RevenueChart />
              </div>

              <div className="xl:col-span-2">
                <SalesByCategory />
              </div>
            </div>

            {/* Recent Transactions */}
            <RecentTransactions />

            {/* Customer Acquisition Metrics */}
            <section className="mt-8">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-foreground">
                  Customer Acquisition
                </h2>

                <p className="mt-1 text-sm text-muted">
                  Monitor customer acquisition and retention performance.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {acquisitionMetrics.map((metric) => (
                  <AcquisitionCard
                    key={metric.title}
                    {...metric}
                  />
                ))}
              </div>
            </section>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-5">
              <div className="xl:col-span-3">
                <CustomerGrowthChart />
              </div>

              <div className="xl:col-span-2">
                <CustomerTypeChart />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
