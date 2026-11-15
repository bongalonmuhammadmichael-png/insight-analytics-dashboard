"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { orderStatusData } from "@/data/orders";

export default function OrderStatusChart() {
  const totalOrders = orderStatusData.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">
          Order Status Distribution
        </h2>

        <p className="mt-1 text-sm text-muted">
          Overview of your order fulfillment status.
        </p>
      </div>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={orderStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={100}
              paddingAngle={3}
              stroke="none"
            >
              {orderStatusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `${Number(value).toLocaleString("en-US")} orders`,
                "Orders",
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
          <span className="text-2xl font-bold text-foreground">
            {totalOrders.toLocaleString("en-US")}
          </span>
          <span className="mt-1 text-xs text-muted">
            Total Orders
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {orderStatusData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            <div className="min-w-0">
              <p className="truncate text-xs text-muted">
                {item.name}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {item.value.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
