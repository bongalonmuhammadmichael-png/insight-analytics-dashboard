"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { customerGrowthData } from "@/data/customers";

export default function CustomerGrowthChart() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">
          Customer Growth
        </h2>

        <p className="mt-1 text-sm text-muted">
          Track how your customer base grows over time.
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={customerGrowthData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="customerGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#6366f1"
                  stopOpacity={0.25}
                />
                <stop
                  offset="95%"
                  stopColor="#6366f1"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 12 }}
              tickFormatter={(value) =>
                Number(value).toLocaleString("en-US")
              }
            />

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

            <Area
              type="monotone"
              dataKey="customers"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#customerGradient)"
              activeDot={{
                r: 6,
                strokeWidth: 0,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
