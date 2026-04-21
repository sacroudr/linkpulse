import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import { links, clicks } from "./schema";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
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
  await db.delete(links).where(eq(links.id, id));
}

export async function logClick(data: {
  linkId: string;
  userAgent: string | null;
}) {
  await db.insert(clicks).values(data);
}

export async function getClicksByLinkId(linkId: string) {
  return db
    .select()
    .from(clicks)
    .where(eq(clicks.linkId, linkId))
    .orderBy(desc(clicks.clickedAt));
}