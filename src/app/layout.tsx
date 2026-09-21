import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FA award scoring — prototype",
  description: "Sample walkthrough of the v12 financial-aid rubric. Not live awards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800 bg-slate-900 text-white">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
            <div>
              <div className="text-lg font-bold tracking-tight">FA award scoring</div>
              <div className="text-xs text-slate-300">Prototype · v12 rubric · sample families only</div>
            </div>
            <span className="rounded border border-amber-400/40 bg-amber-400/10 px-2 py-1 text-xs text-amber-200">
              Mock data · Cycle 1 advisory
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] px-6 py-8">{children}</main>
        <footer className="mx-auto max-w-[1400px] px-6 pb-8 text-xs" style={{ color: "var(--ink-muted)" }}>
          Source: Financial-Aid-Consideration-v12. Ranking is per campus. Gate 1 and Section 1
          are Clarity-side. Section 2 is human. No XP / life-skills feed. This is not a live
          award tool.
        </footer>
      </body>
    </html>
  );
}
