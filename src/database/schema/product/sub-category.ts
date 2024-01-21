import { int, mysqlTable, text, uniqueIndex } from "drizzle-orm/mysql-core";
import { categories } from "./category";

export const subCategories = mysqlTable('subCategories', {
    id: int("id").primaryKey().autoincrement(),
    name: text('name'),
    categoryId: int("catrgory_id").references(() => categories.id)
  },(subCategories) => ({
      idIndex: uniqueIndex('id_idx').on(subCategories.id),
      nameIndex: uniqueIndex('name_idx').on(subCategories.name),
  }));

  
export type SubCategory = typeof subCategories.$inferSelect; // return type when queried
export type NewSubCategory = typeof subCategories.$inferInsert; // insert type
