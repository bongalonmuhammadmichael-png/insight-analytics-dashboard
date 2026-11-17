"use client";

import { ArrowUpRight } from "lucide-react";

import { transactions } from "@/data/transactions";
import { useDashboardFilter } from "@/components/providers/DashboardFilterProvider";

const statusStyles: Record<string, string> = {
  Completed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Processing:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
};

export default function RecentTransactions() {
  const { includesDate } = useDashboardFilter();

  const filteredTransactions = transactions.filter(
    (transaction) => includesDate(transaction.date)
  );

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-muted">
            A summary of your latest customer orders.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 self-start rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-background sm:self-auto">
          View all
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-border bg-background/60">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Transaction
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Customer
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Product
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Date
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Amount
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-background/50"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary">
                    {transaction.id}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                    {transaction.customer}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted">
                    {transaction.product}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted">
                    {transaction.date}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-foreground">
                    ${transaction.amount.toFixed(2)}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[transaction.status] ??
                        "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-sm text-muted"
                >
                  No transactions found for this date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-6 py-4">
        <p className="text-xs text-muted">
          Showing {filteredTransactions.length} of {transactions.length} recent transactions
        </p>
      </div>
    </section>
  );
}
