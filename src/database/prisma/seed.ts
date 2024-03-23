import { PrismaClient } from "@prisma/client";
import { brandsData, categoryData, customersData, departmentsData, employeesData, productsData, raks, rolesData, subCategoriesData, unitsData, vendorsData } from "./data";


const prisma = new PrismaClient()

export async function mainSeeder() {
	console.log("started", { departmentsData });

	try {

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

	} catch (error) {
		return Error(error)
	}

}

mainSeeder()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});





