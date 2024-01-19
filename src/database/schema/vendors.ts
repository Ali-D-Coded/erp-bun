import { int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";



export const vendors = mysqlTable('vendors', {
  id: int("id").primaryKey().autoincrement(),
  name: text('name'),
  email: varchar('email',{length:256}).unique(),
  contactPerson: varchar('contact_person',{length: 256}),
	phone: varchar('phone', { length: 256 }).unique(),
    address: varchar('address', { length: 256 }),
},(vendors) => ({
	idIndex: uniqueIndex('id_idx').on(vendors.id),
	emailIndex: uniqueIndex('email_idx').on(vendors.email),
}));

export type Vendor = typeof vendors.$inferSelect; // return type when queried
export type NewVendor = typeof vendors.$inferInsert; // insert type