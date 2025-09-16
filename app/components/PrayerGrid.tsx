"use client";

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
      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <p className="text-slate-600">Loading…</p>
      </section>
    );
  if (error)
    return (
      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <p className="text-red-600">{error}</p>
      </section>
    );
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <h2 className="font-semibold mb-3">Today&apos;s Times</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {rows.map(({ key, time, passed }) => (
          <li
            key={key}
            className={`rounded-xl border p-3 text-center ${
              passed ? "opacity-60" : ""
            }`}
          >
            <div className="text-sm text-slate-600">{key}</div>
            <div className="mt-1 text-2xl font-mono tabular-nums">{time}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
