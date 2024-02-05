import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateCustomerDto } from "./dto/customer.dto";
import { db } from "../../database/db";
import { custmers } from "../../database/schema/schema";

const customerRoutes = new Hono()

customerRoutes.post("/create",zValidator("json",CreateCustomerDto), async (c) => {
	try {
		const dto = await CreateCustomerDto.parseAsync(c.req.json())
		await db.insert(custmers).values(dto)
		return c.json("customer created")
	} catch (error) {
		return c.newResponse(error,400)
	}
})

customerRoutes.get("/all", async (c) => {
	try {
		const customersRes = await db.query.custmers.findMany()
		return c.json(customersRes)
	} catch (error) {
		return c.newResponse(error,400)
	}
})

export default customerRoutes