import { date, decimal, int, mysqlTable, serial } from "drizzle-orm/mysql-core";
import { employees } from "./employees";

export const payroll = mysqlTable('payroll', {
  id: serial("id").primaryKey(),
	employeeId: int('employee_id').references(() => employees.id),
	paymentDate: date("payment_date"),
	gross_pay: decimal("gross_pay"),
	deductions: decimal("deductions"),
	netPay: decimal("net_pay"),
	
	
});

export type Payroll = typeof payroll.$inferSelect; // return type when queried
export type NewPayroll = typeof payroll.$inferInsert; // insert type