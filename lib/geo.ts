interface GeoData {
  country: string | null;
  city: string | null;
}

export async function getGeoFromIp(ip: string): Promise<GeoData> {
  // Skip lookup for localhost
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
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,status`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

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