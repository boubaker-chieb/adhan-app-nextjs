"use client";
import { SettingsSheet } from "@/components/SettingsSheet";
import { getCoordinates } from "@/lib/geo";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePrayerTimes } from "./hooks/usePrayerTimes";
import { NextPrayer } from "./components/NextPrayer";
import { PrayerGrid } from "./components/PrayerGrid";

export default function Page() {
  const [method, setMethod] = useState<number>(
    parseInt(process.env.NEXT_PUBLIC_DEFAULT_METHOD ?? "2", 10)
  );
  const [school, setSchool] = useState<0 | 1>(
    parseInt(process.env.NEXT_PUBLIC_DEFAULT_SCHOOL ?? "0", 10) as 0 | 1
  );

  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
    source: "geo" | "fallback";
  } | null>(null);
  const { data, loading, error, refresh } = usePrayerTimes({
    coords,
    method,
    school,
  });

  useEffect(() => {
    (async () => setCoords(await getCoordinates()))();
  }, []);

  const rows = useMemo(() => data?.rows ?? [], [data]);
  const next = useMemo(() => data?.nextPrayer, [data]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onPlayAdhan = () => {
    if (!audioRef.current) audioRef.current = new Audio("/adhan.mp3");
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Adhan — Prayer Times
          </h1>
          {data?.meta && (
            <p className="text-sm text-slate-600 mt-1">
              <span className="mr-2">{data.meta.readable}</span>
              <span className="opacity-80">• Hijri: {data.meta.hijri}</span>
            </p>
          )}
          {data?.meta?.timezone && (
            <p className="text-xs text-slate-500 mt-1">
              Timezone: {data.meta.timezone}
            </p>
          )}
        </div>
        <SettingsSheet
          method={method}
          school={school}
          coords={coords}
          onChangeMethod={setMethod}
          onChangeSchool={setSchool}
          onRefresh={refresh}
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 mt-6">
        <NextPrayer next={next} onPlayAdhan={onPlayAdhan} />
        <PrayerGrid rows={rows} loading={loading} error={error?.message} />
      </div>

      <footer className="text-xs text-slate-500 mt-8">
        Built with Next.js (App Router) + Tailwind. Uses an API route proxying
        Aladhan.
      </footer>
    </div>
  );
}
