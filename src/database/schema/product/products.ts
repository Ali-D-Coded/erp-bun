import { decimal, int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { productsVariant } from "./product-variant";
import { relations } from "drizzle-orm";


export const products = mysqlTable('products', {
  id: int("id").primaryKey().autoincrement(),
  name: text('name'),
},(products) => ({
	idIndex: uniqueIndex('id_idx').on(products.id),
	nameIndex: uniqueIndex('name_idx').on(products.name),
}));

export type Product = typeof products.$inferSelect; // return type when queried
export type NewProduct = typeof products.$inferInsert; // insert type


export const productRelations = relations(products, ({many}) => ({
  productVariant : many(productsVariant)
}))