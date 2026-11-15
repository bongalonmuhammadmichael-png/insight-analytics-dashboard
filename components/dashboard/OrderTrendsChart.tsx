"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { orderTrendData } from "@/data/orders";

export default function OrderTrendsChart() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">
          Order Trends
        </h2>

        <p className="mt-1 text-sm text-muted">
          Daily order volume throughout November.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={orderTrendData}
            margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip
              formatter={(value) => [
                `${Number(value)} orders`,
                "Order Volume",
              ]}
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                color: "var(--foreground)",
              }}
            />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#6366f1",
                strokeWidth: 2,
                stroke: "var(--card)",
              }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
