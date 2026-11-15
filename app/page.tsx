import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main workspace */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        {/* Dashboard content */}
        <section className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm text-muted">
                Here's what's happening with your business today.
              </p>
            </div>

            {/* Dashboard content will go here */}
            <div className="flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-border bg-card">
              <div className="text-center">
                <h2 className="text-lg font-semibold">
                  Your dashboard starts here
                </h2>

                <p className="mt-2 text-sm text-muted">
                  We're preparing your analytics overview.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
