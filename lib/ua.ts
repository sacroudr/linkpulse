import { UAParser } from "ua-parser-js";

/**
 * Parses a User-Agent string and returns a human-readable OS label
 * (e.g. "Windows 10", "macOS 14.4", "Android 13").
 * Returns null when the user agent is absent, unparseable, or has no OS info.
 */
export function getOsFromUserAgent(userAgent: string | null): string | null {
  if (!userAgent) return null;

  try {
    const parser = new UAParser(userAgent);
    const os = parser.getOS();

    if (!os.name) return null;

    return os.version ? `${os.name} ${os.version}` : os.name;
  } catch {
    return null;
  }
}
