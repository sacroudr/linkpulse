import { customAlphabet } from "nanoid";

// URL-safe characters, no ambiguous ones like 0/O or l/1
const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateShortCode = customAlphabet(alphabet, 6);