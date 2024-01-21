import { date, decimal, int, mysqlTable, text, uniqueIndex } from "drizzle-orm/mysql-core";
import { employees } from "../employees/employees";
import { expenseTypes } from "./expense-type";

export const expenses = mysqlTable('expenses', {
    id: int("id").primaryKey().autoincrement(),
    date: date('date'),
    employeeId: int("employee_id").references(() => employees.id),
    amount: decimal("amount"),
    expenseTypeId: int("expense_type_id").references(() => expenseTypes.id)
  });

  
export type Expense = typeof expenses.$inferSelect; // return type when queried
export type NewExpense = typeof expenses.$inferInsert; // insert type
