import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface AcquisitionCardProps {
  title: string;
  value: string;
  change: string;
  trend: string;
  description: string;
}

export default function AcquisitionCard({
  title,
  value,
  change,
  trend,
  description,
}: AcquisitionCardProps) {
  const isPositive = trend === "up" || trend === "down";

  const isDown = trend === "down";

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm font-medium text-muted">
        {title}
      </p>

      <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
        {value}
      </h3>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            isPositive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {isDown ? (
            <ArrowDownRight size={14} />
          ) : (
            <ArrowUpRight size={14} />
          )}

          {change}
        </span>

        <span className="text-xs text-muted">
          Compared to last month
        </span>
      </div>

      <p className="mt-3 text-xs text-muted">
        {description}
      </p>
    </section>
  );
}
