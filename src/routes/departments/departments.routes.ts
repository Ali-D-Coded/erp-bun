import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import prisma from "../../database/prisma";
import { CreateDepartment } from "./dto/departments.dto";

const departmentsApi = new Hono()


departmentsApi.post("/create", zValidator("json", CreateDepartment), async (c) => {
	try {
		const parsedBody = await CreateDepartment.parseAsync(c.req.json())
		// await db.insert(departments).values({ ...parsedBody })
		await prisma.departments.create({
			data: parsedBody
		})
		return c.json({
			msg: "deaprtment craeted"
		})
	} catch (error: any) {
		return c.newResponse(error, 400)
	}

})

departmentsApi.patch("/update/:id", async (c) => {
	try {
		const { id } = await c.req.param()
		const body = await c.req.json();
		//  await db.update(departments).set(body).where(eq(departments.id,+id))
		await prisma.departments.update({
			where: {
				id: +id
			},
			data: body
		})
		return c.json("department updated")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})

departmentsApi.get("/all", async (c) => {
	try {
		//		const {dep} = c.req.query()
		//	const deps = await db.query.departments.findMany({
		//		...(dep ? {
		//  	where: (departments, { like }) => like(departments.name, `%${dep}%`),
		//		} : {}),
		//		with: {
		//			employees:true
		//		}
		//	});
		// const departmentsWithEmployeeCount = await db.select({
		// id: departments.id,
		// name: departments.name,
		// employeeCount: sql<number>`COUNT(${employees.id})`
		// })
		// .from(departments)
		// .leftJoin(employees, eq(departments.id, employees.departmentId)) // You need to adjust this condition based on your schema
		// .groupBy(departments.id);
		// return c.json(
		// 	 departmentsWithEmployeeCount
		// )

		const departments = await prisma.departments.findMany({
			include: {
				_count: true
			}
		})
		return c.json(departments)


	} catch (error: any) {
		return c.newResponse(error, 400)
	}


})

departmentsApi.delete("/delete/:id", async (c) => {
	try {
		const { id } = await c.req.param()
		const employeeCountPerDepartment = await prisma.employees.count({
			where: {
				departmentsId: +id
			},

		})
		if (employeeCountPerDepartment > 0) {
			throw new Error("This Department has employeed in it")
		}


		const des = await prisma.departments.delete({ where: { id: +id } })

		// const deps = await prisma.departments.softDelete(+id)
		return c.json(
			des
		)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}


})

export default departmentsApi
