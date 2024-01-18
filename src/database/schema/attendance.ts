import { date, int, mysqlTable, serial, time } from "drizzle-orm/mysql-core";
import { employees } from "./employees";

export const attendance = mysqlTable('attendance', {
  id: serial("id").primaryKey(),
	employeeId: int('employee_id').references(() => employees.id),
	date: date("date"),
	check_in_time: time("check_in_time"),
	check_out_time: time("check_out_time"),
	
});

export type Attendance = typeof attendance.$inferSelect; // return type when queried
export type NewAttendance = typeof attendance.$inferInsert; // insert type