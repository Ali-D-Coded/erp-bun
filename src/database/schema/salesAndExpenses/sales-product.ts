import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { products } from "../product/products";
import { sales } from "./sales";

export const salesProducts = mysqlTable('salesProducts', {
    id: int("id").primaryKey().autoincrement(),
    saleId:int("sale_id").references(() => sales.id),
    productId: int("product_id").references(() => products.id)
  });

  
export type SalesProduct = typeof salesProducts.$inferSelect; // return type when queried
export type NewSalesProduct = typeof salesProducts.$inferInsert; // insert type

export const salesProductsRelations = relations(salesProducts,({one}) => ({
    sale: one(sales)
}))