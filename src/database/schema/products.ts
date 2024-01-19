import { decimal, int, mysqlEnum, mysqlTable, serial, text, uniqueIndex, varchar } from "drizzle-orm/mysql-core";


export const products = mysqlTable('products', {
  id: int("id").primaryKey().autoincrement(),
  name: text('name'),
  description: varchar('description',{length:256}).unique(),
  price: decimal('price'),
  quantityInStock: int('quantity_in_stock'),
	minimumQuantity: int('minimum_quantity'),
//   vendorId: int("vendor_id").references(() => ),
},(products) => ({
	idIndex: uniqueIndex('id_idx').on(products.id),
	nameIndex: uniqueIndex('name_idx').on(products.name),
}));

export type Product = typeof products.$inferSelect; // return type when queried
export type NewProduct = typeof products.$inferInsert; // insert type