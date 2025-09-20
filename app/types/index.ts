import type dayjs from "dayjs";

export type PrayerKey =
  | "Fajr"
  | "Sunrise"
  | "Dhuhr"
  | "Asr"
  | "Maghrib"
  | "Isha";
export type AladhanTimings = Record<PrayerKey, string>;

export type PrayerRow = {
  key: PrayerKey;
  time: string;
  date: dayjs.Dayjs;
  passed: boolean;
};
export type NextPrayerInfo = {
  key: Exclude<PrayerKey, "Sunrise">;
  date: dayjs.Dayjs;
};
