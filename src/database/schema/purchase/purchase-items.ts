import { relations } from "drizzle-orm";
import { decimal, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { unitsToProductVariants } from "../pivotTables/unitsToProductVariants";
import { productsVariant } from "../product/product-variant";
import { purchase } from "./purchase";

export const purchaseItems = mysqlTable('purchaseItems', {
id: int("id").primaryKey().autoincrement(),
	purchaseId: int('purchase_id').references(() => purchase.id),
	batchNumber: varchar("batch_number", { length: 256 }),
	purchasePrice: decimal("purchase_price"),
	minimumSellingPrice: decimal("minimum_selling_price"),
	maximumRetailPrice: decimal("maximum_retail_price"),
	commissionPercentage: decimal("commission_percentage"),
	quantity: int("quantity"),
	productVariantId: int("product_variant_id").references(() => productsVariant.id), 
	// unitId: int("unit_id").references(() => uni.id)

});

export type PurchaseItems = typeof purchaseItems.$inferSelect; // return type when queried
export type NewPurchaseItems = typeof purchaseItems.$inferInsert; // insert type

export const purchaseItemsRleations = relations(purchaseItems, ({ one}) => ({
	purchase: one(purchase),
	product: one(productsVariant),
	unitsToPurchaseItems: one(unitsToProductVariants)
}))