import { relations } from "drizzle-orm";
import { int, mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { productsVariant } from "../product/product-variant";



export const vendors = mysqlTable('vendors', {
  id: int("id").primaryKey().autoincrement(),
  name: varchar('name',{length:256}),
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

export const vendorRelations = relations(vendors, ({many}) => ({
  productVariants : many(productsVariant)
}))