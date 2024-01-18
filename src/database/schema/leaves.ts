import { mysqlTable, serial, text, varchar,mysqlEnum, uniqueIndex, int, decimal, date } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { sql } from "drizzle-orm";
import { employees } from "./employees";

export const leaves = mysqlTable('leaves', {
  id: serial("id").primaryKey(),
	employeeId: int('employee_id').references(() => employees.id),
	leaveType: varchar("leave_type", { length: 256 }),
	startDate: date("start_date"),
	endDate: date("end_date"),
	status: mysqlEnum("status",["APPROVED","PENDING"])
});

export type Leaves = typeof leaves.$inferSelect; // return type when queried
export type NewLeaves = typeof leaves.$inferInsert; // insert type