import { ArrowUpRight, TrendingUp } from "lucide-react";
import { productPerformanceData } from "@/data/products";

export default function ProductPerformanceTable() {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-6">
        <h2 className="text-lg font-bold text-foreground">
          Product Performance
        </h2>
        <p className="mt-1 text-sm text-muted">
          Revenue, sales volume, and growth by product.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead className="bg-background text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 text-right font-semibold">Revenue</th>
              <th className="px-6 py-4 text-right font-semibold">Units Sold</th>
              <th className="px-6 py-4 text-right font-semibold">Growth</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {productPerformanceData.map((product, index) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-background/70"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {index + 1}
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {product.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {product.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-muted">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  ${product.revenue.toLocaleString("en-US")}
                </td>

                <td className="px-6 py-4 text-right text-sm text-foreground">
                  {product.unitsSold}
                </td>

                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight size={13} />
                    {product.growth}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 border-t border-border px-6 py-4 text-xs text-muted">
        <TrendingUp size={14} className="text-emerald-500" />
        <span>Showing all {productPerformanceData.length} products</span>
      </div>
    </section>
  );
}
