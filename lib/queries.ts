import { eq, desc, count } from "drizzle-orm";
import { db } from "./db";
import { links, clicks } from "./schema";

export async function getLinksByUserId(userId: string) {
  return db
    .select({
      id: links.id,
      originalUrl: links.originalUrl,
      shortCode: links.shortCode,
      createdAt: links.createdAt,
      userId: links.userId,
      clickCount: count(clicks.id),
    })
    .from(links)
    .leftJoin(clicks, eq(clicks.linkId, links.id))
    .where(eq(links.userId, userId))
    .groupBy(links.id)
    .orderBy(desc(links.createdAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return link ?? null;
}

export async function getLinkById(id: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.id, id))
    .limit(1);

  return link ?? null;
}

export async function createLink(data: {
  userId: string;
  originalUrl: string;
  shortCode: string;
}) {
  const [link] = await db
    .insert(links)
    .values(data)
    .returning();

  return link;
}

export async function deleteLinkById(id: string) {
  const [deleted] = await db
    .delete(links)
    .where(eq(links.id, id))
    .returning();

  return deleted ?? null;
}

export async function logClick(data: {
  linkId: string;
  userAgent: string | null;
}) {
  try {
    await db.insert(clicks).values(data);
  } catch (error) {
    console.error("Failed to log click:", error);
  }
}

export async function getClicksByLinkId(linkId: string) {
  return db
    .select()
    .from(clicks)
    .where(eq(clicks.linkId, linkId))
    .orderBy(desc(clicks.clickedAt));
}