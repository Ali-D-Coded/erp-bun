import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateCategoryDto } from "./dto/category.dtos";
import { db } from "../../database/db";
import { categories } from "../../database/schema/schema";
import { eq } from "drizzle-orm";
import prisma from "../../database/prisma";

const categoryRoute = new Hono()

categoryRoute.post("/create", zValidator("json", CreateCategoryDto), async (c) => {
	try {
		const data = await CreateCategoryDto.parseAsync(c.req.json())
		// await db.insert(categories).values(data)
		await prisma.categories.create({ data: data })
		return c.json("Category created")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


categoryRoute.patch("/update/:id", zValidator("json", CreateCategoryDto), async (c) => {
	try {
		const { id } = c.req.param()

		const data = await CreateCategoryDto.parseAsync(c.req.json())
		// await db.update(categories).set(data).where(eq(categories.id, +id))
		await prisma.categories.update({
			where: {
				id: +id
			},
			data: data
		})
		return c.json("Category updated")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


categoryRoute.get("/all", async (c) => {
	try {
		// const data = await db.query.categories.findMany()
		const data = await prisma.categories.findMany()

		return c.json(data)
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


categoryRoute.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		await prisma.categories.softDelete(+id)
		return c.json("Deleted Category")
	} catch (error) {
		return c.newResponse(error, 400)
	}
})


export default categoryRoute