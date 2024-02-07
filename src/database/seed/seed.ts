import { connection, db } from "../db";
import { admins , categories, custmers, departments, employees, media, products, productsVariant, roles, subCategories, units, vendors} from "../schema/schema";
import {  categoryData, customersData, departmentsData, employeesData, mediaData, productVariantsData, productsData, rolesData, subCategoriesData, unitsData, vendorsData } from "./data";

await db.insert(roles).values(rolesData)
const hash = await Bun.password.hash("12356")
	 await db.insert(admins).values({
			email: "admin@gmail.com",
			userName:"admin",
			fullName: "admin",
			phone: "896578465",
			password: hash,
			roleId:1
	 })
await db.insert(departments).values(departmentsData)
await db.insert(employees).values(employeesData)
await db.insert(vendors).values(vendorsData)
await db.insert(custmers).values(customersData)
await db.insert(units).values(unitsData)
await db.insert(categories).values(categoryData)
await db.insert(subCategories).values(subCategoriesData)
await db.insert(products).values(productsData)
await db.insert(productsVariant).values(productVariantsData)
await db.insert(media).values(mediaData)


// Don't forget to close the connection, otherwise the script will hang
await connection.end();