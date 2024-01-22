import { relations, sql } from "drizzle-orm";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { products } from "../product/products";
import { custmers } from "../users/customer";
import { sales } from "./sales";
import { salesProducts } from "./sales-product";

export const salesReturn = mysqlTable('salesReturn', {
    id: int("id").primaryKey().autoincrement(),
    salesProductId:int("sale_product_id").references(() => salesProducts.id),
	productId: int("product_id").references(() => products.id),
	customerId: int("customer_id").references(() => custmers.id),
	reason: varchar("reason", { length: 256 }), 
	returnType: mysqlEnum("return_type", ["REPLACE", "REFUND"]).default(sql`NULL`),
	status: mysqlEnum("status", ["PENDING", "ACCEPTED", "REJECTED","RETURNED"]).default("PENDING"),
	 
  });

  
export type SalesReturn = typeof salesReturn.$inferSelect; // return type when queried
export type NewSalesReturn = typeof salesReturn.$inferInsert; // insert type

export const salesReturnRelations = relations(salesReturn,({one}) => ({
    sale: one(sales)
}))