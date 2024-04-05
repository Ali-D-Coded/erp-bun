import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono"
import { CreateMediaDto } from "./dto/media.dto";
import { storepaths } from "../../utils/constants";
import prisma from "../../database/prisma";
import { saveFile, saveFiles } from "../../utils/fun";

const mediaRoute = new Hono()

mediaRoute.post("/create", zValidator("form", CreateMediaDto), async (c) => {
	try {

		const formData = await c.req.formData()
		// console.log({ formData });
		// console.log(formData.get("path"));

		const STORE_PATH = storepaths.get(formData.get("path") as string);
		const base = c.req.url.split("/").splice(0, 3).filter(it => it !== "").toString().replace(/,/g, "//")

		const files = await saveFiles(formData.getAll("images"), STORE_PATH as string, formData.get("name") as string)




		let lastCreatedRecords: any[] = []

		for (const file of files) {
			const res = await prisma.media.create({
				data: {
					...file,
					path: STORE_PATH as string
				}
			})
			lastCreatedRecords.push({
				url: `${base}/${res.path}/${res.url}`
			})
		}




		return c.json(lastCreatedRecords)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

mediaRoute.get("/all", async (c) => {
	try {
		return c.json("response")

	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

mediaRoute.patch("/update/:id", async (c) => {
	try {
		const { id } = c.req.param()
		return c.json(`response ${id}`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

mediaRoute.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		return c.json(`response ${id}`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


export default mediaRoute