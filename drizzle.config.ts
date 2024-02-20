import { defineConfig } from 'drizzle-kit'
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
 schema: "./src/database/schema/schema.ts",
  driver: 'mysql2',
  dbCredentials: {
   host: "192.168.1.43",
    user: "root",
    password: "123",
    database: "erpelec",
  },
  verbose: true,
	strict: true,
  out: "./drizzle",
} satisfies Config