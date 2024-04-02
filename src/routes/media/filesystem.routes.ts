import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono"
import { mkdir, readdir, rmdir, rename } from "node:fs/promises";
import { CreateDirectory, RemoveDirectory, RenameDirectory } from "./dto/media.dto";

const fsRoutes = new Hono()
const BASEPATH = "uploads"

fsRoutes.post("/create", zValidator("json", CreateDirectory), async (c) => {
	try {
		const dto = await CreateDirectory.parseAsync(c.req.json())
		const body = await mkdir(`./${BASEPATH}/${dto.name}`, { recursive: true });
		return c.json({ body })
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

fsRoutes.get("/all", async (c) => {

	try {

		const files = await readdir(`./${BASEPATH}/`, { recursive: true });

		console.log({ files });

		const folderCounts = {};

		files.forEach(file => {
			if (file.includes('/')) {
				const folder = file.split('/')[0];
				if (folderCounts[folder]) {
					folderCounts[folder]++;
				} else {
					folderCounts[folder] = 1;
				}
			} else {
				folderCounts[file] = 0;
			}
		});

		const folderList = Object.keys(folderCounts).map(folder => {

			return {
				foldername: folder,
				filesinFolder: folderCounts[folder]
			};

		});

		console.log(folderCounts);

		return c.json(folderList)

	} catch (error: any) {

		return c.newResponse(error, 400)

	}
})

fsRoutes.patch("/update", zValidator("json", RenameDirectory), async (c) => {
	try {
		const { id } = c.req.param()
		return c.json(`response ${id}`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

fsRoutes.delete("/delete", zValidator("json", RemoveDirectory), async (c) => {
	try {
		const dto = await RemoveDirectory.parseAsync(c.req.json())
		await rmdir(`./${BASEPATH}/${dto.name}`, { recursive: true })
		return c.json(`directory removed successfully`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


export default fsRoutes