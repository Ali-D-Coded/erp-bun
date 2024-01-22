import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { employees } from "./employees";

export const departments = mysqlTable('departments', {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", {length:256}),
});

export type Department = typeof departments.$inferSelect; // return type when queried
export type NewDepartment = typeof departments.$inferInsert; // insert type

export const departmentsRelations = relations(departments, ({ many }) => ({
	employees: many(employees)
}));