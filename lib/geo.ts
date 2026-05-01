interface GeoData {
  country: string | null;
  city: string | null;
}

/**
 * Resolves an IP address to country and city via ip-api.com (free, no key required).
 * Returns nulls for private/loopback addresses or on any lookup failure.
 * Responses are cached for one hour by Next.js fetch caching.
 */
export async function getGeoFromIp(ip: string): Promise<GeoData> {
  if (
    !ip ||
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("192.168") ||
    ip.startsWith("10.")
  ) {
    return { country: null, city: null };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    // Fields must include "city" (not "regionName") to populate the city column.
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,regionName,status`,
      {
        signal: controller.signal,
        next: { revalidate: 3600 },
      }
    );

    clearTimeout(timeout);

    if (!res.ok) return { country: null, city: null };

    const data = await res.json();

    if (data.status !== "success") return { country: null, city: null };

    return {
      country: data.country ?? null,
      city: data.city ?? null,
    };
  } catch {
    return { country: null, city: null };
  }
}
