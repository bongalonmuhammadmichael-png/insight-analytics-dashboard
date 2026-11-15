import {
  ArrowDownRight,
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

type OrderMetricCardProps = {
  title: string;
  value: string;
  change: string;
  trend: string;
  description: string;
};

export default function OrderMetricCard({
  title,
  value,
  change,
  trend,
  description,
}: OrderMetricCardProps) {
  const isPositive = trend === "up";

  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted">
          {title}
        </p>

        <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
          <ShoppingBag size={19} />
        </div>
      </div>

      <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
        {value}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          <TrendIcon size={14} />
          {change}
        </span>

        <span className="text-xs text-muted">
          Compared to last month
        </span>
      </div>

      <p className="mt-4 text-xs text-muted">
        {description}
      </p>
    </div>
  );
}
