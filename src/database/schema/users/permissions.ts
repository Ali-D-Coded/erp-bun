import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const permissions = mysqlTable('permissions', {
    id: int("id").primaryKey().autoincrement(),
    name: varchar('name',{length:256}),
  });

  
export type Permission = typeof permissions.$inferSelect; // return type when queried
export type NewPermission = typeof permissions.$inferInsert; // insert type
