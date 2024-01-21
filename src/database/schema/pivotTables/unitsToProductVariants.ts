import { int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { units } from "../units/units";
import { productsVariant } from "../product/product-variant";
import { relations } from "drizzle-orm";
import { purchaseItems } from "../purchase/purchase-items";

export const unitsToProductVariants = mysqlTable('users_to_groups', {
    unitId: int('unit_id').notNull().references(() => units.id),
    productVariantId: int('product_variant_id').notNull().references(() => productsVariant.id),
    purchaseItemId: int('purchase_item_id').notNull().references(() => purchaseItems.id),
  }, (t) => ({
    pk: primaryKey({columns:[t.unitId, t.productVariantId]}),
  }),
);

export const unitsToProductVariantsRelations = relations(unitsToProductVariants, ({ one }) => ({
  productVariant: one(productsVariant, {
    fields: [unitsToProductVariants.productVariantId],
    references: [productsVariant.id],
  }),
  unit: one(units, {
    fields: [unitsToProductVariants.unitId],
    references: [units.id],
  }),
  purchaseItem: one(purchaseItems, {
    fields: [unitsToProductVariants.productVariantId],
    references:[purchaseItems.id]
  })
}));