import { date, int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { employees } from "./employees";

export const leaves = mysqlTable('leaves', {
id: int("id").primaryKey().autoincrement(),
	employeeId: int('employee_id').references(() => employees.id),
	leaveType: varchar("leave_type", { length: 256 }),
	startDate: date("start_date"),
	endDate: date("end_date"),
	status: mysqlEnum("status",["APPROVED","PENDING"])
});

export type Leaves = typeof leaves.$inferSelect; // return type when queried
export type NewLeaves = typeof leaves.$inferInsert; // insert type