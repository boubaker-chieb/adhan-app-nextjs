import dayjs from "dayjs";

export function to24h(time: string) {
  const t = time.trim();
  const ampmMatch = t.match(/(AM|PM)$/i);
  if (!ampmMatch) return t;
  const [hms, ampm] = [
    t.replace(/\s?(AM|PM)/i, ""),
    ampmMatch[1].toUpperCase(),
  ];
  const [h, m] = hms.split(":");
  let hh = parseInt(h, 10);
  if (ampm === "PM" && hh !== 12) hh += 12;
  if (ampm === "AM" && hh === 12) hh = 0;
  return `${String(hh).padStart(2, "0")}:${m}`;
}

export function parseTodayAt(time24: string) {
  const [h, m] = time24.split(":").map(Number);
  return dayjs().hour(h).minute(m).second(0).millisecond(0);
}
