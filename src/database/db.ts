import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema/schema";



export const connection = await mysql.createConnection({
  host: "localhost",
	user: "root",
  password: "123",
  database: "erpelec",
});

export const db = drizzle(connection, { mode:"default", schema: schema});