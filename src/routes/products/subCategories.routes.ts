import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { CreateSubCategoryDto } from "./dto/category.dtos"
import { subCategories } from "../../database/schema/schema"
import { db } from "../../database/db"
import { eq } from "drizzle-orm"
import prisma from "../../database/prisma"

const subCategoryRoute = new Hono()

subCategoryRoute.post("/create", zValidator("json", CreateSubCategoryDto), async (c) => {
	try {
		const data = await CreateSubCategoryDto.parseAsync(c.req.json())
		// await db.insert(subCategories).values(data)
		await prisma.subCategories.create({
			data
		})
		return c.json("sub category created")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


subCategoryRoute.post("/update/:id", zValidator("json", CreateSubCategoryDto), async (c) => {
	try {
		const { id } = c.req.param()
		const data = await CreateSubCategoryDto.parseAsync(c.req.json())

		await prisma.subCategories.update({
			where: {
				id: +id
			},
			data
		})
		return c.json("sub category updated")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


subCategoryRoute.get("/all", async (c) => {
	try {
		const data = await prisma.subCategories.findMany()
		return c.json(data)
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


subCategoryRoute.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		await prisma.subCategories.softDelete(+id)
		return c.json("deleted sub category")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})

export default subCategoryRoute