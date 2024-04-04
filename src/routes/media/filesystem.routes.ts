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

		const query = await c.req.query()

		const files = query.name ? await readdir(`./${BASEPATH}/${query.name}`, { recursive: true }) : await readdir(`./${BASEPATH}/`, { recursive: true });

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
				name: folder,
				filesinFolder: folderCounts[folder]
			};

		});

		console.log(folderCounts);

		return c.json(folderList)

	} catch (error: any) {

		return c.newResponse(error, 400)

	}
})

fsRoutes.get("/files/:filename", async (c) => {
	try {
		const { filename } = await c.req.param()
		// console.log(c.req.url.split("/").splice(0, 3).filter(it => it !== "").toString().replace(/,/g, "//"))

		// console.log(c.req.url);
		const base = c.req.url.split("/").splice(0, 3).filter(it => it !== "").toString().replace(/,/g, "//")


		const files: string[] = await readdir(`./${BASEPATH}/${filename}`, { recursive: true })

		const filesdata: { path: string, alt: string }[] = []
		files.forEach(it => {
			filesdata.push({
				path: `${base}/${BASEPATH}/${filename}/${it}`,
				alt: it
			})
		})
		return c.json(filesdata)
	} catch (error) {
		return c.newResponse(error, 400)
	}
})

fsRoutes.patch("/rename", zValidator("json", RenameDirectory), async (c) => {
	try {
		const dto = await RenameDirectory.parseAsync(c.req.json())
		await rename(`./${BASEPATH}/${dto.currentName}`, `./${BASEPATH}/${dto.newName}`, { recursive: true })
		return c.json(`renamed successfully`)
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