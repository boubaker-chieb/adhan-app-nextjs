"use client";

import { PrayerRow } from "../types";

export function PrayerGrid({
  rows,
  loading,
  error,
}: {
  rows: PrayerRow[];
  loading: boolean;
  error?: string;
}) {
  if (loading)
    return (
      <section className="rounded-3xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 via-white to-blue-100 p-6 shadow-lg animate-pulse">
        <p className="text-cyan-600 text-center py-8">Loading…</p>
      </section>
    );
  if (error)
    return (
      <section className="rounded-3xl border-2 border-red-300 bg-gradient-to-br from-red-50 via-white to-pink-100 p-6 shadow-lg">
        <p className="text-red-600 text-center py-8 font-semibold">{error}</p>
      </section>
    );
  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-50 via-white to-blue-100 p-6 shadow-lg">
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-200 rounded-full opacity-30 blur-2xl pointer-events-none" />
      <h2 className="font-extrabold text-lg text-cyan-700 mb-4 tracking-wide flex items-center gap-2">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="inline-block text-cyan-400"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" /></svg>
        <span className="drop-shadow">Today&apos;s Times</span>
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {rows.map(({ key, time, passed }) => (
          <li
            key={key}
            className={`rounded-2xl border-2 border-cyan-100 bg-white/90 p-4 text-center shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              passed ? "opacity-50 grayscale" : ""
            }`}
          >
            <div className="text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-1">{key}</div>
            <div className="mt-1 text-3xl font-mono tabular-nums text-blue-800 font-bold drop-shadow-md">{time}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
