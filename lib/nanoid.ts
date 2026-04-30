import { customAlphabet } from "nanoid";

const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Generates a 6-character cryptographically random short code from a
 * 62-character URL-safe alphabet (a-z A-Z 0-9).
 *
 * The 6-character length means ~56 billion possible codes, making collisions
 * extremely unlikely at typical usage volumes. All named app routes
 * (/api, /login, /register, /dashboard) are longer or shorter than 6 chars
 * and therefore cannot be shadowed by a generated code.
 */
export const generateShortCode = customAlphabet(alphabet, 6);
