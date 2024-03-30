import { Hono } from "hono"
import { mkdir, readdir } from "node:fs/promises";

const fsRoutes = new Hono()

fsRoutes.post("/create", async (c) => {
	try {
		const body = await c.req.json()
		return c.json({ body })
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

fsRoutes.get("/all", async (c) => {
	try {
		const files = await readdir("./uploads/", { recursive: true });
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

fsRoutes.patch("/update/:id", async (c) => {
	try {
		const { id } = c.req.param()
		return c.json(`response ${id}`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})

fsRoutes.delete("/delete/:id", async (c) => {
	try {
		const { id } = c.req.param()
		return c.json(`response ${id}`)
	} catch (error: any) {
		return c.newResponse(error, 400)
	}
})


export default fsRoutes