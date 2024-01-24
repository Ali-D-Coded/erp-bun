import { relations } from "drizzle-orm";
import { int, json, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { userPermissions } from "../pivotTables/userPermissions";

export const permissions = mysqlTable('permissions', {
    id: int("id").primaryKey().autoincrement(),
    type: mysqlEnum("type", ["ADMIN", "MANAGER", "SALESMAN", "ACCOUNTANT"]).unique(),
    canDo: json("can_do"),
  });

  
export type Permission = typeof permissions.$inferSelect; // return type when queried
export type NewPermission = typeof permissions.$inferInsert; // insert type

export const permissionRelations = relations(permissions, ({ many }) => ({
  userPermissions:many(userPermissions)
}))