import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import prisma from "../../database/prisma";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";





const employeeRoutes = new Hono()

employeeRoutes.post("/create", zValidator("json", CreateEmployeeDto), async (c) => {
	try {
		const paredBody = await CreateEmployeeDto.parseAsync(c.req.json())
		console.log({ paredBody });
		await Bun.password.hash(paredBody.password)

		const department = await prisma.departments.findUniqueOrThrow({ where: { id: +paredBody.departmentsId } })
		const roleName = department.name == "Sales" ? "SALESMAN" : department.name == "Accounts" ? "ACCOUNTANT" : ""

		const role = await prisma.roles.findFirstOrThrow({ where: { roleName } })

		//  await db.insert(employees).values(paredBody)
		await prisma.employees.create({
			data: { ...paredBody, rolesId: role?.id }
		})


		return c.json("created employee")
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

employeeRoutes.get("/all", async (c) => {
	try {
		const querydata = c.req.query()
		console.log({ role: querydata.role });

		const employeesdata = await prisma.employees.findMany({
			where: {
				rolesId: querydata.role ? +querydata.role : undefined
			},
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
