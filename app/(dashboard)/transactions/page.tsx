"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Receipt,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  MoreHorizontal,
  Eye,
  X,
  TrendingUp,
} from "lucide-react";

import { transactions } from "@/data/transactions";

type TransactionStatus =
  | "All"
  | "Completed"
  | "Pending"
  | "Processing"
  | "Failed";

type PaymentMethod =
  | "All"
  | "Credit Card"
  | "PayPal"
  | "Bank Transfer";

const statusFilters: TransactionStatus[] = [
  "All",
  "Completed",
  "Pending",
  "Processing",
  "Failed",
];

const paymentMethods: PaymentMethod[] = [
  "All",
  "Credit Card",
  "PayPal",
  "Bank Transfer",
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<TransactionStatus>("All");
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod>("All");
  const [selectedTransaction, setSelectedTransaction] =
    useState<(typeof transactions)[number] | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        transaction.id.toLowerCase().includes(search) ||
        transaction.customer.toLowerCase().includes(search) ||
        transaction.product.toLowerCase().includes(search);

      const matchesStatus =
        selectedStatus === "All" ||
        transaction.status === selectedStatus;

      const matchesPayment =
        selectedPayment === "All" ||
        transaction.paymentMethod === selectedPayment;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [searchQuery, selectedStatus, selectedPayment]);

  const completedTransactions = transactions.filter(
    (transaction) => transaction.status === "Completed"
  );

  const pendingTransactions = transactions.filter(
    (transaction) => transaction.status === "Pending"
  );

  const totalRevenue = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const completedRevenue = completedTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const stats = [
    {
      title: "Total Transactions",
      value: transactions.length.toString(),
      description: "All recorded transactions",
      icon: Receipt,
      iconStyle:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    },
    {
      title: "Total Transaction Value",
      value: formatCurrency(totalRevenue),
      description: "Value across all transaction statuses",
      icon: DollarSign,
      iconStyle:
        "bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400",
    },
    {
      title: "Completed Payments",
      value: completedTransactions.length.toString(),
      description: `${formatCurrency(completedRevenue)} collected`,
      icon: CheckCircle2,
      iconStyle:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      title: "Pending Payments",
      value: pendingTransactions.length.toString(),
      description: `${formatCurrency(
        pendingTransactions.reduce(
          (total, transaction) => total + transaction.amount,
          0
        )
      )} awaiting payment`,
      icon: Clock,
      iconStyle:
        "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    },
  ];

  const statusStyles: Record<string, string> = {
    Completed:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    Pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    Processing:
      "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
    Failed:
      "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  };

  const paymentIcons: Record<string, typeof CreditCard> = {
    "Credit Card": CreditCard,
    PayPal: Wallet,
    "Bank Transfer": ArrowLeftRight,
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page introduction */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Transactions
          </h2>

          <p className="mt-1 text-sm text-muted">
            Monitor payments, transaction activity, and payment status.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
        >
          <TrendingUp size={17} />
          Transaction overview
        </button>
      </section>

      {/* Transaction statistics */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={21} />
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

      {/* Transaction history */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Heading and search */}
        <div className="flex flex-col justify-between gap-4 border-b border-border p-5 xl:flex-row xl:items-center">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Transaction History
            </h3>

            <p className="mt-1 text-sm text-muted">
              Review and track all your customer payments.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 xl:w-80">
            <Search size={17} className="shrink-0 text-muted" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search transactions..."
              aria-label="Search transactions"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
            />
          </div>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-4">
          {statusFilters.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                selectedStatus === status
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Payment filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-4">
          <CreditCard size={16} className="mr-1 text-muted" />

          {paymentMethods.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setSelectedPayment(method)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                selectedPayment === method
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-muted hover:bg-background hover:text-foreground"
              }`}
            >
              {method}
            </button>
          ))}

          <span className="ml-auto text-xs text-muted">
            {filteredTransactions.length} of {transactions.length} transactions
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-background">
              <tr className="text-xs font-semibold uppercase tracking-wider text-muted">
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Payment Method</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredTransactions.map((transaction) => {
                const PaymentIcon =
                    paymentIcons[transaction.paymentMethod] ?? CreditCard;

                return (
                  <tr
                    key={transaction.id}
                    className="transition hover:bg-background/70"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-foreground">
                        {transaction.id}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-foreground">
                        {transaction.customer}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-muted">
                      {transaction.product}
                    </td>

                    <td className="px-5 py-4 text-sm text-muted">
                      {transaction.date}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <PaymentIcon
                          size={16}
                          className="text-muted"
                        />
                        {transaction.paymentMethod}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-foreground">
                      {formatCurrency(transaction.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[transaction.status]}`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        aria-label={`View ${transaction.id}`}
                        onClick={() =>
                          setSelectedTransaction(transaction)
                        }
                        className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-muted"
                  >
                    No transactions found. Try another search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-between gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>

          <p className="text-xs text-muted">
            Transaction demonstration data
          </p>
        </div>
      </section>

      {/* Transaction details dialog */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-dialog-title"
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="transaction-dialog-title"
                  className="text-lg font-bold text-foreground"
                >
                  Transaction Details
                </h3>

                <p className="mt-1 text-sm text-muted">
                  {selectedTransaction.id}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close transaction details"
                onClick={() => setSelectedTransaction(null)}
                className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-background p-4">
              <p className="text-xs font-medium text-muted">
                Transaction amount
              </p>

              <p className="mt-1 text-3xl font-bold text-foreground">
                {formatCurrency(selectedTransaction.amount)}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[selectedTransaction.status]}`}
              >
                {selectedTransaction.status}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {[
                ["Customer", selectedTransaction.customer],
                ["Product", selectedTransaction.product],
                ["Date", selectedTransaction.date],
                ["Payment Method", selectedTransaction.paymentMethod],
                ["Transaction ID", selectedTransaction.id],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-border pb-3"
                >
                  <span className="text-sm text-muted">{label}</span>
                  <span className="text-right text-sm font-semibold text-foreground">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedTransaction(null)}
              className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
