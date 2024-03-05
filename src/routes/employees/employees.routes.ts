import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../../database/db";
import { employees } from "../../database/schema/schema";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import prisma from "../../database/prisma";





const employeeRoutes = new Hono()

employeeRoutes.post("/create", zValidator("json", CreateEmployeeDto), async (c) => {
	try {
		const paredBody = await CreateEmployeeDto.parseAsync(c.req.json())
		console.log({ paredBody });
		await Bun.password.hash(paredBody.password)

		//  await db.insert(employees).values(paredBody)
		await prisma.employees.create({
			data: paredBody
		})


		return c.json("created employee")
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

employeeRoutes.get("/all", async (c) => {
	try {
		const employeesdata = await prisma.employees.findMany({
			include: {
				Roles: true,
				Departments: true,
				Leaves: true,
				Payroll: true,
				attendances: true
			},

		})
		return c.json(employeesdata)

	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})

employeeRoutes.patch("/update/:id", zValidator("json", UpdateEmployeeDto), async (c) => {
	try {
		const { id } = c.req.param()

		const { password, ...paredBody } = await UpdateEmployeeDto.parseAsync(c.req.json())
		console.log({ paredBody });
		let hash;
		if (password) {

			hash = await Bun.password.hash(password)
		}

		await prisma.employees.update({
			where: {
				id: +id,
			},
			data: {
				...paredBody, password: hash
			}
		})


		return c.json("employee updated")
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


employeeRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = await c.req.param();
		// await db.delete(employees).where(eq(employees.id, +id))
		await prisma.employees.softDelete(+id)
		return c.json("employee deleted");
	} catch (error) {
		return c.newResponse(error, 400)
	}
})

export default employeeRoutes
