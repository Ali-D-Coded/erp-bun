import { relations } from "drizzle-orm";
import { int, mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core";
import { subCategories } from "./sub-category";

export const categories = mysqlTable('categories', {
    id: int("id").primaryKey().autoincrement(),
    name: varchar('name',{length:256}),
  },(categories) => ({
      idIndex: uniqueIndex('id_idx').on(categories.id),
      nameIndex: uniqueIndex('name_idx').on(categories.name),
  }));

  
export type Category = typeof categories.$inferSelect; // return type when queried
export type NewCategory = typeof categories.$inferInsert; // insert type


export const categoriesRelations = relations(categories,({many}) => ({
    subCategories: many(subCategories)
}))