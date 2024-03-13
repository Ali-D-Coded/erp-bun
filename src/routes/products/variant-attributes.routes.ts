import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { CreateVariantDto, UpdateVariantDto } from "./dto/variant.dto"
import prisma from "../../database/prisma"

const VAroutes = new Hono()

VAroutes.post("/create", zValidator("json", CreateVariantDto), async (c) => {
	try {
		const body = await CreateVariantDto.parseAsync(c.req.json())
		await prisma.variantAttributes.create({
			data: {
				name: body.name,
				values: body.values
			}
		})
		return c.json("variant attribute created")
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

VAroutes.get("/all", async (c) => {
	try {
		const data = await prisma.variantAttributes.findMany()
		return c.json(data)

	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

VAroutes.patch("/update/:id", zValidator("json", UpdateVariantDto), async (c) => {
	try {
		const { id } = c.req.param()
		const body = await UpdateVariantDto.parseAsync(c.req.json())
		await prisma.variantAttributes.update({
			where: {
				id: +id
			},
			data: {
				name: body.name,
				values: body.values
			}
		})
		return c.json(`response ${id}`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

VAroutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		await prisma.variantAttributes.delete({ where: { id: +id } })
		return c.json(`varaint attribute delete`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


export default VAroutes