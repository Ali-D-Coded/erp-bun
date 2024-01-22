import { relations } from "drizzle-orm";
import { decimal, int, mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { units } from "../units/units";
import { vendors } from "../users/vendors";
import { products } from "./products";


export const productsVariant = mysqlTable('products_variant', {
  id: int("id").primaryKey().autoincrement(),
  name: varchar('name',{length:256}),
  description: varchar('description',{length:256}).unique(),
  price: decimal('price'),
  quantityInStock: int('quantity_in_stock'),
	minimumQuantity: int('minimum_quantity'),
	images: int("images"),
	unit_id: int("unit_id").references(() => units.id),
	barCode: varchar("bar_code", { length: 256 }),
	vendorId: int("vendor_id"),
	  productId: int("product_id"),
},(products_variant) => ({
	idIndex: uniqueIndex('id_idx').on(products_variant.id),
	nameIndex: uniqueIndex('name_idx').on(products_variant.name),
}));

export type ProductVariant = typeof productsVariant.$inferSelect; // return type when queried
export type NewProductVariant = typeof productsVariant.$inferInsert; // insert type



export const productsVariantRelations = relations(productsVariant, ({ one }) => ({
  product: one(products, {
    fields: [productsVariant.productId],
    references: [products.id],
  }),
	vendor: one(vendors, {
		fields: [productsVariant.vendorId],
		references: [vendors.id]
	}),
	unit: one(units)
}));