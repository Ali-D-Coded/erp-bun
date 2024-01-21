import { date, decimal, int, mysqlTable, text, uniqueIndex } from "drizzle-orm/mysql-core";
import { employees } from "../employees/employees";
import { expenseTypes } from "./expense-type";
import { custmers } from "../users/customer";
import { relations } from "drizzle-orm";
import { salesProducts } from "./sales-product";

export const sales = mysqlTable('sales', {
    id: int("id").primaryKey().autoincrement(),
    date: date('date'),
    accountantId:int("accountantId").references(() => employees.id ),
    customerId: int("customer_id").references(() => custmers.id),
    totalAmount: decimal("total_amount"),
    discountAmount: decimal("discount_amount"),
    grandTotal: decimal("grandTotal"),
  });

  
export type Sale = typeof sales.$inferSelect; // return type when queried
export type NewSale = typeof sales.$inferInsert; // insert type

export const salesRelations = relations(sales,({many}) => ({
    salesProducts: many(salesProducts),
}))