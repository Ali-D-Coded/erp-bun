import { int, mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core";


export const custmers = mysqlTable('customers', {
  id: int("id").primaryKey().autoincrement(),
  fullName: varchar('full_name',{length:256}),
  email: varchar('email',{length:256}).unique(),
  phone: varchar('phone', { length: 256 }).unique(),
  address: varchar('address', { length: 256 }),
},(customers) => ({
	idIndex: uniqueIndex('id_idx').on(customers.id),
	emailIndex: uniqueIndex('email_idx').on(customers.email),
}));

export type Customer = typeof custmers.$inferSelect; // return type when queried
export type NewCustomer = typeof custmers.$inferInsert; // insert type