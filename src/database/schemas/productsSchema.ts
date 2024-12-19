import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const productsSchema = sqliteTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  expiration_date: text("expiration_date").notNull(),
  created_at: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  deleted_at: text("deleted_at"),
});
