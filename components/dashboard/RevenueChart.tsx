"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { revenueData } from "@/data/revenue";
import { useDashboardFilter } from "@/components/providers/DashboardFilterProvider";

export default function RevenueChart() {
  const { includesDate, rangeLabel } = useDashboardFilter();

  const filteredRevenueData = revenueData
    .filter((item) => includesDate(item.date))
    .map((item) => ({
      ...item,
      date: new Date(`${item.date}T12:00:00`).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
        }
      ),
    }));

  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      {/* Chart heading */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-muted">
            Track your revenue performance over time.
          </p>
        </div>

        <span className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground">
          {rangeLabel}
        </span>
      </div>

      {/* Revenue chart */}
      {filteredRevenueData.length > 0 ? (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredRevenueData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
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
                tickFormatter={(value) => `$${value / 1000}k`}
                width={55}
              />

              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString("en-US")}`,
                  "Revenue",
                ]}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--foreground)",
                }}
                labelStyle={{
                  color: "var(--muted)",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                activeDot={{
                  r: 6,
                  fill: "#6366f1",
                  stroke: "var(--card)",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-80 items-center justify-center text-sm text-muted">
          No revenue data available for this date range.
        </div>
      )}
    </section>
  );
}
