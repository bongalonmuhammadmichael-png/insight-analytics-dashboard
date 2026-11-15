"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { customerTypeData } from "@/data/customers";

export default function CustomerTypeChart() {
  const totalCustomers = customerTypeData.reduce(
    (total, item) => total + item.customers,
    0
  );

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">
          Customer Segments
        </h2>

        <p className="mt-1 text-sm text-muted">
          New vs. returning customer distribution.
        </p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={customerTypeData}
              dataKey="customers"
              nameKey="type"
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={100}
              paddingAngle={4}
              stroke="none"
            >
              {customerTypeData.map((item) => (
                <Cell
                  key={item.type}
                  fill={item.color}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                Number(value).toLocaleString("en-US"),
                "Customers",
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
            Total Customers
          </span>

          <span className="mt-1 text-2xl font-bold text-foreground">
            {totalCustomers.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {customerTypeData.map((item) => {
          const percentage = (
            (item.customers / totalCustomers) * 100
          ).toFixed(1);

          return (
            <div
              key={item.type}
              className="space-y-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="text-sm text-foreground">
                    {item.type}
                  </span>
                </div>

                <span className="text-sm font-semibold text-foreground">
                  {item.customers.toLocaleString("en-US")}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              <p className="text-right text-xs text-muted">
                {percentage}%
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
