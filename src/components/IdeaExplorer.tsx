 "use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StartupIdea } from "@/data/ideas";
import { IdeaFilters, buildFilterOptions } from "@/lib/filters";

type IdeaExplorerProps = {
  ideas: StartupIdea[];
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function IdeaExplorer({ ideas }: IdeaExplorerProps) {
  const [filters, setFilters] = useState<IdeaFilters>({
    category: "All",
    difficulty: "All",
    soloFriendly: true,
    search: ""
  });

  const filterOptions = useMemo(() => buildFilterOptions(ideas), [ideas]);

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      if (filters.category !== "All" && idea.category !== filters.category) {
        return false;
      }
      if (filters.difficulty !== "All" && idea.difficulty !== filters.difficulty) {
        return false;
      }
      if (filters.soloFriendly && !idea.soloFriendly) {
        return false;
      }
      if (filters.search.trim()) {
        const text = `${idea.title} ${idea.problem} ${idea.solution} ${idea.differentiation}`.toLowerCase();
        if (!text.includes(filters.search.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }, [ideas, filters]);

  const highlightIdea = filteredIdeas[0];
  const restIdeas = filteredIdeas.slice(1);

  return (
    <div className="relative z-[1]">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="glass-panel h-full space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <FilterSection title="Focus Theme">
            <div className="flex flex-wrap gap-2">
              {filterOptions.categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      category: category === prev.category ? "All" : category
                    }))
                  }
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    filters.category === category
                      ? "border-primary-400 bg-primary-500/20 text-primary-100"
                      : "border-white/10 text-slate-300 hover:border-primary-300/60 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Execution Mode">
            <div className="flex gap-2">
              {["All", "Low", "Medium", "High"].map((level) => (
                <button
                  key={level}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      difficulty: level as IdeaFilters["difficulty"]
                    }))
                  }
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                    filters.difficulty === level
                      ? "border-primary-400 bg-primary-500/20 text-primary-100"
                      : "border-white/10 text-slate-300 hover:border-primary-300/60 hover:text-white"
                  }`}
                >
                  {level === "All" ? "Any" : `${level} Lift`}
                </button>
              ))}
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-transparent accent-primary-400"
                checked={filters.soloFriendly}
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    soloFriendly: event.target.checked
                  }))
                }
              />
              Solo-executable only
            </label>
          </FilterSection>

          <FilterSection title="Idea Radar">
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, search: event.target.value }))
                }
                placeholder="Search problems, keywords..."
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
              {filters.search && (
                <button
                  className="absolute inset-y-0 right-2 flex items-center px-2 text-xs text-slate-400 hover:text-white"
                  onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                >
                  Clear
                </button>
              )}
            </div>
          </FilterSection>
        </aside>

        <div className="space-y-6">
          {highlightIdea ? (
            <HighlightCard idea={highlightIdea} />
          ) : (
            <div className="glass-panel rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
              No matches yet. Loosen a filter or explore a different category.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <AnimatePresence>
              {restIdeas.map((idea) => (
                <motion.div
                  key={idea.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.2 }}
                >
                  <IdeaCard idea={idea} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h3>
      {children}
    </section>
  );
}

function HighlightCard({ idea }: { idea: StartupIdea }) {
  return (
    <motion.article
      layout
      className="relative overflow-hidden rounded-3xl border border-primary-500/40 bg-gradient-to-br from-primary-500/10 via-slate-900/80 to-slate-900/60 p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(63,134,240,0.2),_transparent_55%)]" />
      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-primary-300/40 bg-primary-500/20 px-3 py-1 text-xs uppercase tracking-wide text-primary-100">
            Spotlight
          </span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-slate-200">
            {idea.category}
          </span>
          <span className="text-xs text-slate-400">Solo-friendly</span>
        </div>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          {idea.title}
        </h2>
        <p className="text-base text-slate-200">{idea.problem}</p>
        <p className="text-sm leading-relaxed text-slate-300">{idea.solution}</p>
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:grid-cols-3">
          <InfoBlock label="Unfair Edge" value={idea.unfairAdvantage} />
          <InfoBlock label="Why Now" value={idea.whyNow} />
          <InfoBlock label="Differentiation" value={idea.differentiation} />
        </div>
        <div className="rounded-2xl border border-primary-300/30 bg-primary-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-200">
            Launch Sprint
          </p>
          <ul className="mt-2 space-y-2 text-sm text-primary-50/90">
            {idea.tractionStrategy.map((step) => (
              <li key={step} className="flex gap-2">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary-300" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-300">
          <Tag>Monetization: {idea.monetization}</Tag>
          <Tag>Effort: {idea.difficulty}</Tag>
          {idea.soloFriendly ? <Tag>Solo build</Tag> : null}
        </div>
      </div>
    </motion.article>
  );
}

function IdeaCard({ idea }: { idea: StartupIdea }) {
  return (
    <div className="glass-panel h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
        <span>{idea.category}</span>
        <span>{idea.difficulty} lift</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-white">{idea.title}</h3>
      <p className="mt-3 text-sm text-slate-300">{idea.problem}</p>
      <p className="mt-3 text-sm text-slate-200">{idea.solution}</p>
      <div className="mt-4 space-y-2 text-sm text-slate-300">
        <Detail label="Unfair Edge" value={idea.unfairAdvantage} />
        <Detail label="Why Now" value={idea.whyNow} />
        <Detail label="Differentiation" value={idea.differentiation} />
      </div>
      <div className="mt-5 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          30-Day Traction Loops
        </p>
        <ul className="space-y-1 text-sm text-slate-200">
          {idea.tractionStrategy.map((step) => (
            <li key={step} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-300" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
        <Tag>Monetization: {idea.monetization}</Tag>
        {idea.soloFriendly ? <Tag>Solo build</Tag> : null}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-semibold text-slate-200">{label}:</span>{" "}
      <span>{value}</span>
    </p>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2 rounded-xl border border-white/10 bg-black/30 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>
      <p className="text-sm text-slate-100">{value}</p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
      {children}
    </span>
  );
}
