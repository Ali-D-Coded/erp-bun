import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const raks = mysqlTable('raks', {
    id: int("id").primaryKey().autoincrement(),
    name: varchar('name',{length:256}),
  });

  
export type Raks = typeof raks.$inferSelect; // return type when queried
export type NewRaks = typeof raks.$inferInsert; // insert type
