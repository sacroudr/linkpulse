import { UAParser } from "ua-parser-js";

export function getOsFromUserAgent(userAgent: string | null): string | null {
  if (!userAgent) return null;

  try {
    const parser = new UAParser(userAgent);
    const os = parser.getOS();

    if (!os.name) return null;

    // Return clean OS name with version if available
    return os.version ? `${os.name} ${os.version}` : os.name;
  } catch {
    return null;
  }
}