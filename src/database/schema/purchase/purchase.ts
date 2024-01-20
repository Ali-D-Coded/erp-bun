import { mysqlTable, serial, text, varchar,mysqlEnum, uniqueIndex, int, decimal, date } from "drizzle-orm/mysql-core";
import { users } from "../users/users";
import { relations, sql } from "drizzle-orm";
import { employees } from "../employees/employees";
import { vendors } from "../users/vendors";
import { purchaseItems } from "./purchase-items";

export const purchase = mysqlTable('purchase', {
id: int("id").primaryKey().autoincrement(),
	vendorId: int('vendor_id').references(() => vendors.id),
	purchaseBillNo: varchar("purchase_bill_no", { length: 256 }),
	date: date("date"),
	totalAmount: decimal("total_amount")
});

export type Purchase = typeof purchase.$inferSelect; // return type when queried
export type NewPurchase = typeof purchase.$inferInsert; // insert type

export const purchaseRelations = relations(purchase, ({many, one}) => ({
	purchaseItems: many(purchaseItems),
	vendor: one(vendors)
}))