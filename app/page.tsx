import { IdeaExplorer } from "@/components/IdeaExplorer";
import { startupIdeas } from "@/data/ideas";

export default function Page() {
  return (
    <main className="relative overflow-hidden py-12">
      <div className="noise" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,134,240,0.2),_transparent_50%)]" />
      <div className="relative z-[1] mx-auto flex max-w-6xl flex-col gap-16 px-6">
        <header className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-primary-100">
            Gen-Z Solo Founder Stack
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Launch a million-dollar path while the market is still uncrowded.
          </h1>
          <p className="max-w-3xl text-base text-slate-300 md:text-lg">
            Curated, non-saturated startup blueprints optimized for solo teenage
            founders. Each concept pairs a sharp problem with unfair advantages,
            monetization, and first-30-day traction loops so you can move fast
            without a team.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              100% solo executable
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              AI-accelerated playbooks
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Fresh market angles
            </span>
          </div>
        </header>

        <IdeaExplorer ideas={startupIdeas} />

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/80 to-slate-950 p-10 text-center md:text-left">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,107,107,0.25),_transparent_58%)]" />
          <div className="relative z-[1] space-y-6">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Build your unfair founder routine.
            </h2>
            <p className="text-base text-slate-300 md:text-lg">
              Pick one idea, design a 90-day runway, and document progress every
              week. Pair these blueprints with consistent shipping and you will
              outpace older, slower teams still validating.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a
                href="mailto:hello@teenfounderplaybook.com?subject=Founder%20Accountability%20Loop"
                className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-primary-400"
              >
                Request accountability partner
              </a>
              <a
                href="https://buildspace.so/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                target="_blank"
                rel="noreferrer"
              >
                Join a build-in-public cohort
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
