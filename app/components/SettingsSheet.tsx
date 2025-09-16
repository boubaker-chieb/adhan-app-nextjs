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
    <div className="rounded-2xl border bg-white p-3 shadow-sm w-[260px]">
      <h2 className="font-semibold mb-2">Settings</h2>
      <label className="block mb-2">
        <span className="text-sm text-slate-600">Calculation method</span>
        <select
          value={method}
          onChange={(e) => onChangeMethod(parseInt(e.target.value, 10))}
          className="mt-1 w-full rounded-xl border px-3 py-2"
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
      <label className="block mb-2">
        <span className="text-sm text-slate-600">Asr school</span>
        <select
          value={school}
          onChange={(e) =>
            onChangeSchool(parseInt(e.target.value, 10) as 0 | 1)
          }
          className="mt-1 w-full rounded-xl border px-3 py-2"
        >
          <option value={0}>Shafi</option>
          <option value={1}>Hanafi</option>
        </select>
      </label>
      <p className="text-xs text-slate-500">
        Location:{" "}
        {coords
          ? `${coords.lat.toFixed(4)}, ${coords.lon.toFixed(4)} (${
              coords.source
            })`
          : "detecting…"}
      </p>
      <button
        onClick={onRefresh}
        className="mt-3 w-full inline-flex items-center justify-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
      >
        Refresh
      </button>
    </div>
  );
}
