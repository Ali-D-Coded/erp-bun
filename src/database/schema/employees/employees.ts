import { relations, sql } from "drizzle-orm";
import { decimal, int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { users } from "../users/users";
import { attendance } from "./attendance";
import { leaves } from "./leaves";
import { departments } from "./departments";

export const employees = mysqlTable('employees', {
  id: int("id").primaryKey().autoincrement(),
	userId: int('user_id').references(() => users.id),
	jobTitle: varchar("job_title", { length: 256 }),
	departmentId: int("department_id").references(() => departments.id),
	// salary: decimal("salary")
});

export type Employee = typeof employees.$inferSelect; // return type when queried
export type NewEmployee = typeof employees.$inferInsert; // insert type


export const employeesRelations = relations(employees, ({ many,one }) => ({
	attendances: many(attendance),
	leaves: many(leaves),
	payrolls: many(leaves),
	department: one(departments)
	
}));