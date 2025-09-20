"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { NextPrayerInfo } from "../types";

export function NextPrayer({
  next,
  onPlayAdhan,
}: {
  next: NextPrayerInfo | null | undefined;
  onPlayAdhan: () => void;
}) {
  const [remaining, setRemaining] = useState("");
  useEffect(() => {
    if (!next) return;
    setInterval(() => {
      const diff = next.date.diff(dayjs(), "second");
      const h = Math.max(0, Math.floor(diff / 3600));
      const m = Math.max(0, Math.floor((diff % 3600) / 60));
      const s = Math.max(0, diff % 60);
      setRemaining(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
          s
        ).padStart(2, "0")}`
      );
    }, 1000);
  }, [next?.date]);
  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-blue-300 bg-gradient-to-br from-blue-100 via-white to-cyan-100 p-6 shadow-xl transition-shadow hover:shadow-2xl">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-200 rounded-full opacity-40 blur-2xl pointer-events-none" />
      <h2 className="font-extrabold text-lg text-cyan-700 mb-2 tracking-wide flex items-center gap-2">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="inline-block text-cyan-400"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /></svg>
        <span className="drop-shadow">Next Prayer</span>
      </h2>
      {!next ? (
        <p className="text-slate-500 italic text-center py-8">—</p>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl font-black text-cyan-800 drop-shadow-md uppercase tracking-widest mb-1 animate-pulse">{next.key}</div>
          <div className="text-6xl font-mono tabular-nums mt-1 text-blue-700 drop-shadow-lg bg-blue-100 rounded-xl px-4 py-2">
            {next.date.format("HH:mm")}
          </div>
          <div className="text-xs text-slate-500 mt-3 uppercase tracking-wider">Starts in</div>
          <div className="text-3xl font-mono tabular-nums text-green-700 bg-green-100 rounded-lg px-4 py-1 mt-1 shadow-inner border border-green-200">
            {remaining}
          </div>
          <button
            onClick={onPlayAdhan}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-cyan-400 bg-cyan-600 text-white px-5 py-2 text-base font-semibold shadow-md hover:bg-cyan-700 hover:scale-105 active:scale-95 transition-all duration-150"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="inline-block"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
            Play Adhan
          </button>
        </div>
      )}
    </section>
  );
}
