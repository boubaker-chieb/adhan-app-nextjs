import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { z } from "zod";
import { to24h, parseTodayAt } from "@/lib/time";
import type {
  AladhanTimings,
  NextPrayerInfo,
  PrayerKey,
  PrayerRow,
} from "@/types/index";

const TimingsSchema = z.object({
  Fajr: z.string(),
  Sunrise: z.string(),
  Dhuhr: z.string(),
  Asr: z.string(),
  Maghrib: z.string(),
  Isha: z.string(),
});

export function usePrayerTimes({
  coords,
  method,
  school,
}: {
  coords: { lat: number; lon: number } | null;
  method: number;
  school: 0 | 1;
}) {
  const [data, setData] = useState<{
    rows: PrayerRow[];
    nextPrayer: NextPrayerInfo;
    meta: { timezone: string; hijri: string; readable: string } | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = useCallback(async () => {
    if (!coords) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/timings?lat=${coords.lat}&lon=${coords.lon}&method=${method}&school=${school}`
      );
      if (!res.ok) throw new Error("Failed to fetch timings");
      const json = await res.json();
      const t = TimingsSchema.parse(json.timings);
      const normalized: AladhanTimings = Object.fromEntries(
        Object.entries(t).map(([k, v]) => [k, to24h(v)])
      ) as AladhanTimings;

      const PRAYER_KEYS: PrayerKey[] = [
        "Fajr",
        "Sunrise",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha",
      ];
      const now = dayjs();
      const rows: PrayerRow[] = PRAYER_KEYS.map((key) => {
        const time = normalized[key];
        const date = parseTodayAt(time);
        return { key, time, date, passed: date.isBefore(now) };
      });
      const upcoming = rows.find(
        (r) =>
          !r.passed &&
          r.key !== "Sunrise"
      );
      const nextPrayer: NextPrayerInfo | null =
        upcoming && upcoming.key !== "Sunrise"
          ? { key: upcoming.key as Exclude<PrayerKey, "Sunrise">, date: upcoming.date }
          : {
              key: "Fajr",
              date: rows.find((r) => r.key === "Fajr")!.date.add(1, "day"),
            };

      setData({ rows, nextPrayer, meta: json.meta });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  }, [coords?.lat, coords?.lon, method, school]);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { data, loading, error, refresh: fetcher } as const;
}
