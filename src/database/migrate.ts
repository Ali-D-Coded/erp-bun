
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from './db';
import { sql } from 'drizzle-orm';


await db.execute(sql`drop database erpelec`);
await db.execute(sql`create database erpelec`);
await db.execute(sql`use erpelec`);

  
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: 'drizzle' });

// Don't forget to close the connection, otherwise the script will hang
await connection.end();