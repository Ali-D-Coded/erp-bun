import { Hono } from "hono";
import prisma from "../database/prisma";
import { brandsData, categoryData, customersData, departmentsData, employeesData, mediaData, privilegeData, productsData, raks, rolesData, subCategoriesData, unitsData, vendorsData } from "../database/prisma/data";

const dbroute = new Hono()

dbroute.post("/seed-data", async (c) => {
	try {

		await prisma.privilegeCode.createMany({
			data: privilegeData
		})

		for (const role of rolesData) {
			await prisma.roles.create({
				data: role
			})
		}



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
		for (const emp of employeesData) {

			await prisma.employees.create({
				data: emp
			})
		}

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

		await prisma.raks.createMany({
			data: raks
		})
		await prisma.brand.createMany({
			data: brandsData
		})

		for (const prod of productsData) {
			await prisma.products.create({
				data: prod
			})
		}

		// await prisma.media.createMany({
		// 	data: mediaData
		// })
		return c.json("db seeding complete")
	} catch (error) {
		return c.newResponse(error.message, 400)
	}
})

export default dbroute