"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export function NextPrayer({
  next,
  onPlayAdhan,
}: {
  next: NextPrayerInfo;
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
  }, [next.date.valueOf()]);
  return (
    <section className="rounded-2xl border bg-white p-4 shadow-sm">
      <h2 className="font-semibold mb-1">Next Prayer</h2>
      {!next ? (
        <p className="text-slate-600">—</p>
      ) : (
        <div>
          <div className="text-2xl font-bold">{next.key}</div>
          <div className="text-5xl font-mono tabular-nums mt-1">
            {next.date.format("HH:mm")}
          </div>
          <div className="text-sm text-slate-600 mt-2">Starts in</div>
          <div className="text-2xl font-mono tabular-nums">{remaining}</div>
          <button
            onClick={onPlayAdhan}
            className="mt-3 inline-flex items-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Play Adhan
          </button>
        </div>
      )}
    </section>
  );
}
