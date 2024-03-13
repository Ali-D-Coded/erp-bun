import { Hono } from "hono"
import { CreateBrandsDto } from "./dto/brand.dto"
import { zValidator } from "@hono/zod-validator"
import { saveFile } from "../../utils/fun"
import prisma from "../../database/prisma"

const brandRoutes = new Hono()

brandRoutes.post("/create", zValidator("form", CreateBrandsDto), async (c) => {
	try {
		const STORE_PATH = "uploads/brands";
		const formData = await c.req.formData()

		const body = await CreateBrandsDto.parseAsync(await c.req.parseBody())
		console.log({ formData, body });


		const filename = await saveFile(formData.get("file"), STORE_PATH)
		console.log({ filename });

		await prisma.brand.create({
			data: {
				name: body.name,
				logo: filename
			}
		})


		return c.json("brand created")
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

brandRoutes.get("/all", async (c) => {
	try {
		const brands = await prisma.brand.findMany()
		return c.json(brands)

	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

brandRoutes.patch("/update/:id", async (c) => {
	try {
		const { id } = c.req.param()
		return c.json(`response ${id}`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

brandRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		return c.json(`response ${id}`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


export default brandRoutes