import { Hono } from "hono"
import prisma from "../../database/prisma"
import { zValidator } from "@hono/zod-validator"
import { CreateRaksDto, UpdateRaksDto } from "./dto/rak.dto"
const rakRoutes = new Hono()

rakRoutes.post("/create", zValidator("json", CreateRaksDto), async (c) => {
	try {
		const body = await CreateRaksDto.parseAsync(c.req.json())
		await prisma.raks.create({
			data: {
				name: body.name,
				salesmnaId: body.salesmanId
			}
		})
		return c.json({ body })
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

rakRoutes.get("/all", async (c) => {
	try {
		const raks = await prisma.raks.findMany()
		return c.json(raks)

	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

rakRoutes.patch("/update/:id", zValidator("json", UpdateRaksDto), async (c) => {
	try {
		const { id } = c.req.param()
		const body = await UpdateRaksDto.parseAsync(c.req.json())
		await prisma.raks.update({
			where: {
				id: +id
			},
			data: {
				name: body.name
			}
		})
		return c.json('rak updated')
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

rakRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		await prisma.raks.delete({
			where: {
				id: +id
			}
		})
		return c.json(`rak delete`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


export default rakRoutes