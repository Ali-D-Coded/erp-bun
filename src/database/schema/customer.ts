import { int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";


export const custmers = mysqlTable('customers', {
  id: int("id").primaryKey().autoincrement(),
  fullName: text('full_name'),
  email: varchar('email',{length:256}).unique(),
  phone: varchar('phone', { length: 256 }).unique(),
  address: varchar('address', { length: 256 }),
},(customers) => ({
	idIndex: uniqueIndex('id_idx').on(customers.id),
	emailIndex: uniqueIndex('email_idx').on(customers.email),
}));

export type User = typeof custmers.$inferSelect; // return type when queried
export type NewUser = typeof custmers.$inferInsert; // insert type