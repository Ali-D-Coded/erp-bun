import { int, mysqlTable, primaryKey, text, uniqueIndex } from "drizzle-orm/mysql-core";
import { permissions } from "../users/permissions";
import { users } from "../users/users";
import { relations } from "drizzle-orm";

export const userPermissions = mysqlTable('userPermissions', {
    permissionId: int('permission_id').notNull().references(() => permissions.id),
    userId: int('user_id').notNull().references(() => users.id),
   
  },(userPermissions) => ({
      pk: primaryKey({columns:[userPermissions.permissionId, userPermissions.userId]})
  }));

  
export type UserPermission = typeof userPermissions.$inferSelect; // return type when queried
export type NewUserPermission = typeof userPermissions.$inferInsert; // insert type


export const userPermissionsRelations = relations(userPermissions, ({ one }) => ({
    user: one(users, {
      fields: [userPermissions.userId],
      references: [users.id],
    }),
    permission: one(permissions, {
      fields: [userPermissions.permissionId],
      references: [permissions.id],
    }),
   
  }));