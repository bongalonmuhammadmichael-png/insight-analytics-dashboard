"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { salesData } from "@/data/sales";

export default function SalesByCategory() {
  const totalSales = salesData.reduce(
    (total, item) => total + item.sales,
    0
  );

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">
          Sales by Category
        </h2>

        <p className="mt-1 text-sm text-muted">
          Revenue distribution across product categories.
        </p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={salesData}
              dataKey="sales"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={100}
              paddingAngle={3}
              stroke="none"
            >
              {salesData.map((item) => (
                <Cell
                  key={item.category}
                  fill={item.color}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString("en-US")}`,
                "Sales",
              ]}
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--foreground)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted">
            Total Sales
          </span>

          <span className="mt-1 text-2xl font-bold text-foreground">
            ${(totalSales / 1000).toFixed(1)}k
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {salesData.map((item) => {
          const percentage = (
            (item.sales / totalSales) * 100
          ).toFixed(1);

          return (
            <div
              key={item.category}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="truncate text-sm text-foreground">
                  {item.category}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm font-semibold text-foreground">
                  ${item.sales.toLocaleString("en-US")}
                </span>

                <span className="w-12 text-right text-xs text-muted">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
