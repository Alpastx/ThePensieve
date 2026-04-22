'use client'

import { useMemo, useState } from 'react'
import teamData from './team-data.json'

type Solve = (typeof teamData)['solves'][number]
type Member = (typeof teamData)['members'][number]

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="text-xl font-semibold text-zinc-100">{value}</p>
    </div>
  )
}

/** en-US gives "Mar 21, 2026, 12:19 PM" style; time reflects viewer timezone. */
function formatSolveTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  } catch {
    return iso
  }
}

export function RedfoxDashboard() {
  const { team, members, solves, solves_count } = teamData
  const [filter, setFilter] = useState<string>('All')

  const categories = useMemo(() => {
    const set = new Set(solves.map((s: Solve) => s.category))
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [solves])

  const filteredSolves = useMemo(() => {
    const list =
      filter === 'All'
        ? [...solves]
        : solves.filter((s: Solve) => s.category === filter)
    return list.sort(
      (a, b) =>
        new Date(b.solved_at_utc).getTime() - new Date(a.solved_at_utc).getTime()
    )
  }, [solves, filter])

  const maxMemberScore = Math.max(...members.map((m: Member) => m.score), 1)

  return (
    <div className="space-y-8 p-6">
      <div className="rounded-xl border border-violet-500/25 bg-gradient-to-br from-violet-950/80 via-zinc-950 to-zinc-950 p-6 text-zinc-50 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight">
              {team.name}
            </h1>
            <p className="mt-1 text-sm text-violet-200/90">
              {team.alias} · {team.country}
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Captured {new Date(team.captured_at_utc).toUTCString()}
            </p>
          </div>
          <a
            href={team.source}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-100 transition hover:border-violet-400/60 hover:bg-violet-500/20"
          >
            Scoreboard
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-8">
          <Stat label="Place" value={team.place} />
          <Stat label="Points" value={team.points} />
          <Stat label="Solves" value={solves_count} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-[family-name:var(--font-heading)] text-xl font-semibold text-zinc-100">
          Members
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {members.map((m: Member) => (
            <div
              key={m.user_id}
              className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-4 transition hover:border-violet-500/25"
            >
              <h3 className="font-medium text-zinc-100">{m.username}</h3>
              <p className="text-sm text-zinc-500">Score: {m.score}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-2 rounded-full bg-violet-500/90"
                  style={{
                    width: `${Math.min(100, Math.round((m.score / maxMemberScore) * 100))}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-[family-name:var(--font-heading)] text-xl font-semibold text-zinc-100">
          Category filter
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={
                filter === c
                  ? 'rounded-full border border-violet-500/50 bg-violet-500/20 px-3 py-1 text-sm font-medium text-violet-100'
                  : 'rounded-full border border-white/10 bg-black/40 px-3 py-1 text-sm text-zinc-400 transition hover:border-violet-500/30 hover:text-zinc-200'
              }
            >
              {c}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-600">
          Showing {filteredSolves.length} solve
          {filteredSolves.length === 1 ? '' : 's'}
          {filter !== 'All' ? ` in ${filter}` : ''}
        </p>
      </div>

      <div>
        <h2 className="mb-4 font-[family-name:var(--font-heading)] text-xl font-semibold text-zinc-100">
          Solves (newest first)
        </h2>
        <div className="overflow-hidden rounded-xl border border-violet-900/35 shadow-[0_0_0_1px_rgba(0,0,0,0.4)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead className="font-[family-name:var(--font-heading)]">
                <tr className="border-b border-violet-950/60 bg-[#241038]">
                  <th className="px-4 py-2.5 text-[0.8125rem] font-medium tracking-wide text-zinc-300">
                    When
                  </th>
                  <th className="px-4 py-2.5 text-[0.8125rem] font-medium tracking-wide text-zinc-300">
                    Challenge
                  </th>
                  <th className="px-4 py-2.5 text-[0.8125rem] font-medium tracking-wide text-zinc-300">
                    Category
                  </th>
                  <th className="px-4 py-2.5 text-[0.8125rem] font-medium tracking-wide text-zinc-300">
                    Pts
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black font-[family-name:var(--font-body)]">
                {filteredSolves.map((s: Solve) => (
                  <tr
                    key={s.challenge_anchor}
                    className="border-b border-white/[0.06] last:border-0 hover:bg-zinc-950/80"
                  >
                    <td
                      className="whitespace-nowrap px-4 py-2.5 text-zinc-500 tabular-nums"
                      suppressHydrationWarning
                      title={s.solved_at_utc}
                    >
                      {formatSolveTime(s.solved_at_utc)}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-zinc-50">
                      {s.challenge}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-400">{s.category}</td>
                    <td className="px-4 py-2.5 tabular-nums text-violet-300">
                      {s.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
