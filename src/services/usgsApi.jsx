// src/services/usgsApi.js
// Fetches the USGS all-day GeoJSON feed.
// API: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

const USGS_ALL_DAY =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

/**
 * fetchEarthquakes
 * @returns {Promise<{type:string, metadata:object, features:Array}>}
 */
export async function fetchEarthquakes() {
  const res = await fetch(USGS_ALL_DAY, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`USGS API error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data;
}
