import { relations, sql } from "drizzle-orm";
import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { purchaseItems } from "./purchase-items";
import { vendors } from "../users/vendors";


export const purchaseReturn = mysqlTable('purchaseReturn', {
    id: int("id").primaryKey().autoincrement(),
    purchseItemId:int("ourchase_item_id").references(() => purchaseItems.id),
	vendorId: int("vendor_id").references(() => vendors.id),
	reason: varchar("reason", { length: 256 }), 
	returnType: mysqlEnum("return_type", ["REPLACE", "REFUND"]).default(sql`NULL`),
	status: mysqlEnum("status", ["PENDING", "ACCEPTED", "REJECTED","RETURNED"]).default("PENDING"),
	 
  });

  
export type PurchseReturn = typeof purchaseReturn.$inferSelect; // return type when queried
export type NewPurchseReturn = typeof purchaseReturn.$inferInsert; // insert type

