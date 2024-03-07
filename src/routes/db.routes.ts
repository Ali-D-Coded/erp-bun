import { Hono } from "hono";
import prisma from "../database/prisma";
import { categoryData, customersData, departmentsData, employeesData, mediaData, productVariantsData, productsData, rolesData, subCategoriesData, unitsData, vendorsData } from "../database/prisma/data";

const dbroute = new Hono()

dbroute.post("/seed-data", async (c) => {
	try {

		await prisma.roles.createMany({ data: rolesData })



		const hash = await Bun.password.hash("12356")
		await prisma.admins.create({
			data: {
				email: "admin@gmail.com",
				userName: "admin",
				fullName: "admin",
				phone: "896578465",
				password: hash,
				rolesId: 1
			}
		})


		await prisma.departments.createMany({
			data: departmentsData
		})
		await prisma.employees.createMany({
			data: employeesData
		})
		await prisma.vendors.createMany({
			data: vendorsData
		})
		await prisma.customers.createMany({
			data: customersData
		})
		const unts = await prisma.units.createMany({
			data: unitsData
		})
		console.log({ unts });

		await prisma.categories.createMany({
			data: categoryData
		})
		await prisma.subCategories.createMany({
			data: subCategoriesData
		})
		await prisma.products.createMany({
			data: productsData
		})
		await prisma.productsVariant.createMany({
			data: productVariantsData
		})
		await prisma.media.createMany({
			data: mediaData
		})
		return c.json("db seeding complete")
	} catch (error) {
		return c.newResponse(error.message, 400)
	}
})

export default dbroute