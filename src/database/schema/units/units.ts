import { relations } from "drizzle-orm";
import { int, mysqlTable, text } from "drizzle-orm/mysql-core";
import { productsVariant } from "../product/product-variant";

export const units = mysqlTable('unit', {
	id: int("id").primaryKey().autoincrement(),
	name: text("name")
});

export type Unit = typeof units.$inferSelect; // return type when queried
export type NewUnit = typeof units.$inferInsert; // insert type

export const unitsRelations = relations(units, ({many}) => ({
	unitsToProduct: many(productsVariant),
}))