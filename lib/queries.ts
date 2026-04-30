import { eq, desc, count } from "drizzle-orm";
import { db } from "./db";
import { links, clicks } from "./schema";
import { getGeoFromIp } from "./geo";
import { getOsFromUserAgent } from "./ua";

/**
 * Returns all links owned by `userId`, each augmented with a total click count.
 * Results are ordered by creation date descending (newest first).
 */
export async function getLinksByUserId(userId: string) {
  return db
    .select({
      id: links.id,
      originalUrl: links.originalUrl,
      shortCode: links.shortCode,
      createdAt: links.createdAt,
      userId: links.userId,
      isActive: links.isActive,
      clickCount: count(clicks.id),
    })
    .from(links)
    .leftJoin(clicks, eq(clicks.linkId, links.id))
    .where(eq(links.userId, userId))
    .groupBy(links.id)
    .orderBy(desc(links.createdAt));
}

/**
 * Looks up a link by its short code. Returns null when no matching record exists.
 * Used by the redirect handler on every inbound short-link request.
 */
export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return link ?? null;
}

/** Returns a link by primary key, or null if it does not exist. */
export async function getLinkById(id: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.id, id))
    .limit(1);

  return link ?? null;
}

/** Inserts a new link record and returns the created row. */
export async function createLink(data: {
  userId: string;
  originalUrl: string;
  shortCode: string;
}) {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

/**
 * Deletes a link by primary key and returns the deleted row.
 * Returns null if no row matched (already deleted or wrong id).
 */
export async function deleteLinkById(id: string) {
  const [deleted] = await db
    .delete(links)
    .where(eq(links.id, id))
    .returning();

  return deleted ?? null;
}

/**
 * Records a click event for the given link. Geo-lookup and OS parsing run
 * concurrently via Promise.all. Any failure is swallowed so click-logging
 * errors never affect the redirect response.
 */
export async function logClick(data: {
  linkId: string;
  userAgent: string | null;
  ip: string | null;
  referer: string | null;
}) {
  try {
    const [geo, os] = await Promise.all([
      getGeoFromIp(data.ip ?? ""),
      Promise.resolve(getOsFromUserAgent(data.userAgent)),
    ]);

    await db.insert(clicks).values({
      linkId: data.linkId,
      userAgent: data.userAgent,
      country: geo.country,
      city: geo.city,
      os,
      referer: data.referer,
    });
  } catch (error) {
    console.error("Failed to log click:", error);
  }
}

/**
 * Fetches all click records for a link ordered by click time descending.
 * Callers are responsible for verifying link ownership before calling this.
 */
export async function getClicksByLinkId(linkId: string) {
  return db
    .select()
    .from(clicks)
    .where(eq(clicks.linkId, linkId))
    .orderBy(desc(clicks.clickedAt));
}

/** Updates the `isActive` flag on a link and returns the updated row. */
export async function toggleLinkActive(id: string, isActive: boolean) {
  const [updated] = await db
    .update(links)
    .set({ isActive })
    .where(eq(links.id, id))
    .returning();

  return updated ?? null;
}
