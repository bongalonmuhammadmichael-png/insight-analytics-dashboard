"use client";

import { ArrowUpRight, ClipboardList } from "lucide-react";

import { orderRecords } from "@/data/orders";
import { useDashboardFilter } from "@/components/providers/DashboardFilterProvider";

const statusStyles: Record<string, string> = {
  Completed:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Pending:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Processing:
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  Cancelled:
    "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function OrderRecordsTable() {
  const { includesDate } = useDashboardFilter();

  const filteredOrders = orderRecords.filter(
    (order) => includesDate(order.date)
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-6">
        <h2 className="text-lg font-bold text-foreground">
          Recent Orders
        </h2>

        <p className="mt-1 text-sm text-muted">
          Review your latest customer orders and their statuses.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-background text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 text-right font-semibold">Amount</th>
              <th className="px-6 py-4 text-right font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-background/70"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-primary">
                    {order.id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {order.customer}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted">
                    {order.date}
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                    ${order.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[order.status] ??
                        "bg-background text-muted"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-muted"
                >
                  No orders found for this date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-muted">
          <ClipboardList size={15} />
          Showing {filteredOrders.length} of {orderRecords.length} recent orders
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-opacity hover:opacity-75"
        >
          View all
          <ArrowUpRight size={15} />
        </button>
      </div>
    </section>
  );
}
