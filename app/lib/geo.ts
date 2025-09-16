export async function getCoordinates(): Promise<{
  lat: number;
  lon: number;
  source: "geo" | "fallback";
}> {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return { lat: 21.4225, lon: 39.8262, source: "fallback" };
  }
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          source: "geo",
        }),
      () => resolve({ lat: 21.4225, lon: 39.8262, source: "fallback" }),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
    );
  });
}
