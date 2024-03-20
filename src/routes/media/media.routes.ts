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

		const files = await saveFiles(formData.getAll("images"), STORE_PATH as string, formData.get("name") as string)

		console.log({ files });


		await prisma.media.createMany({
			data: files.map(it => ({ ...it, path: STORE_PATH as string })),
		})

		const lastCreatedRecord = await prisma.media.findFirst({
			orderBy: { createdAt: 'desc' },
			take: 1
		});



		return c.json(lastCreatedRecord)
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