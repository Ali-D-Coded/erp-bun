import { mysqlTable, serial, text, varchar,mysqlEnum, uniqueIndex, int, decimal, date } from "drizzle-orm/mysql-core";
import { users } from "../users/users";
import { relations, sql } from "drizzle-orm";
import { employees } from "./employees";

export const departments = mysqlTable('departments', {
	id: int("id").primaryKey().autoincrement(),
	name: varchar("name", {length:256}),
});

export type Leaves = typeof departments.$inferSelect; // return type when queried
export type NewLeaves = typeof departments.$inferInsert; // insert type

export const departmentsRelations = relations(departments, ({ many }) => ({
	employees: many(employees)
}));