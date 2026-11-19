"use client";

import {
  Download,
  DollarSign,
  ShoppingBag,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";

import RevenueChart from "@/components/dashboard/RevenueChart";
import SalesByCategory from "@/components/dashboard/SalesByCategory";
import OrderTrendsChart from "@/components/dashboard/OrderTrendsChart";
import OrderStatusChart from "@/components/dashboard/OrderStatusChart";

import { revenueData } from "@/data/revenue";
import { salesData } from "@/data/sales";
import { orderTrendData, orderStatusData } from "@/data/orders";

export default function ReportsPage() {
  // Calculate report summary values from the existing demo data.
  const totalRevenue = revenueData.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const totalCategorySales = salesData.reduce(
    (total, item) => total + item.sales,
    0
  );

  const totalOrders = orderStatusData.reduce(
    (total, item) => total + item.value,
    0
  );

  const completedOrders =
    orderStatusData.find((item) => item.name === "Completed")?.value ?? 0;

  // Export all report datasets into one CSV file.
  function handleExport() {
    const rows: (string | number)[][] = [
      ["INSIGHT - Business Analytics Report"],
      ["Generated on", new Date().toLocaleString("en-US")],
      [],
      ["REVENUE REPORT"],
      ["Date", "Revenue"],
      ...revenueData.map((item) => [item.date, item.revenue]),
      [],
      ["SALES BY CATEGORY"],
      ["Category", "Sales"],
      ...salesData.map((item) => [item.category, item.sales]),
      [],
      ["ORDER TRENDS"],
      ["Date", "Orders"],
      ...orderTrendData.map((item) => [item.date, item.orders]),
      [],
      ["ORDER STATUS"],
      ["Status", "Orders"],
      ...orderStatusData.map((item) => [item.name, item.value]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "insight-business-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  const summaryCards = [
    {
      title: "November Revenue",
      value: `$${totalRevenue.toLocaleString("en-US")}`,
      description: "Total recorded revenue for November",
      icon: DollarSign,
      iconStyle: "bg-indigo-500/10 text-indigo-500",
    },
    {
      title: "Category Sales",
      value: `$${totalCategorySales.toLocaleString("en-US")}`,
      description: "Combined sales across all categories",
      icon: ShoppingBag,
      iconStyle: "bg-sky-500/10 text-sky-500",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString("en-US"),
      description: "Orders across all recorded statuses",
      icon: ShoppingCart,
      iconStyle: "bg-violet-500/10 text-violet-500",
    },
    {
      title: "Completed Orders",
      value: completedOrders.toLocaleString("en-US"),
      description: "Orders marked as completed",
      icon: CheckCircle2,
      iconStyle: "bg-emerald-500/10 text-emerald-500",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Reports & Analytics
          </h1>

          <p className="mt-2 text-sm text-muted">
            Analyze business performance and explore your key metrics.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Download size={17} />
          Export Report
        </button>
      </div>

      {/* Reporting period note */}
      <div className="rounded-xl border border-border bg-card px-5 py-4">
        <p className="text-sm font-semibold text-foreground">
          November 2026 Report
        </p>

        <p className="mt-1 text-xs leading-5 text-muted">
          Revenue figures cover November 1–30, 2026. Category sales and order
          status figures use their respective existing demo datasets.
        </p>
      </div>

      {/* Summary cards */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-foreground">
            Performance Summary
          </h2>

          <p className="mt-1 text-sm text-muted">
            A snapshot of your recorded business performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted">
                    {card.title}
                  </p>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconStyle}`}
                  >
                    <Icon size={19} />
                  </div>
                </div>

                <p className="mt-5 text-2xl font-bold tracking-tight text-foreground">
                  {card.value}
                </p>

                <p className="mt-2 text-xs text-muted">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Revenue and category reports */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Revenue & Sales
          </h2>

          <p className="mt-1 text-sm text-muted">
            Review revenue trends and category performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <RevenueChart />
          </div>

          <div className="xl:col-span-2">
            <SalesByCategory />
          </div>
        </div>
      </section>

      {/* Order reports */}
      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Order Performance
          </h2>

          <p className="mt-1 text-sm text-muted">
            Understand order volume and fulfillment status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <OrderTrendsChart />
          <OrderStatusChart />
        </div>
      </section>
    </div>
  );
}