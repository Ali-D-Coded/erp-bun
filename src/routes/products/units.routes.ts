import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import prisma from "../../database/prisma";
import { CreateUnitsDto } from "./dto/units.dto";

const unitsRoutes = new Hono()
unitsRoutes.post("/create", zValidator("json", CreateUnitsDto), async (c) => {
	try {
		const data = await CreateUnitsDto.parseAsync(c.req.json())
		await prisma.units.create({ data })
		return c.json(data)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

unitsRoutes.get("/all", async (c) => {
	try {
		const unitsdata = await prisma.units.findMany()
		return c.json(unitsdata)
	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})

unitsRoutes.patch("/update/:id", async (c) => {
	try {
		const { id } = c.req.param()
		const data = await c.req.json()
		await prisma.units.update({ where: { id: +id }, data })
		return c.json(data)
	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})

unitsRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		await prisma.units.softDelete(+id)
		return c.json("deleted")
	} catch (error: any) {
		return c.newResponse(error, 400)

	}
})

export default unitsRoutes
