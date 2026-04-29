// import {
//   index,
//   pgTable,
//   text,
//   timestamp,
//   uuid,
// } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   email: text("email").notNull().unique(),
//   password: text("password").notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
// });

// export const links = pgTable("links", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   userId: uuid("user_id")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   originalUrl: text("original_url").notNull(),
//   shortCode: text("short_code").notNull().unique(),
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
// }, (table) => [
//   index("links_short_code_idx").on(table.shortCode),
//   index("links_user_id_idx").on(table.userId),
// ]);

// export const clicks = pgTable("clicks", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   linkId: uuid("link_id")
//     .notNull()
//     .references(() => links.id, { onDelete: "cascade" }),
//   clickedAt: timestamp("clicked_at", { withTimezone: true }).defaultNow().notNull(),
//   userAgent: text("user_agent"),
// }, (table) => [
//   index("clicks_link_id_idx").on(table.linkId),
// ]);

import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const links = pgTable("links", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  originalUrl: text("original_url").notNull(),
  shortCode: text("short_code").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index("links_short_code_idx").on(table.shortCode),
  index("links_user_id_idx").on(table.userId),
]);

export const clicks = pgTable("clicks", {
  id: uuid("id").defaultRandom().primaryKey(),
  linkId: uuid("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  clickedAt: timestamp("clicked_at", { withTimezone: true }).defaultNow().notNull(),
  userAgent: text("user_agent"),
  country: text("country"),
  city: text("city"),
  os: text("os"),
  referer: text("referer"),
}, (table) => [
  index("clicks_link_id_idx").on(table.linkId),
]);