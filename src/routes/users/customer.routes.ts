import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateCustomerDto } from "./dto/customer.dto";
import { db } from "../../database/db";
import { custmers } from "../../database/schema/schema";
import { eq } from "drizzle-orm"
import prisma from "../../database/prisma";
const customerRoutes = new Hono()

customerRoutes.post("/create", zValidator("json", CreateCustomerDto), async (c) => {
	try {
		const dto = await CreateCustomerDto.parseAsync(c.req.json())
		// await db.insert(custmers).values(dto)
		await prisma.customers.create({
			data: dto
		})
		return c.json("customer created")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


customerRoutes.patch("/update/:id", async (c) => {
	try {
		const { id } = c.req.param()
		const data = await c.req.json()
		console.log({ data });

		// await db.update(custmers).set(data).where(eq(custmers.id, +id))
		await prisma.customers.update({
			where: {
				id: +id
			},
			data
		})
		return c.json("customer updated")
	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})


customerRoutes.get("/all", async (c) => {
	try {
		const customersRes = await prisma.customers.findMany()
		return c.json(customersRes)
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


customerRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		// await db.delete(custmers).where(eq(custmers.id, +id))
		await prisma.customers.softDelete(+id)
		return c.json("vendor deleted")
	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})


export default customerRoutes
