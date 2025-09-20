"use client";

import { useEffect } from "react";

export function SettingsSheet({
  method,
  school,
  coords,
  onChangeMethod,
  onChangeSchool,
  onRefresh,
}: {
  method: number;
  school: 0 | 1;
  coords: { lat: number; lon: number; source: "geo" | "fallback" } | null;
  onChangeMethod: (v: number) => void;
  onChangeSchool: (v: 0 | 1) => void;
  onRefresh: () => void;
}) {
  // persist
  useEffect(() => {
    try {
      localStorage.setItem("adhan:method", String(method));
      localStorage.setItem("adhan:school", String(school));
    } catch {}
  }, [method, school]);

  useEffect(() => {
    try {
      const m = localStorage.getItem("adhan:method");
      const s = localStorage.getItem("adhan:school");
      if (m) onChangeMethod(parseInt(m, 10));
      if (s) onChangeSchool(parseInt(s, 10) as 0 | 1);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-cyan-400 bg-gradient-to-br from-cyan-50 via-white to-blue-100 p-6 shadow-lg w-[280px]">
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan-200 rounded-full opacity-30 blur-2xl pointer-events-none" />
      <h2 className="font-extrabold text-lg text-cyan-700 mb-4 tracking-wide flex items-center gap-2">
        <svg
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block text-cyan-400"
        >
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <span className="drop-shadow">Settings</span>
      </h2>
      <label className="block mb-4">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Calculation method
        </span>
        <select
          value={method}
          onChange={(e) => onChangeMethod(parseInt(e.target.value, 10))}
          className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-3 py-2 shadow-inner focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
        >
          <option value={2}>Muslim World League</option>
          <option value={3}>Karachi</option>
          <option value={4}>Umm Al-Qura</option>
          <option value={5}>Egyptian</option>
          <option value={12}>Gulf</option>
          <option value={13}>Kuwait</option>
          <option value={14}>Qatar</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Asr school
        </span>
        <select
          value={school}
          onChange={(e) =>
            onChangeSchool(parseInt(e.target.value, 10) as 0 | 1)
          }
          className="mt-2 w-full rounded-xl border border-blue-200 bg-white px-3 py-2 shadow-inner focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
        >
          <option value={0}>Shafi</option>
          <option value={1}>Hanafi</option>
        </select>
      </label>
      <p className="text-xs text-slate-500 mb-4">
        <span className="font-semibold text-slate-700">Location:</span>{" "}
        {coords ? (
          <span className="text-blue-700 font-mono">
            {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
          </span>
        ) : (
          <span className="italic text-slate-400">detecting…</span>
        )}
        {coords && (
          <span className="ml-1 text-xs text-slate-400">({coords.source})</span>
        )}
      </p>
      <button
        onClick={onRefresh}
        className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-300 bg-blue-500 text-white px-4 py-2 text-base font-semibold shadow-md hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all duration-150"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block"
        >
          <path
            d="M4 4v5h.582M19.418 19A9 9 0 1 1 21 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Refresh
      </button>
    </div>
  );
}
