import { relations } from "drizzle-orm";
import { int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { employees } from "../employees/employees";

enum Roles {
  ADMIN = 0,
  MANAGER = 1,
  SALESMAN = 2,
  ACCOUNTANT = 3,
}

export const users = mysqlTable('users', {
  id: int("id").primaryKey().autoincrement(),
  fullName: text('full_name'),
  userName: varchar('user_name',{length: 256}).unique(),
  email: varchar('email',{length:256}).unique(),
  password: varchar('password',{length: 256}),
  phone: varchar('phone', { length: 256 }).unique(),
  role: mysqlEnum("role",["ADMIN","MANAGER","SALESMAN","ACCOUNTANT"]).default("SALESMAN")
},(users) => ({
	idIndex: uniqueIndex('id_idx').on(users.id),
	usernameIndex: uniqueIndex('username_idx').on(users.userName),
	emailIndex: uniqueIndex('email_idx').on(users.email),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

export const usersRelations = relations(users, ({ one }) => ({
  profileInfo: one(employees),
}));
