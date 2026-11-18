"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Users,
  UserPlus,
  Repeat,
  TrendingUp,
  ArrowUpDown,
  Download,
  MoreHorizontal,
  SlidersHorizontal,
} from "lucide-react";

import { customers, customerMetrics } from "@/data/customers";

type CustomerStatus = "All" | "Active" | "Inactive" | "Pending";

const filters: CustomerStatus[] = [
  "All",
  "Active",
  "Inactive",
  "Pending",
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<CustomerStatus>("All");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesFilter =
        selectedFilter === "All" ||
        customer.status === selectedFilter;

      const search = searchQuery.toLowerCase();

      const matchesSearch =
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.company.toLowerCase().includes(search) ||
        customer.id.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [searchQuery, selectedFilter]);

  const stats = [
    {
      title: "Total Customers",
      value: customerMetrics.total.toLocaleString(),
      description: "Registered customers",
      icon: Users,
      iconStyle: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    },
    {
      title: "New Customers",
      value: customerMetrics.new.toLocaleString(),
      description: "New customers this month",
      icon: UserPlus,
      iconStyle: "bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400",
    },
    {
      title: "Returning Customers",
      value: customerMetrics.returning.toLocaleString(),
      description: "Customers who purchased again",
      icon: Repeat,
      iconStyle: "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
    },
    {
      title: "Retention Rate",
      value: `${customerMetrics.retentionRate}%`,
      description: "Customer retention performance",
      icon: TrendingUp,
      iconStyle: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    },
  ];

  const statusStyles: Record<string, string> = {
    Active:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    Inactive:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    Pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page introduction */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Customers
          </h2>
          <p className="mt-1 text-sm text-muted">
            Manage your customer relationships and monitor customer activity.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/10 transition hover:opacity-90"
        >
          <Download size={17} />
          Export Customers
        </button>
      </section>

      {/* Customer statistics */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}>
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-5 text-sm font-medium text-muted">
                {stat.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-foreground">
                {stat.value}
              </h3>

              <p className="mt-1 text-xs text-muted">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Customer directory */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Table heading */}
        <div className="flex flex-col justify-between gap-4 border-b border-border p-5 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Customer Directory
            </h3>

            <p className="mt-1 text-sm text-muted">
              A complete overview of your registered customers.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 sm:w-64">
              <Search size={17} className="shrink-0 text-muted" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search customers..."
                aria-label="Search customers"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-background"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-4">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                selectedFilter === filter
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}

          <span className="ml-auto text-xs text-muted">
            {filteredCustomers.length} of {customers.length} customers
          </span>
        </div>

        {/* Customer table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-background">
              <tr className="text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Orders</th>
                <th className="px-5 py-4">Total Spent</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="transition hover:bg-background/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        index % 4 === 0
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                          : index % 4 === 1
                          ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                          : index % 4 === 2
                          ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      }`}>
                        {customer.initials}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {customer.name}
                        </p>

                        <p className="mt-0.5 text-xs text-muted">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {customer.company}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {customer.location}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-foreground">
                    {customer.orders}
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-foreground">
                    {formatCurrency(customer.spent)}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {new Date(`${customer.joined}T00:00:00`).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      aria-label={`More actions for ${customer.name}`}
                      className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-muted"
                  >
                    No customers found. Try another search or status filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="flex flex-col justify-between gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            Showing {filteredCustomers.length} of {customers.length} demonstration records
          </p>

          <div className="flex items-center gap-2 text-xs text-muted">
            <ArrowUpDown size={14} />
            <span>Sorted by customer name</span>
          </div>
        </div>
      </section>
    </div>
  );
}
