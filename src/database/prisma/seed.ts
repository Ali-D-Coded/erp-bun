import {PrismaClient} from "@prisma/client";
import { categoryData, customersData, departmentsData, employeesData, mediaData, productVariantsData, subCategoriesData, unitsData, vendorsData } from "./data";


const prisma = new PrismaClient()

async function main() {
	try {
		const hash = await Bun.password.hash("12356")
		await prisma.admins.create({
			data: {
				email: "admin@gmail.com",
				userName:"admin",
				fullName: "admin",
				phone: "896578465",
				password: hash,
				rolesId:1
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
		await prisma.units.createMany({
			data: unitsData
		})
		await prisma.categories.createMany({
			data: categoryData
		})
		await prisma.subCategories.createMany({
			data: subCategoriesData
		})
		await prisma.products.createMany({
			data: subCategoriesData
		})
		// await prisma.productsVariant.createMany({
		// 	data: productVariantsData
		// })
		// await prisma.media.createMany({
		// 	data: mediaData
		// })
	} catch (error) {
		return Error(error)
	}

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });





