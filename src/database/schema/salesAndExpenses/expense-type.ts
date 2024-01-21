import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { expenses } from "./expense";

export const expenseTypes = mysqlTable("expenseTypes",{
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name",{length:256}),
})


  
export type ExpenseType = typeof expenseTypes.$inferSelect; // return type when queried
export type NewExpenseType = typeof expenseTypes.$inferInsert; // insert type

export const epenseTypeRelations = relations(expenseTypes,({many}) => ({
    expenses: many(expenses)
}))