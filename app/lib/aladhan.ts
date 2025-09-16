export async function fetchTimings(
  lat: number,
  lon: number,
  method = 2,
  school: 0 | 1 = 0
) {
  const url = new URL("https://api.aladhan.com/v1/timings");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("method", String(method));
  url.searchParams.set("school", String(school));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Aladhan request failed");
  const json = await res.json();
  const { timings, date, meta } = json.data;
  return {
    timings,
    meta: {
      timezone: meta.timezone,
      hijri: date.hijri.date,
      readable: date.readable,
    },
  };
}
