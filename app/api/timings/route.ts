import { NextRequest, NextResponse } from "next/server";
import { fetchTimings } from "@/lib/aladhan";

export async function GET(req: NextRequest) {
  const lat = Number(req.nextUrl.searchParams.get("lat"));
  const lon = Number(req.nextUrl.searchParams.get("lon"));
  const method = Number(req.nextUrl.searchParams.get("method") ?? 2);
  const school = Number(req.nextUrl.searchParams.get("school") ?? 0) as 0 | 1;

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ error: "lat/lon required" }, { status: 400 });
  }

  try {
    const { timings, meta } = await fetchTimings(lat, lon, method, school);
    return NextResponse.json({ timings, meta });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: (e as Error)?.message ?? "Failed" },
      { status: 500 }
    );
  }
}
