import { sql } from "drizzle-orm";
import { decimal, int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const employees = mysqlTable('employees', {
  id: int("id").primaryKey().autoincrement(),
	userId: int('user_id').references(() => users.id),
	jobTitle: varchar("job_title", { length: 256 }),
	departmentId: int("department_id").default(sql`NULL`),
	salary: decimal("salary")
});

export type Employee = typeof employees.$inferSelect; // return type when queried
export type NewEmployee = typeof employees.$inferInsert; // insert type